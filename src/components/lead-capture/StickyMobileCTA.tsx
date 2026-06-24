import Link from "next/link";
import { Button } from "@/components/ui";

interface StickyMobileCTAProps {
  /** Where the CTA points. Defaults to the application form. */
  href?: string;
  /** Button label. */
  label?: string;
}

export function StickyMobileCTA({
  href = "/apply",
  label = "Get Your Rate →",
}: StickyMobileCTAProps = {}) {
  return (
    <div role="complementary" aria-label="Quick action" className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-surface border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)] px-4 py-3">
      <Button as={Link} href={href} className="w-full" size="md">
        {label}
      </Button>
    </div>
  );
}
