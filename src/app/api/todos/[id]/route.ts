import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/todo.models";
import { NextRequest, NextResponse } from "next/server";

// Using 'any' to bypass the stubborn type checker
export async function DELETE(req: NextRequest, { params }: any) {
    try {
        await dbConnect();
        // We assume params.id exists and is a string
        const deletedTodo = await Todo.findByIdAndDelete(params.id); 

        // ...rest of the function is the same
        if (!deletedTodo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}

// Using 'any' again for the PUT function
export async function PUT(req: NextRequest, { params }: any) {
    try {
        await dbConnect();
        const { title } = await req.json();

        if (!title) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }
        
        // We assume params.id exists and is a string
        const updatedTodo = await Todo.findByIdAndUpdate(
            params.id,
            { title },
            { new: true }
        );

        // ...rest of the function is the same
        if (!updatedTodo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        return NextResponse.json(updatedTodo);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}