"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, type LeadData } from "@/lib/leads";
import { captureUTMParams, getStoredUTMParams } from "@/lib/utm";
import { Input, Select, Button } from "@/components/ui";
import { BadgeCheck, CheckCircle, Clock, Lock } from "lucide-react";

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
  { value: "mommy-makeover", label: "Mummy Makeover" },
  { value: "debt-consolidation", label: "Debt Consolidation" },
  { value: "vet-bills", label: "Vet Bills" },
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
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "hero-form",
          name: enrichedData.fullName,
          email: enrichedData.email,
          phone: enrichedData.phone,
          procedure: enrichedData.procedure,
          amount: enrichedData.amount,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[22px] border border-primary-light/15 bg-white p-8 text-center shadow-brand-panel">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h2 className="text-xl font-bold text-text-dark mb-2">
          You&apos;re All Set!
        </h2>
        <p className="text-text-body">
          A broker will be in touch shortly with your personalised rate options.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[22px] border border-primary-light/15 bg-white/95 p-6 shadow-brand-panel backdrop-blur md:p-7">
      <h2 className="text-2xl font-extrabold tracking-tight text-primary mb-1">
        Get Your Personalised Rate
      </h2>
      <p className="text-sm font-medium text-primary-light mb-5">
        No impact to your credit score
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        <Input
          label="Full Name"
          placeholder="Your full name"
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
          placeholder="you@email.com"
          type="email"
          autoComplete="email"
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
          autoComplete="off"
          inputMode="numeric"
          error={errors.amount?.message}
          {...register("amount")}
        />
        <Button type="submit" className="w-full min-h-[52px] shadow-brand-soft" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Checking..." : "Check My Rate \u2192"}
        </Button>
        {submitError && (
          <p role="alert" className="text-sm text-red-500 text-center">{submitError}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-1 text-xs font-medium text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            Free quote
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            No obligation
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Takes 60 seconds
          </span>
        </div>
      </form>
    </div>
  );
}
