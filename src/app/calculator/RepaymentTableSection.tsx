"use client";

import { useMemo, useState } from "react";
import { calculateRepayment } from "@/lib/calculator";
import { RepaymentTable } from "@/components/calculator/RepaymentTable";

/**
 * Client-side wrapper that generates a default amortisation schedule for the
 * standalone repayment table section on the calculator page. This uses a sensible
 * default ($15,000 at 7.99% over 3 years) so the table is useful even without
 * interacting with the main calculator.
 */
export function RepaymentTableSection() {
  const [amount] = useState(15_000);
  const [rate] = useState(7.99);
  const [term] = useState(3);

  const result = useMemo(
    () => calculateRepayment(amount, rate, term),
    [amount, rate, term]
  );

  return (
    <div>
      <p className="text-sm text-text-muted mb-4 text-center">
        Showing schedule for a $15,000 loan at 7.99% p.a. over 3 years.
        Adjust the calculator above to see your personalised schedule.
      </p>
      <RepaymentTable schedule={result.schedule} />
    </div>
  );
}
