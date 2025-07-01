import { NextRequest, NextResponse } from "next/server";
import Todo from "@/models/todo.models";
import dbConnect from "@/lib/dbConnect";

// DELETE /api/todos/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await dbConnect();

    const deletedTodo = await Todo.findByIdAndDelete(context.params.id);

    if (!deletedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}

// PUT /api/todos/[id]
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await dbConnect();

    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      context.params.id,
      { title },
      { new: true }
    );

    if (!updatedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
  }
}
