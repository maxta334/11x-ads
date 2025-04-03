import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import config from "@/config";

export default async function LayoutPrivate({ children }) {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(config.auth.loginUrl);
  }

  // Check if user has paid access
  const { data: profile } = await supabase
    .from("profiles")
    .select("has_access")
    .eq("id", user.id)
    .single();

  if (!profile?.has_access) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-base-100 font-bricolage">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-fadeIn">
          {children}
        </div>
      </div>
    </div>
  );
}

