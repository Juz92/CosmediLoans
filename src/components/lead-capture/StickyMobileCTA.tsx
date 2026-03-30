import Link from "next/link";
import { Button } from "@/components/ui";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-surface border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)] px-4 py-3">
      <Button as={Link} href="/apply" className="w-full" size="md">
        Get Your Rate &rarr;
      </Button>
    </div>
  );
}
