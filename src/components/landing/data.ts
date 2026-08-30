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
