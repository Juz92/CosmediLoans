import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  procedure: z.string().min(1, "Please select a procedure"),
  amount: z.string().min(1, "Please enter an amount"),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  pageOrigin: z.string().optional(),
});

export type LeadData = z.infer<typeof leadSchema>;
