import { useEffect, useState } from "react";
import axios from "axios";

export type Todo = {
  _id: string;
  title: string;
  completed?: boolean;
};

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    const res = await axios.get<Todo[]>("/api/todos");
    setTodos(res.data);
    // setLoading(false);
  };

  const addTodo = async (title: string) => {
    try {
      setLoading(true)
      const res = await axios.post<Todo>("/api/todos", { title });
      // setLoading(false)
      setTodos((prev) => [res.data, ...prev])

    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.log(error)
    }
  };
  const editTodo = async (id: string, newTitle: string) => {
    try {
      const res = await axios.put<Todo>(`/api/todos/${id}`, { title: newTitle });
      console.log(res)
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? res.data : todo))
      );
    } catch (error) {
      console.error("Failed to edit todo", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, addTodo, deleteTodo, editTodo };
}
