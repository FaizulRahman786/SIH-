import { COMPETENCY_LABELS, type CompetencyLevel } from "../../types";

interface CompetencyBarProps {
  current: CompetencyLevel;
  required: CompetencyLevel;
  showLabels?: boolean;
  className?: string;
}

const LEVEL_COLORS: Record<number, string> = {
  0: "var(--color-muted)",
  1: "#fbbf24",
  2: "#f97316",
  3: "#0ea5e9",
  4: "var(--color-blue-primary)",
  5: "var(--color-success)",
};

export function CompetencyBar({ current, required, showLabels = true, className = "" }: CompetencyBarProps) {
  const pips = [0, 1, 2, 3, 4, 5];

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center gap-1">
        {pips.map((level) => {
          const isFilled = level <= current;
          const isTarget = level === required && level > current;
          return (
            <div
              key={level}
              className="flex-1 h-2 rounded-full transition-all duration-500"
              style={{
                backgroundColor: isFilled
                  ? LEVEL_COLORS[current]
                  : isTarget
                  ? "var(--color-border-strong)"
                  : "var(--color-muted)",
                border: isTarget ? "1.5px dashed var(--color-muted-fg)" : "none",
              }}
            />
          );
        })}
      </div>
      {showLabels && (
        <div className="flex justify-between text-[10px] text-[var(--color-muted-fg)] font-mono">
          <span>{COMPETENCY_LABELS[current]} ({current}/5)</span>
          <span className="text-[var(--color-text-secondary)]">Target: {COMPETENCY_LABELS[required]} ({required}/5)</span>
        </div>
      )}
    </div>
  );
}
