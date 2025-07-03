import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/todo.models";
import { NextRequest, NextResponse } from "next/server";

// We are NOT defining a custom RouteContext type here.

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } } // <-- Using the standard inline type
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } } // <-- Using the standard inline type again
) {
    try {
        await dbConnect();
        const { title } = await req.json();

        if (!title) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
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