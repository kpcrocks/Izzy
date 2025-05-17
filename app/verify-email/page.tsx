"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage("Email verified successfully!");
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification");
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-serif text-black">
            Email Verification
          </h2>
        </div>
        <div className="text-center">
          {status === "loading" && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          )}
          <p className={`mt-4 text-lg ${
            status === "success" ? "text-green-600" :
            status === "error" ? "text-red-600" :
            "text-black"
          }`}>
            {message}
          </p>
          {status === "error" && (
            <Link
              href="/login"
              className="mt-4 inline-block text-black hover:text-black/80"
            >
              Return to login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 