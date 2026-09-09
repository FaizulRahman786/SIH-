import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-[var(--color-blue-muted)] flex items-center justify-center mb-4">
        <Icon size={24} className="text-[var(--color-blue-primary)]" />
      </div>
      <h3 className="text-base font-semibold text-[var(--color-text)] mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h3>
      <p className="text-sm text-[var(--color-muted-fg)] max-w-xs leading-relaxed">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-5 px-4 py-2 bg-[var(--color-blue-primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-blue-light)] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
