"use client";

import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyReturn } from "@/lib/data";
import { formatPercent } from "@/lib/utils";

export function MonthlyReturns({ data }: { data: MonthlyReturn[] }) {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis
            tickFormatter={(v) => `${v}%`}
            tickLine={false}
            axisLine={false}
            width={44}
          />
          <Tooltip content={<MonthlyTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="returnPct" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.returnPct >= 0 ? "#22f5a3" : "#ff4d5e"}
                fillOpacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function MonthlyTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const v = payload[0].value;
  return (
    <div className="rounded-md border border-border bg-popover/95 p-3 text-xs shadow-lg backdrop-blur">
      <div className="mb-1 font-semibold">{label}</div>
      <div
        className={`mono ${v >= 0 ? "text-neon-green" : "text-neon-red"}`}
      >
        {formatPercent(v)}
      </div>
    </div>
  );
}
