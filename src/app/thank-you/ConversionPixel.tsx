"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function ConversionPixel() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_form_submission",
      conversion_type: "lead",
      page: "/thank-you",
      timestamp: new Date().toISOString(),
    });
  }, []);

  return null;
}
