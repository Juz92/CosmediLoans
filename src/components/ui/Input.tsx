"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      id: externalId,
      "aria-label": ariaLabel,
      placeholder,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId || generatedId;
    const errorId = `${id}-error`;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-semibold text-text-dark">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          placeholder={placeholder}
          aria-label={label ? ariaLabel : ariaLabel ?? placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`w-full px-4 py-3 border border-border rounded-button bg-background text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
export type { InputProps };
