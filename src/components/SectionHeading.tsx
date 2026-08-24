import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-brown md:text-4xl">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "mt-2 text-sm text-brown-muted md:text-base",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      )}
      <span
        className={cn(
          "mt-4 block h-px w-24 bg-gradient-gold",
          align === "center" && "mx-auto",
        )}
      />
    </div>
  );
}
