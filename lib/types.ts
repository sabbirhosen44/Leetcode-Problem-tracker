export type Difficulty = "Easy" | "Medium" | "Hard";

export type Category =
  | "Arrays & Hashing"
  | "Two Pointers"
  | "Sliding Window"
  | "Stack"
  | "Binary Search"
  | "Linked List"
  | "Trees"
  | "Tries"
  | "Heap/Priority Queue"
  | "Backtracking"
  | "Graphs"
  | "Advanced Graphs"
  | "1-D DP"
  | "2-D DP"
  | "Greedy"
  | "Intervals"
  | "Math & Geometry"
  | "Bit Manipulation";

export interface SummaryNote {
  id: string;
  content?: string;
  createdAt?: Date;
}

export interface Problem {
  _id: string;
  category: Category;
  problemName: string;
  difficulty: Difficulty;
  leetcodeNumber?: string;
  videoUrl?: string;
  problemUrl?: string;
  summaryNotes: SummaryNote[];
  solved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stats {
  total: number;
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  byCategory: Record<Category, { total: number; solved: number }>;
}
