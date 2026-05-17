"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { AssetAllocation } from "@/lib/data";

export function AllocationChart({ data }: { data: AssetAllocation[] }) {
  return (
    <div className="flex items-center gap-6">
      <div className="h-[200px] w-[200px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={88}
              paddingAngle={2}
              stroke="rgba(15, 22, 38, 1)"
              strokeWidth={2}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<AllocationTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="flex-1 space-y-2">
        {data.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-foreground">{item.name}</span>
            </span>
            <span className="mono text-muted-foreground">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AllocationTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; payload: AssetAllocation }[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0];
  return (
    <div className="rounded-md border border-border bg-popover/95 p-3 text-xs shadow-lg backdrop-blur">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-sm"
          style={{ backgroundColor: p.payload.color }}
        />
        <span className="font-semibold">{p.name}</span>
      </div>
      <div className="mono mt-1 text-muted-foreground">{p.value}%</div>
    </div>
  );
}
