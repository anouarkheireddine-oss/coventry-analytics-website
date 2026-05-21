# AK APICE — Personal Performance OS

## Stack
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS, Framer Motion
- **AI**: Anthropic Claude API (`@anthropic-ai/sdk`) — streaming, edge runtime
- **Backend**: Supabase (optional) — app fully works offline with localStorage
- **Language**: TypeScript (new files) + JavaScript (legacy pages)
- **Icons**: Lucide React

## Local setup
```bash
cp .env.example .env.local   # fill in ANTHROPIC_API_KEY
npm install
npm run dev
```

## Key directories
| Path | Purpose |
|------|---------|
| `src/app/` | Next.js App Router pages |
| `src/app/api/chat/route.ts` | AI Coach streaming endpoint (edge) |
| `src/app/coach/page.tsx` | APEX AI Coach chat UI |
| `src/components/ui/` | Reusable UI components |
| `src/hooks/useLocalStorage.ts` | Typed localStorage hook |
| `src/utils/data.ts` | Constants, types, utility functions |
| `src/lib/supabase.ts` | Supabase client (null when not configured) |

## Data flow
All user data lives in browser localStorage under `apice_*` keys.
The AI Coach reads that data client-side and sends it as context to the API route.
The API route streams Claude responses back via edge runtime.

## Environment variables
See `.env.example`.
- `ANTHROPIC_API_KEY` — required for APEX AI Coach
- `NEXT_PUBLIC_SUPABASE_*` — optional, enables cloud sync

## Commands
```bash
npm run dev          # development server
npm run build        # production build
npm run type-check   # TypeScript check
npm run lint         # ESLint
npm run format       # Prettier
```
