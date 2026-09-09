type BadgeVariant = "default" | "critical" | "high" | "medium" | "low" | "success" | "info" | "warning";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: "bg-[var(--color-muted)] text-[var(--color-text-secondary)]",
  critical: "bg-[var(--color-critical-bg)] text-[var(--color-critical-fg)] border border-[var(--color-critical-fg)]/30",
  high: "bg-[var(--color-warning-bg)] text-[var(--color-warning-fg)] border border-[var(--color-warning-fg)]/30",
  medium: "bg-[var(--color-caution-bg)] text-[var(--color-caution-fg)] border border-[var(--color-caution-fg)]/30",
  low: "bg-[var(--color-blue-muted)] text-[var(--color-blue-primary)] border border-[var(--color-blue-primary)]/30",
  success: "bg-[var(--color-success-bg)] text-[var(--color-success-fg)] border border-[var(--color-success-fg)]/30",
  info: "bg-[var(--color-blue-muted)] text-[var(--color-blue-primary)] border border-[var(--color-blue-primary)]/20",
  warning: "bg-[var(--color-caution-bg)] text-[var(--color-caution-fg)] border border-[var(--color-caution-fg)]/30",
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ label, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-mono ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
