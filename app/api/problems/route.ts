import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Problem from "@/lib/models/Problem";

export async function GET() {
  try {
    await connectDB();
    const problems = await Problem.find().sort({ createdAt: -1 });
    console.log("[v0] Fetched problems:", problems.length);
    return NextResponse.json(problems);
  } catch (error) {
    console.error("[v0] Error fetching problems:", error);
    return NextResponse.json(
      { error: "Failed to fetch problems" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    console.log(body);
    console.log("[v0] Creating problem with data:", body);

    if (!body.category || !body.problemName || !body.difficulty) {
      return NextResponse.json(
        { error: "Missing required fields: category, problemName, difficulty" },
        { status: 400 }
      );
    }

    const summaryNotes = Array.isArray(body.summaryNotes)
      ? body.summaryNotes.map((note: any) => ({
          id: note.id || `${Date.now()}-${Math.random()}`,
          content: note.content || note,
          createdAt: new Date(),
        }))
      : [];

    const problem = new Problem({
      category: body.category,
      problemName: body.problemName,
      difficulty: body.difficulty,
      leetcodeNumber: body.leetcodeNumber || "",
      videoUrl: body.videoUrl || "",
      problemUrl: body.problemUrl || "",
      summaryNotes,
      solved: body.solved || false,
    });

    const savedProblem = await problem.save();
    console.log("[v0] Problem created successfully:", savedProblem._id);
    return NextResponse.json(savedProblem, { status: 201 });
  } catch (error) {
    console.error("[v0] Error creating problem:", error);
    return NextResponse.json(
      { error: "Failed to create problem", details: String(error) },
      { status: 500 }
    );
  }
}
