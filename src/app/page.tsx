import { createClient } from "@/lib/supabase-server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="container">
      <h1>Welcome to Supabase Demo</h1>
      <p>A simple Next.js app with Supabase Auth and a todo list.</p>
      {user ? (
        <div>
          <p>
            Signed in as <strong>{user.email}</strong>
          </p>
          <p style={{ marginTop: "1rem" }}>
            <a href="/dashboard">Go to Dashboard</a>
          </p>
        </div>
      ) : (
        <p style={{ marginTop: "1rem" }}>
          <a href="/signup">Create an account</a> or{" "}
          <a href="/login">sign in</a> to get started.
        </p>
      )}
    </div>
  );
}
