import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-neon-orange/40 bg-neon-orange/10 text-neon-orange",
        accent:
          "border-neon-blue/40 bg-neon-blue/10 text-neon-blue",
        success:
          "border-neon-green/40 bg-neon-green/10 text-neon-green",
        muted:
          "border-border bg-muted/50 text-muted-foreground",
        danger:
          "border-neon-red/40 bg-neon-red/10 text-neon-red",
        outline: "border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
