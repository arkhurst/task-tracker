import { cn } from "@/lib";
import { TaskPriorityType } from "../types/types";

interface PriorityBadgeProps {
  variant?: TaskPriorityType | "default";
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  high: "bg-red-50 text-red-700 ring-red-600/10",
  medium: "bg-yellow-50 text-yellow-700 ring-yellow-600/10",
  low: "bg-green-50 text-green-700 ring-green-600/10",
  default: "bg-zinc-50 text-zinc-700 ring-zinc-600/10",
} as const;

export const PriorityBadge = ({
  variant = "default",
  children,
  className,
}: PriorityBadgeProps) => {
  return (
    <span
      className={cn(
        "flex h-4 mt-1 ml-2 items-center rounded-sm px-1.5 text-xs font-medium ring-1 ring-inset",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
