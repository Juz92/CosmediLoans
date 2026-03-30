"use client";

import { useEffect } from "react";

export function ConversionPixel() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "lead_form_submission",
        conversionType: "lead",
      });
    }
  }, []);
  return null;
}
