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
  { value: "debt-consolidation", label: "Debt Consolidation" },
  { value: "other", label: "Other Medical Procedure" },
];

interface InlineLeadFormProps {
  defaultProcedure?: string;
  heading?: string;
}

export function InlineLeadForm({
  defaultProcedure,
  heading = "Get Your Personalised Rate",
}: InlineLeadFormProps) {
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
      <div className="bg-primary-wash rounded-card p-8 text-center">
        <CheckCircle className="h-10 w-10 text-success mx-auto mb-3" />
        <h3 className="text-lg font-bold text-text-dark mb-1">
          You&apos;re All Set!
        </h3>
        <p className="text-sm text-text-body">
          A broker will be in touch shortly with your personalised rate options.
        </p>
      </div>
    );
  }

  return (
      <div className="bg-primary-wash rounded-card p-6 md:p-8 border border-primary/10">
      <h3 className="text-lg font-bold text-text-dark mb-1">{heading}</h3>
      <p className="text-sm text-text-body mb-5">
        No impact to your credit score &middot; Takes 60 seconds
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Full name"
          placeholder="Full name"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <Input
          label="Phone"
          placeholder="04XX XXX XXX"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Email"
          placeholder="Email address"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Select
          label="Procedure type"
          placeholder="Procedure type..."
          options={procedureOptions}
          error={errors.procedure?.message}
          {...register("procedure")}
        />
        <Input
          label="Estimated amount"
          placeholder="Estimated amount (e.g. $10,000)"
          autoComplete="off"
          inputMode="numeric"
          error={errors.amount?.message}
          {...register("amount")}
          className="sm:col-span-2"
        />
        <div className="sm:col-span-2">
          <Button type="submit" className="w-full" size="md" disabled={isSubmitting}>
            {isSubmitting ? "Checking..." : "Check My Rate \u2192"}
          </Button>
        </div>
        {submitError && (
          <p role="alert" className="text-sm text-red-500 text-center sm:col-span-2">
            {submitError}
          </p>
        )}
      </form>
    </div>
  );
}
