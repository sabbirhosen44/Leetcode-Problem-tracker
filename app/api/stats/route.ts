import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Problem from "@/lib/models/Problem"
import type { Stats, Category } from "@/lib/types"

export async function GET() {
  try {
    await connectDB()
    const problems = await Problem.find()

    console.log("[v0] Calculating stats for", problems.length, "problems")

    const categories: Category[] = [
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
    ]

    const stats: Stats = {
      total: problems.length,
      solved: problems.filter((p) => p.solved).length,
      easy: problems.filter((p) => p.difficulty === "Easy").length,
      medium: problems.filter((p) => p.difficulty === "Medium").length,
      hard: problems.filter((p) => p.difficulty === "Hard").length,
      easySolved: problems.filter((p) => p.difficulty === "Easy" && p.solved).length,
      mediumSolved: problems.filter((p) => p.difficulty === "Medium" && p.solved).length,
      hardSolved: problems.filter((p) => p.difficulty === "Hard" && p.solved).length,
      byCategory: {},
    }

    categories.forEach((category) => {
      const categoryProblems = problems.filter((p) => p.category === category)
      stats.byCategory[category] = {
        total: categoryProblems.length,
        solved: categoryProblems.filter((p) => p.solved).length,
      }
    })

    console.log("[v0] Stats calculated successfully")
    return NextResponse.json(stats)
  } catch (error) {
    console.error("[v0] Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats", details: String(error) }, { status: 500 })
  }
}
