import Link from "next/link";

interface BrandLogoProps {
  href?: string;
  className?: string;
  markClassName?: string;
  light?: boolean;
}

export function BrandLogo({
  href = "/",
  className = "",
  markClassName = "",
  light = false,
}: BrandLogoProps) {
  const textColor = light ? "text-white" : "text-primary";
  const accentColor = light ? "text-white" : "text-primary-light";
  const underlineColor = light ? "text-white/85" : "text-primary-light";
  const label = (
    <span className={`relative inline-flex pb-1.5 ${markClassName}`}>
      <span className={`text-[22px] font-extrabold leading-none tracking-tight ${textColor}`}>
        Cosmedi<span className={accentColor}>Loans</span>
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 112 14"
        className={`absolute -bottom-0.5 left-[4.65rem] h-3 w-24 ${underlineColor}`}
        fill="none"
      >
        <path
          d="M2 8.5c17 4.5 33 4.5 48 0s32-4.5 60 0"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center ${className}`}
      aria-label="CosmediLoans home"
    >
      {label}
    </Link>
  );
}
