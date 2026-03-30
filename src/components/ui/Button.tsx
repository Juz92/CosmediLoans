import { forwardRef, type ElementType, type ComponentPropsWithRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonOwnProps<T extends ElementType = "button"> = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: T;
};

type ButtonProps<T extends ElementType = "button"> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithRef<T>, keyof ButtonOwnProps<T>>;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90 shadow-sm",
  secondary: "bg-white text-primary border border-border hover:bg-primary-wash",
  ghost: "text-text-body hover:text-text-dark hover:bg-primary-wash",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", as, className = "", children, ...props }, ref) => {
    const Component = as || "button";
    return (
      <Component
        ref={ref}
        className={`inline-flex items-center justify-center font-semibold rounded-button transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps };
