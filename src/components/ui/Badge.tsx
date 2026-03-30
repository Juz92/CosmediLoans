import { forwardRef } from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "outline";
  className?: string;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = "default", className = "" }, ref) => {
    const variants = {
      default: "bg-primary-wash text-primary",
      success: "bg-green-50 text-green-700",
      outline: "border border-border text-text-body",
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ${variants[variant]} ${className}`}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
export { Badge };
export type { BadgeProps };
