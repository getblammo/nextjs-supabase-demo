import "./globals.css";
import { createClient } from "@/lib/supabase-server";

export const metadata = {
  title: "Next.js Supabase Demo",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">
            <strong>Supabase Demo</strong>
          </a>
          <div>
            {user ? (
              <>
                <span>Hello, {user.email}</span>
                <a href="/dashboard">Dashboard</a>
                <form action="/auth/signout" method="post" style={{ display: "inline" }}>
                  <button type="submit" style={{ background: "none", color: "#0070f3", padding: 0 }}>
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <a href="/login">Login</a>
                <a href="/signup">Sign Up</a>
              </>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
