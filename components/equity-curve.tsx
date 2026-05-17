"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EquityPoint } from "@/lib/data";
import { formatCurrency, formatPercent } from "@/lib/utils";

export function EquityCurve({ data }: { data: EquityPoint[] }) {
  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="strategyGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff7a18" />
              <stop offset="100%" stopColor="#ff9633" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            interval={Math.floor(data.length / 8)}
            tickMargin={8}
          />
          <YAxis
            tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            tickLine={false}
            axisLine={false}
            width={56}
          />
          <Tooltip content={<EquityTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="plainline"
            wrapperStyle={{ fontSize: 12, paddingBottom: 8 }}
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            name="Benchmark"
            stroke="rgba(148, 163, 184, 0.55)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
            activeDot={false}
          />
          <Line
            type="monotone"
            dataKey="equity"
            name="Strategy"
            stroke="url(#strategyGradient)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#ff7a18", strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DrawdownChart({ data }: { data: EquityPoint[] }) {
  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="ddGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff4d5e" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#ff4d5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            interval={Math.floor(data.length / 8)}
            tickMargin={8}
          />
          <YAxis
            tickFormatter={(v) => `${v}%`}
            tickLine={false}
            axisLine={false}
            width={48}
            domain={["auto", 0]}
          />
          <Tooltip content={<DrawdownTooltip />} />
          <Area
            type="monotone"
            dataKey="drawdown"
            stroke="#ff4d5e"
            strokeWidth={1.5}
            fill="url(#ddGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function EquityTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const strategy = payload.find((p) => p.dataKey === "equity")?.value as number;
  const benchmark = payload.find((p) => p.dataKey === "benchmark")?.value as number;
  return (
    <div className="rounded-md border border-border bg-popover/95 p-3 text-xs shadow-lg backdrop-blur">
      <div className="mb-1 font-semibold">{label}</div>
      <div className="mono flex items-center justify-between gap-4">
        <span className="text-neon-orange">Strategy</span>
        <span>{formatCurrency(strategy)}</span>
      </div>
      <div className="mono flex items-center justify-between gap-4 text-muted-foreground">
        <span>Benchmark</span>
        <span>{formatCurrency(benchmark)}</span>
      </div>
    </div>
  );
}

function DrawdownTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const dd = payload[0].value as number;
  return (
    <div className="rounded-md border border-border bg-popover/95 p-3 text-xs shadow-lg backdrop-blur">
      <div className="mb-1 font-semibold">{label}</div>
      <div className="mono text-neon-red">{formatPercent(dd)}</div>
    </div>
  );
}

type TooltipProps = {
  active?: boolean;
  payload?: { value: number | string; dataKey?: string | number }[];
  label?: string;
};
