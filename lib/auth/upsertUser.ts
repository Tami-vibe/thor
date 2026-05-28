import { createServerClient } from "@/lib/supabase";

const USERS_TABLE = "thor_users";

export type UpsertUserInput = {
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
};

export async function upsertUser(input: UpsertUserInput): Promise<string | null> {
  const supabase = createServerClient();

  const { data: existing, error: selectError } = await supabase
    .from(USERS_TABLE)
    .select("id")
    .eq("email", input.email)
    .maybeSingle();

  if (selectError) {
    console.error("[auth] thor_users select failed", selectError);
    return null;
  }

  const row = {
    id: existing?.id ?? crypto.randomUUID(),
    email: input.email,
    full_name: input.full_name ?? null,
    avatar_url: input.avatar_url ?? null,
  };

  const { data, error } = await supabase
    .from(USERS_TABLE)
    .upsert(row, { onConflict: "email" })
    .select("id")
    .single();

  if (error) {
    console.error("[auth] thor_users upsert failed", error);
    return null;
  }

  return data.id;
}
