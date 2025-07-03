
import { NextResponse, NextRequest } from "next/server";
import Todo from "@/models/todo.models";
import dbConnect from "@/lib/dbConnect";
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();

        const deletedTodo = await Todo.findByIdAndDelete(params.id);

        if (!deletedTodo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const body = await req.json();
        const { title } = body;

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