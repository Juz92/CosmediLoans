import { z } from "zod";

const optionalText = (max = 500) =>
  z.preprocess(
    (val) => {
      if (typeof val !== "string") return val;
      const trimmed = val.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    },
    z.string().max(max).optional()
  );

const optionalPhone = z.preprocess(
  (val) => {
    if (typeof val !== "string") return val;
    const cleaned = val.replace(/[\s\-()]/g, "");
    return cleaned.length > 0 ? cleaned : undefined;
  },
  z
    .string()
    .regex(/^(?:\+?61|0)[2-478]\d{8}$/, "Valid Australian phone number required")
    .optional()
);

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().email("Valid email is required").max(254),
  phone: z.string()
    .transform((val) => val.replace(/[\s\-()]/g, ""))
    .pipe(z.string().regex(/^(?:\+?61|0)[2-478]\d{8}$/, "Valid Australian phone number required")),
  procedure: z.string().min(1, "Please select a procedure"),
  amount: z.string().regex(/^\$?[\d,]+(?:\.\d{2})?$/, "Valid amount required"),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  pageOrigin: z.string().optional(),
});

export type LeadData = z.infer<typeof leadSchema>;

export const leadSubmissionSchema = z
  .object({
    source: optionalText(80),
    fullName: optionalText(100),
    name: optionalText(100),
    email: z.string().trim().email("Valid email is required").max(254),
    phone: optionalPhone,
    procedure: optionalText(120),
    amount: optionalText(80),
    message: optionalText(3000),
    question: optionalText(3000),
    utmSource: optionalText(200),
    utmMedium: optionalText(200),
    utmCampaign: optionalText(200),
    utmContent: optionalText(200),
    utmTerm: optionalText(200),
    pageOrigin: optionalText(300),
    landingPage: optionalText(500),
    currentPage: optionalText(500),
    referrer: optionalText(500),
    firstSeenAt: optionalText(80),
  })
  .transform(({ name, fullName, question, message, ...lead }) => ({
    ...lead,
    fullName: fullName ?? name ?? "",
    message: message ?? question,
  }));

export type LeadSubmissionData = z.infer<typeof leadSubmissionSchema>;
