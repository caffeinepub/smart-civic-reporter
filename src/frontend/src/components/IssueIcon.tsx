import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Construction,
  Droplets,
  Lamp,
  Trash2,
} from "lucide-react";

const issueIconMap: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  Pothole: { icon: Construction, color: "text-orange-600", bg: "bg-orange-50" },
  Garbage: { icon: Trash2, color: "text-red-600", bg: "bg-red-50" },
  Streetlight: { icon: Lamp, color: "text-yellow-600", bg: "bg-yellow-50" },
  "Water Leak": { icon: Droplets, color: "text-blue-600", bg: "bg-blue-50" },
};

interface IssueIconProps {
  issueType: string;
  size?: "sm" | "md" | "lg";
}

export function IssueIcon({ issueType, size = "md" }: IssueIconProps) {
  const config = issueIconMap[issueType] ?? {
    icon: AlertCircle,
    color: "text-muted-foreground",
    bg: "bg-muted",
  };
  const Icon = config.icon;

  const sizeClasses = {
    sm: { wrap: "h-8 w-8", icon: "h-4 w-4" },
    md: { wrap: "h-10 w-10", icon: "h-5 w-5" },
    lg: { wrap: "h-14 w-14", icon: "h-7 w-7" },
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl",
        config.bg,
        sizeClasses[size].wrap,
      )}
    >
      <Icon className={cn(config.color, sizeClasses[size].icon)} />
    </div>
  );
}
