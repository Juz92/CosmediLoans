"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, type LeadData } from "@/lib/leads";
import { captureUTMParams, getStoredUTMParams } from "@/lib/utm";
import { Input, Select, Button } from "@/components/ui";
import { CheckCircle } from "lucide-react";

const procedureOptions = [
  { value: "dental", label: "Dental" },
  { value: "veneers", label: "Veneers" },
  { value: "invisalign", label: "Invisalign / Orthodontics" },
  { value: "ivf", label: "IVF / Fertility" },
  { value: "breast-augmentation", label: "Breast Augmentation" },
  { value: "rhinoplasty", label: "Rhinoplasty" },
  { value: "tummy-tuck", label: "Tummy Tuck" },
  { value: "liposuction", label: "Liposuction" },
  { value: "facelift", label: "Facelift" },
  { value: "lasik", label: "LASIK / Vision" },
  { value: "bariatric", label: "Bariatric Surgery" },
  { value: "hair-transplant", label: "Hair Transplant" },
  { value: "orthopedic", label: "Orthopedic Surgery" },
  { value: "dermatology", label: "Dermatology" },
  { value: "mommy-makeover", label: "Mommy Makeover" },
  { value: "other", label: "Other Medical Procedure" },
];

interface HeroLeadFormProps {
  defaultProcedure?: string;
}

export function HeroLeadForm({ defaultProcedure }: HeroLeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    captureUTMParams();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      procedure: defaultProcedure || "",
    },
  });

  const onSubmit = async (data: LeadData) => {
    setSubmitError("");
    const utm = getStoredUTMParams();
    const enrichedData = {
      ...data,
      utmSource: utm.utm_source,
      utmMedium: utm.utm_medium,
      utmCampaign: utm.utm_campaign,
      utmContent: utm.utm_content,
      utmTerm: utm.utm_term,
      pageOrigin: typeof window !== "undefined" ? window.location.pathname : "",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrichedData),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-surface rounded-card p-8 shadow-form text-center">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h3 className="text-xl font-bold text-text-dark mb-2">
          You&apos;re All Set!
        </h3>
        <p className="text-text-body">
          A broker will be in touch shortly with your personalised rate options.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-card p-8 shadow-form">
      <h3 className="text-xl font-bold text-text-dark mb-1">
        Get Your Personalised Rate
      </h3>
      <p className="text-sm text-text-muted mb-6">
        No impact to your credit score
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Your full name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <Input
          label="Phone"
          placeholder="04XX XXX XXX"
          type="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Email"
          placeholder="you@email.com"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Select
          label="Procedure Type"
          placeholder="Select a procedure..."
          options={procedureOptions}
          error={errors.procedure?.message}
          {...register("procedure")}
        />
        <Input
          label="Estimated Amount"
          placeholder="e.g. $10,000"
          error={errors.amount?.message}
          {...register("amount")}
        />
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Checking..." : "Check My Rate \u2192"}
        </Button>
        {submitError && (
          <p role="alert" className="text-sm text-red-500 text-center">{submitError}</p>
        )}
        <p className="text-xs text-text-muted text-center">
          Free quote &middot; No obligation &middot; Takes 60 seconds
        </p>
      </form>
    </div>
  );
}
