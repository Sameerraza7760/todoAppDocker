'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, PlusCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTodos } from "@/hook/useTodo";
export default function TodoApp() {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const { todos, addTodo, deleteTodo, loading, editTodo } = useTodos();

  const handleAdd = async () => {
    if (input.trim()) {
      await addTodo(input.trim());
      setInput("");
    }
  };
  const handleEdit = async (id: string) => {
    if (!editText.trim()) return;
    console.log(editText)
    await editTodo(id, editText.trim());
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 tracking-tight">📝 Todos Lists</h1>

        <div className="flex gap-2">
          <Input
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 shadow-md"
          />
          <Button
            onClick={handleAdd}
            className="gap-1 shadow-md"
            disabled={!input.trim() || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Add</span>
              </>
            )}
          </Button>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {todos.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="flex items-center justify-between px-4 py-3 hover:shadow-md transition-shadow">
                  {editId === task._id ? (
                    <div className="flex gap-2 w-full">
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => handleEdit(task._id)}
                        variant="outline"
                        size="sm"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="text-gray-800 font-medium flex-1 cursor-pointer"
                      onClick={() => {
                        setEditId(task._id);
                        setEditText(task.title);
                      }}
                    >
                      {task.title}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => deleteTodo(task._id)}
                    size="icon"
                    className="cursor-pointer"
                  >
                    <Trash2 className="text-red-500 hover:text-red-600" size={18} />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {todos.length === 0 && !loading && (
            <p className="text-center text-gray-400 italic">No tasks added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
