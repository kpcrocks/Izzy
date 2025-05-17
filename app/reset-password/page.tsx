"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const token = searchParams.get("token");

    if (!token) {
      toast.error("Invalid reset link");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset successful! Please login with your new password.");
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-serif text-black">
            Set new password
          </h2>
          <p className="mt-2 text-center text-sm text-black/70">
            Please enter your new password below.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                New password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black/10 placeholder-black/50 text-black bg-white rounded-t-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="New password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black/10 placeholder-black/50 text-black bg-white rounded-b-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border-2 border-black text-sm font-medium text-black bg-white hover:bg-black hover:text-white transition-colors disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </div>

          {success && (
            <div className="text-green-600 text-sm text-center">{success}</div>
          )}
        </form>
      </div>
    </div>
  );
} 