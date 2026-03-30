import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().email("Valid email is required").max(254),
  phone: z.string().regex(/^(?:\+?61|0)[2-478]\d{8}$/, "Valid Australian phone number required"),
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
