import { cn } from "@/lib/utils";
import { IssueStatus } from "../hooks/useQueries";

interface StatusBadgeProps {
  status: IssueStatus | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = {
    [IssueStatus.pending]: {
      label: "Pending",
      classes: "bg-red-50 text-red-700 border border-red-200 ring-red-100",
    },
    [IssueStatus.inProgress]: {
      label: "In Progress",
      classes:
        "bg-amber-50 text-amber-700 border border-amber-200 ring-amber-100",
    },
    [IssueStatus.resolved]: {
      label: "Resolved",
      classes:
        "bg-emerald-50 text-emerald-700 border border-emerald-200 ring-emerald-100",
    },
  };

  const cfg = config[status as IssueStatus] ?? {
    label: status,
    classes: "bg-muted text-muted-foreground border border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        cfg.classes,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {cfg.label}
    </span>
  );
}
