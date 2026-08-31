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

export const COMMUNITY_FACEBOOK_URL = "https://www.facebook.com/share/197aN9pJz4/";
export const COMMUNITY_WHATSAPP_URL = "https://whatsapp.com/channel/0029VbDaODnFXUuk3Ssnck3K";

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

export const platforms = [
  {
    name: "Codeforces",
    detail: "Rated mirrors",
    logo: "https://cdn.simpleicons.org/codeforces",
  },
  {
    name: "LeetCode",
    detail: "Daily ladders",
    logo: "https://cdn.simpleicons.org/leetcode",
  },
  {
    name: "CodeChef",
    detail: "Long challenges",
    logo: "https://cdn.simpleicons.org/codechef",
  },
  {
    name: "GitHub",
    detail: "Open-source editorials",
    logo: "https://cdn.simpleicons.org/github",
  },
  {
    name: "AtCoder",
    detail: "Beginner rounds",
    logo: "https://cdn.simpleicons.org/atcoder",
  },
  {
    name: "HackerRank",
    detail: "Interview prep",
    logo: "https://cdn.simpleicons.org/hackerrank",
  },
];

export const avatarStack = ["AK", "MR", "JS", "LI", "TQ", "DV"];

export type Resource = {
  title: string;
  description: string;
  category: "Ladder" | "Editorial" | "Template" | "Course";
  level: "Beginner" | "Intermediate" | "Advanced";
  href: string;
};

export const resources: Resource[] = [
  {
    title: "Graph Theory Ladder",
    description: "60 curated problems from BFS/DFS basics to flows and matchings.",
    category: "Ladder",
    level: "Intermediate",
    href: "https://codeforces.com/problemset",
  },
  {
    title: "Dynamic Programming Playbook",
    description: "Pattern-by-pattern DP breakdown with recurrences and code templates.",
    category: "Course",
    level: "Intermediate",
    href: "https://youtube.com/@competitivecoders",
  },
  {
    title: "C++ Contest Template",
    description: "Battle-tested competitive template: fast IO, debug macros, common structs.",
    category: "Template",
    level: "Beginner",
    href: "https://github.com/",
  },
  {
    title: "Number Theory Essentials",
    description: "Modular arithmetic, sieves, CRT and combinatorics for rated rounds.",
    category: "Course",
    level: "Advanced",
    href: "https://youtube.com/@competitivecoders",
  },
  {
    title: "Weekly Contest Editorials",
    description: "Video walkthroughs for every Competitive Coders weekly sprint.",
    category: "Editorial",
    level: "Intermediate",
    href: "https://youtube.com/@competitivecoders",
  },
  {
    title: "Beginner Array Ladder",
    description: "Start here: prefix sums, two pointers, sliding window and hashing.",
    category: "Ladder",
    level: "Beginner",
    href: "https://leetcode.com/problemset/",
  },
];
