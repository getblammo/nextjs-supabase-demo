import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import TodoList from "./todo-list";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: todos } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>
        Signed in as <strong>{user.email}</strong>
      </p>
      <h2 style={{ marginTop: "1.5rem" }}>Your Todos</h2>
      <TodoList initialTodos={todos || []} />
    </div>
  );
}
