import { NextResponse, NextRequest } from "next/server";
import Todo from "@/models/todo.models";
import dbConnect from "@/lib/dbConnect";

// ✅ Define your own Params type instead of importing from internal Next.js files
type Params = {
  id: string;
};

// DELETE /api/todos/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Params }
) {
  try {
    await dbConnect();

    const deletedTodo = await Todo.findByIdAndDelete(params.id);

    if (!deletedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

// PUT /api/todos/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Params }
) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      params.id,
      { title },
      { new: true }
    );

    if (!updatedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
