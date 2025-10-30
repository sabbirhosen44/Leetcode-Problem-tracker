import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Problem from "@/lib/models/Problem";
import { Types } from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid problem ID" },
        { status: 400 }
      );
    }

    const problem = await Problem.findById(id);

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    console.log("[v0] Fetched problem:", id);
    return NextResponse.json(problem);
  } catch (error) {
    console.error("[v0] Error fetching problem:", error);
    return NextResponse.json(
      { error: "Failed to fetch problem" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid problem ID" },
        { status: 400 }
      );
    }

    console.log("[v0] Updating problem:", id, "with data:", body);

    // const updateData = {
    //   ...body,
    //   summaryNotes: Array.isArray(body.summaryNotes)
    //     ? body.summaryNotes.map((note: any) => ({
    //         id: note.id || `${Date.now()}-${Math.random()}`,
    //         content: note.content || note,
    //         createdAt: note.createdAt || new Date(),
    //       }))
    //     : [],
    // };
    const updateData = { ...body };

    const problem = await Problem.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    console.log(problem);

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    console.log("[v0] Problem updated successfully:", id);
    return NextResponse.json(problem);
  } catch (error) {
    console.error("[v0] Error updating problem:", error);
    return NextResponse.json(
      { error: "Failed to update problem", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid problem ID" },
        { status: 400 }
      );
    }

    const problem = await Problem.findByIdAndDelete(id);

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    console.log("[v0] Problem deleted successfully:", id);
    return NextResponse.json({ message: "Problem deleted successfully" });
  } catch (error) {
    console.error("[v0] Error deleting problem:", error);
    return NextResponse.json(
      { error: "Failed to delete problem", details: String(error) },
      { status: 500 }
    );
  }
}
