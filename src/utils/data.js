import { format, subDays, startOfWeek, eachDayOfInterval } from 'date-fns';

export const PROTEIN_TARGET = 124;

export const EXERCISES = [
  { id: 'goblet-squat',   name: 'Goblet Squat',        muscles: 'Quads · Glutes · Core',  defaultSets: 3, defaultReps: 12, defaultWeight: 16 },
  { id: 'push-ups',       name: 'Push-Ups',             muscles: 'Chest · Shoulders · Tri', defaultSets: 3, defaultReps: 20, defaultWeight: 0  },
  { id: 'floor-press',    name: 'KB Floor Press',       muscles: 'Chest · Triceps',         defaultSets: 3, defaultReps: 10, defaultWeight: 16 },
  { id: 'kb-row',         name: 'KB Row',               muscles: 'Back · Biceps',           defaultSets: 3, defaultReps: 12, defaultWeight: 16 },
  { id: 'kb-swing',       name: 'KB Swing',             muscles: 'Posterior Chain · Core',  defaultSets: 4, defaultReps: 15, defaultWeight: 16 },
  { id: 'farmer-carry',   name: 'Farmer Carry',         muscles: 'Grip · Traps · Core',     defaultSets: 3, defaultReps: 40, defaultWeight: 16 },
  { id: 'plank',          name: 'Plank',                muscles: 'Core · Full Body',        defaultSets: 3, defaultReps: 45, defaultWeight: 0  },
];

export const BREAKFAST_ITEMS = [
  { id: 'eggs',   label: '4 Eggs',           protein: 24 },
  { id: 'yogurt', label: '300g Greek Yogurt', protein: 30 },
  { id: 'oats',   label: 'Oats / Toast',      protein: 6  },
  { id: 'fruit',  label: 'Fruit',             protein: 1  },
];

export const SHAKE_ITEMS = [
  { id: 'whey',  label: '2 Scoops Whey', protein: 50 },
  { id: 'milk',  label: 'Milk (300ml)',  protein: 10 },
];

export const FOCUS_MESSAGES = [
  'The body achieves what the mind believes.',
  'Discipline is choosing between what you want now and what you want most.',
  'One more rep. One more day. One more week ahead of who you were.',
  'You don\'t find the time. You make it.',
  'Consistency beats perfection every single time.',
  'Show up today. Your future self is watching.',
  'The iron never lies. Neither does the mirror.',
  'Progress is made in the reps nobody else sees.',
  'Champions train. Legends are consistent.',
  'Your only competition is yesterday\'s you.',
];

export const DAILY_TASKS = [
  { id: 'training',  label: 'Complete Training Session', icon: 'dumbbell'   },
  { id: 'protein',   label: 'Hit Protein Target (124g)', icon: 'target'     },
  { id: 'sleep',     label: 'Sleep 8h',                  icon: 'moon'       },
  { id: 'water',     label: 'Drink 3L Water',            icon: 'droplets'   },
  { id: 'steps',     label: '8,000 Steps',               icon: 'footprints' },
];

export function getTodayKey() {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getWeekDays() {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end: today }).map(d => format(d, 'yyyy-MM-dd'));
}

export function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) =>
    format(subDays(new Date(), 6 - i), 'yyyy-MM-dd')
  );
}

export function getWeightSampleData() {
  const base = 78;
  return getLast7Days().map((date, i) => ({
    date,
    label: format(new Date(date + 'T12:00:00'), 'EEE'),
    weight: +(base - 0.1 * i + (Math.random() - 0.4) * 0.3).toFixed(1),
  }));
}

export function getFocusMessage() {
  const day = new Date().getDay();
  return FOCUS_MESSAGES[day % FOCUS_MESSAGES.length];
}

export const INITIAL_METRICS = {
  weight: 78.0,
  bodyFat: 14.5,
  muscleMass: 66.8,
  waist: 82,
  chest: 98,
  arms: 38,
};

export const GOAL_METRICS = {
  weight: 82.0,
  bodyFat: 11.0,
  muscleMass: 72.0,
  waist: 80,
  chest: 103,
  arms: 42,
};
