"use client";

import { useSupabase } from "@/lib/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import config from "@/config";

export default function SignIn() {
  const supabase = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.replace("/dashboard");
      }
    };

    checkUser();
  }, [router, supabase.auth]);

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("Google sign in error:", error.message);
      }
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-sm w-full space-y-6 text-center px-4 md:px-0">
        <div>
          <h2 className="text-3xl font-extrabold">Sign in to CookFast</h2>
          <p className="mt-2 text-sm text-base-content/60">
            Access your dashboard and manage your account
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-primary w-full h-16 text-xl font-['Bricolage_Grotesque'] flex items-center justify-center gap-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              className="w-7 h-7"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-sm text-base-content/60">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="text-gray-300 hover:text-white transition-colors hover:underline decoration-2 decoration-green-500"
            >
              Terms of Service
            </Link>
            ,{" "}
            <Link
              href="/privacy"
              className="text-gray-300 hover:text-white transition-colors hover:underline decoration-2 decoration-green-500"
            >
              Privacy Policy
            </Link>
            , &{" "}
            <Link
              href="/license"
              className="text-gray-300 hover:text-white transition-colors hover:underline decoration-2 decoration-green-500"
            >
              License
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
