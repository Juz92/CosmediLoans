import { forwardRef, type ElementType, type ComponentPropsWithRef } from "react";

type CardOwnProps<T extends ElementType = "div"> = {
  as?: T;
  hover?: boolean;
};

type CardProps<T extends ElementType = "div"> = CardOwnProps<T> &
  Omit<ComponentPropsWithRef<T>, keyof CardOwnProps<T>>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ as, hover = false, className = "", children, ...props }, ref) => {
    const Component = as || "div";
    return (
      <Component
        ref={ref}
        className={`bg-surface rounded-card p-card shadow-card ${
          hover ? "transition-all duration-200 hover:shadow-hover hover:-translate-y-1" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";
export { Card };
export type { CardProps };
