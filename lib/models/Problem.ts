import mongoose, { Schema, type Document } from "mongoose";

export interface ISummaryNote {
  id: string;
  content: string;
  createdAt: Date;
}

export interface IProblem extends Document {
  category: string;
  problemName: string;
  difficulty: "Easy" | "Medium" | "Hard";
  leetcodeNumber?: string;
  videoUrl?: string;
  problemUrl?: string;
  summaryNotes: ISummaryNote[];
  solved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const summaryNoteSchema = new Schema({
  id: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const problemSchema = new Schema<IProblem>(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "Arrays & Hashing",
        "Two Pointers",
        "Sliding Window",
        "Stack",
        "Binary Search",
        "Linked List",
        "Trees",
        "Tries",
        "Heap/Priority Queue",
        "Backtracking",
        "Graphs",
        "Advanced Graphs",
        "1-D DP",
        "2-D DP",
        "Greedy",
        "Intervals",
        "Math & Geometry",
        "Bit Manipulation",
      ],
    },
    problemName: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    leetcodeNumber: String,
    videoUrl: String,
    problemUrl: String,
    summaryNotes: [summaryNoteSchema],
    solved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Problem ||
  mongoose.model<IProblem>("Problem", problemSchema);
