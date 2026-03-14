import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  return NextResponse.json({
    cookies: allCookies.map((c) => ({ name: c.name, valueLen: c.value.length, valuePreview: c.value.substring(0, 50) })),
    user: user ? { id: user.id, email: user.email } : null,
    error: error ? error.message : null,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
}
