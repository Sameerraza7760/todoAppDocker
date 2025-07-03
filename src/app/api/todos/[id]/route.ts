import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/todo.models";
import { NextRequest, NextResponse } from "next/server";

// This type definition is still good and correct
type RouteContext = {
    params: {
        id: string;
    };
};

// CHANGE 1: The function signature now accepts a 'context' object
export async function DELETE(req: NextRequest, context: RouteContext) {
    // CHANGE 2: Destructure 'id' from context.params *inside* the function
    const { id } = context.params;

    try {
        await dbConnect();

        // CHANGE 3: Use the 'id' variable directly
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}

// Apply the same changes to the PUT function
export async function PUT(req: NextRequest, context: RouteContext) {
    // Destructure 'id' from context.params inside the function
    const { id } = context.params;

    try {
        await dbConnect();

        const body = await req.json();
        const { title } = body;

        if (!title) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        // Use the 'id' variable directly
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
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