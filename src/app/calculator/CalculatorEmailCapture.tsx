"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { submitLead } from "@/lib/lead-client";

export function CalculatorEmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await submitLead({
        source: "calculator-email",
        email,
        procedure: "calculator-email",
        message: "Requested medical loan calculator results by email.",
        pageOrigin: typeof window !== "undefined" ? window.location.pathname : "",
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-button bg-primary-wash p-4 text-center">
        <CheckCircle className="mx-auto mb-2 h-6 w-6 text-success" />
        <p className="text-sm font-semibold text-text-dark">
          Thanks, we received your calculator request.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input type="hidden" name="procedure" value="calculator-email" />
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className="flex-1 px-4 py-3 border border-border rounded-button bg-background text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all text-sm"
        aria-label="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button type="submit" size="md" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Results"}
      </Button>
      {submitError && (
        <p role="alert" className="text-sm text-red-500 text-center sm:col-span-2">
          {submitError}
        </p>
      )}
    </form>
  );
}
