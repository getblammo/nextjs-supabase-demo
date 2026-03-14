"use client";

import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTitle, setNewTitle] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const { data, error } = await supabase
      .from("todos")
      .insert({ title: newTitle.trim() })
      .select()
      .single();

    if (!error && data) {
      setTodos([data, ...todos]);
      setNewTitle("");
    }
  }

  async function toggleTodo(id: number, completed: boolean) {
    await supabase.from("todos").update({ completed: !completed }).eq("id", id);
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !completed } : t)));
  }

  async function deleteTodo(id: number) {
    await supabase.from("todos").delete().eq("id", id);
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div>
      <form className="add-form" onSubmit={addTodo}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p>No todos yet. Add one above!</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, todo.completed)}
            />
            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ background: "#dc3545", padding: "0.25rem 0.5rem", fontSize: "0.8rem" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
