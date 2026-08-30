export type Contest = {
  id: string;
  title: string;
  platform: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  startsInMs: number;
  participants: number;
  prize: string;
  tags: string[];
};

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const contests: Contest[] = [
  {
    id: "cc-weekly-142",
    title: "Weekly Sprint #142",
    platform: "Codeforces Mirror",
    difficulty: "Intermediate",
    startsInMs: 5 * HOUR + 42 * MINUTE,
    participants: 1284,
    prize: "$500 pool",
    tags: ["Graphs", "DP", "Greedy"],
  },
  {
    id: "cc-monthly-18",
    title: "Monthly Grandmaster Cup",
    platform: "Competitive Coders Arena",
    difficulty: "Advanced",
    startsInMs: 2 * DAY + 9 * HOUR,
    participants: 3417,
    prize: "$2,000 pool",
    tags: ["Number Theory", "Flows"],
  },
  {
    id: "cc-ladder-07",
    title: "Beginner Ladder: Arrays",
    platform: "LeetCode Track",
    difficulty: "Beginner",
    startsInMs: 21 * HOUR + 15 * MINUTE,
    participants: 862,
    prize: "Badges + streak XP",
    tags: ["Two Pointers", "Hashing"],
  },
];

export const leaderboard = [
  { rank: 1, handle: "n0va_sort", rating: 2841, delta: 62, country: "IN" },
  { rank: 2, handle: "segment_tri", rating: 2790, delta: 41, country: "PL" },
  { rank: 3, handle: "bitmask_ai", rating: 2718, delta: -18, country: "BD" },
  { rank: 4, handle: "dijkstra_jr", rating: 2664, delta: 27, country: "BR" },
  { rank: 5, handle: "modulo_998", rating: 2610, delta: 12, country: "JP" },
];

export const platforms = [
  { name: "Codeforces", detail: "Rated mirrors" },
  { name: "LeetCode", detail: "Daily ladders" },
  { name: "CodeChef", detail: "Long challenges" },
  { name: "GitHub", detail: "Open-source editorials" },
  { name: "AtCoder", detail: "Beginner rounds" },
  { name: "HackerRank", detail: "Interview prep" },
];

export const avatarStack = ["AK", "MR", "JS", "LI", "TQ", "DV"];
