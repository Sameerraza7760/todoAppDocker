import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/todo.models";
import { NextResponse } from "next/server";


interface Todo {
  _id: string;
  title: string; createdAt: Date;
  updatedAt: Date;
  completed: boolean;

}

export async function GET() {
  await dbConnect();
  const todos: Todo[] = await Todo.find().sort({ createdAt: -1 });
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
    await dbConnect();
  const { title } = await req.json();

  const newTodo: Todo = await Todo.create({ title });
  return NextResponse.json(newTodo);
}

