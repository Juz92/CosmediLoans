"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { Mail, CheckCircle2 } from "lucide-react";
import { submitLead } from "@/lib/lead-client";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await submitLead({
        source: "newsletter",
        fullName: "Newsletter Subscriber",
        email,
        procedure: "newsletter",
        pageOrigin: typeof window !== "undefined" ? window.location.pathname : "blog-newsletter",
      });

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-gradient-to-br from-primary-wash to-primary-sky rounded-card p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
        <h3 className="text-xl font-bold text-text-dark mb-2">You&apos;re subscribed!</h3>
        <p className="text-text-body">
          We&apos;ll send you the latest medical financing tips and rate alerts.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary-wash to-primary-sky rounded-card p-8">
      <div className="flex items-center gap-3 mb-3">
        <Mail className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-bold text-text-dark">
          Get Medical Financing Tips &amp; Rate Alerts
        </h3>
      </div>
      <p className="text-text-body mb-6">
        Join thousands of Australians who stay informed about the best rates and
        financing strategies for medical procedures.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
          />
        </div>
        <Button type="submit" disabled={status === "loading"} className="whitespace-nowrap">
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      {errorMsg && (
        <p className="text-sm text-red-500 mt-2">{errorMsg}</p>
      )}
      <p className="text-xs text-text-muted mt-3">
        No spam, ever. Unsubscribe at any time.
      </p>
    </div>
  );
}
