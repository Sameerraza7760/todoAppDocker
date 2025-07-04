import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/todo.models";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const todos = await Todo.find().sort({ createdAt: -1 });
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { title } = await req.json();
  await dbConnect();
  const newTodo = await Todo.create({ title });
  return NextResponse.json(newTodo);
}
