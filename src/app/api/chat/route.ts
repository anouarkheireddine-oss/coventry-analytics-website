import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UserContext {
  profile?: Record<string, unknown>;
  todayNutrition?: Record<string, unknown>;
  todayTraining?: Record<string, unknown>;
  todayTasks?: Record<string, unknown>;
  metrics?: Record<string, unknown>[];
  streak?: number;
  weekConsistency?: number;
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response('ANTHROPIC_API_KEY not configured', { status: 500 });
  }

  const { messages, context }: { messages: Message[]; context: UserContext } =
    await req.json();

  const profile = context?.profile ?? {};
  const todayNutrition = context?.todayNutrition ?? {};
  const todayTraining = context?.todayTraining ?? {};
  const todayTasks = context?.todayTasks ?? {};
  const metrics = context?.metrics ?? [];
  const latestMetric = metrics[metrics.length - 1] ?? {};

  const systemPrompt = `You are APEX — the elite AI performance coach built into AK APICE, the personal performance OS.

You have real-time access to the athlete's data. Be precise, direct, and evidence-based. Reference their actual numbers. No fluff.

## Athlete Profile
Name: ${profile.name ?? 'Athlete'}
Age: ${profile.age ?? '—'} | Weight: ${profile.weight ?? '—'}kg | Height: ${profile.height ?? '—'}cm
Goal: ${profile.goal ?? 'Lean Bulk'} | Protein Target: ${profile.proteinTarget ?? 124}g/day

## Today's Data
Protein: ${(todayNutrition as { protein?: number }).protein ?? 0}g / ${profile.proteinTarget ?? 124}g target
Hydration: ${(todayNutrition as { water?: number }).water ?? 0} cups
Workout completed: ${(todayTraining as { completed?: boolean }).completed ? 'YES' : 'NO'}
Discipline tasks done: ${Object.values(todayTasks).filter(Boolean).length} / 5

## Latest Body Metrics
Weight: ${(latestMetric as { weight?: number }).weight ?? '—'}kg | Body Fat: ${(latestMetric as { bodyFat?: number }).bodyFat ?? '—'}% | Muscle Mass: ${(latestMetric as { muscleMass?: number }).muscleMass ?? '—'}kg

## Performance Stats
Current streak: ${context?.streak ?? 0} days
Weekly consistency: ${context?.weekConsistency ?? 0}%

## Coach Persona
- Talk like a world-class S&C coach — precise, motivating, no BS
- Give specific, actionable advice based on their real data
- When protein is low, call it out and give a fast fix
- When streak/consistency is high, acknowledge it briefly and raise the bar
- Max 150 words per response unless asked for detail
- Use the athlete's name when impactful`;

  const stream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  });

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text));
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  });
}
