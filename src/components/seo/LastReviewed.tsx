import { LAST_REVIEWED } from "@/lib/site";

function format(date: string): string {
  return new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function LastReviewed({ date = LAST_REVIEWED }: { date?: string }) {
  return (
    <p className="text-xs text-text-muted">
      Last reviewed:{" "}
      <time dateTime={date} className="font-medium">
        {format(date)}
      </time>
    </p>
  );
}
