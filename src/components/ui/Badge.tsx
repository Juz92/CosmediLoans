interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-primary-wash text-primary",
    success: "bg-green-50 text-green-700",
    outline: "border border-border text-text-body",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
