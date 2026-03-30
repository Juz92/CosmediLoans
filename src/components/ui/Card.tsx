interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-card p-7 shadow-card ${
        hover ? "transition-all duration-200 hover:shadow-hover hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
