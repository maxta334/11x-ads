"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase/client";
import { FaFileInvoice, FaHome, FaCalendar, FaDiscord } from "react-icons/fa";

export default function Dashboard() {
  const [githubUsername, setGithubUsername] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const supabase = useSupabase();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/signin");
        return;
      }
      setUser(user);
    };

    getUser();
  }, [supabase, router]);

  const handleRequestAccess = async () => {
    if (!githubUsername) {
      setError("Please enter a GitHub username");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/invite-to-github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: githubUsername }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details?.inviteUrl) {
          setSuccess(true);
          setSuccessMessage(`You already have a pending invitation. Check your email or visit ${data.details.inviteUrl}`);
        } else {
          throw new Error(data.message || 'Failed to send invitation');
        }
      } else {
        setSuccess(true);
        setSuccessMessage('Invitation sent successfully! Check your email to accept it.');
      }
      
      setGithubUsername('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 space-y-4 max-w-5xl mx-auto">
      <div className="pt-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center">CookFast Boilerplate</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-gray-600 gap-6 px-4 md:px-8 pt-12">
        {/* Left Column - GitHub Access */}
        <div className="space-y-4 md:pr-8">
          {/* Welcome Message */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src={user.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=" + user.email}
              alt="Profile picture"
              className="w-12 h-12 rounded-full"
            />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-neutral-content">
                Welcome {user.user_metadata?.full_name || user.email}!
              </h3>
              <p className="text-neutral-content/70 text-sm italic">
                CookFast will help you ship faster & get profitable. Excited to see what you build!
              </p>
            </div>
          </div>

          <div className="space-y-4 text-neutral-content text-base">
            <p>
              Enter your <span className="font-semibold">GitHub username</span> to get access to the repository. 
              You&apos;ll receive an email from GitHub to confirm your access.
            </p>
          </div>

          <div className="space-y-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base text-neutral-content">GitHub username</span>
              </label>
              <input
                type="text"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="cookfast"
                className="input input-bordered w-full bg-base-200 text-neutral-content h-10 min-h-[2.5rem]"
              />
            </div>

            {error && (
              <div className="alert alert-error py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="alert alert-success py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm">{successMessage}</span>
              </div>
            )}

            <button
              onClick={handleRequestAccess}
              disabled={isLoading}
              className="btn btn-primary w-full text-base font-semibold h-10 min-h-[2.5rem]"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Sending invitation...
                </>
              ) : (
                'Request Access'
              )}
            </button>
          </div>

          <div className="space-y-1.5 text-neutral-content/70 text-sm">
            <p>1. Request Github access & accept invitation via email</p>
            <p>2. Book an onboarding call to get started quickly</p>
            <p>3. Use <a 
                 href="https://www.cursor.com/"
                 target="_blank"
                 rel="noopener noreferrer" 
                 className="underline hover:text-neutral-content"
               >
                 Cursor
               </a> to understand the architecture (documentation coming soon)
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-base-300">
            <div className="flex gap-3">
              <a 
                href="/"
                className="btn btn-secondary gap-2 px-4 h-9 min-h-[2.25rem] text-sm"
              >
                <FaHome className="w-4 h-4" />
                Home
              </a>
              <a 
                href={`https://cookfast.lemonsqueezy.com/billing`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary gap-2 px-4 h-9 min-h-[2.25rem] text-sm"
              >
                <FaFileInvoice className="w-4 h-4" />
                Invoice
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Links */}
        <div className="space-y-4 md:pl-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-neutral-content">Next Steps</h2>
            <p className="text-neutral-content/70 mt-1 text-sm">
              Join our community and book an onboarding call to get started.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <a
              href="https://discord.gg/92yd7EWvHA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary gap-2 h-12 min-h-[3rem] text-base"
            >
              <FaDiscord className="w-5 h-5" />
              Join Discord Community
            </a>

            <a
              href="https://cal.com/cookfast/onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary gap-2 h-12 min-h-[3rem] text-base"
            >
              <FaCalendar className="w-5 h-5" />
              Book Onboarding Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
