import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/todo.models";
// Import NextRequest as well as NextResponse
import { NextRequest, NextResponse } from "next/server";

// 1. Define a type for the context parameter to make the code cleaner
type RouteContext = {
    params: {
        id: string;
    };
};

// 2. Use the new RouteContext type for the 'DELETE' function's second argument
//    Also, it's good practice to use NextRequest instead of the standard Request.
export async function DELETE(req: NextRequest, { params }: RouteContext) {
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

// 3. Apply the same fix to the 'PUT' function
export async function PUT(req: NextRequest, { params }: RouteContext) {
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
            { new: true } // This ensures the updated document is returned
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