"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, Table2 } from "lucide-react";
import type { FxBlueCapitalPoint } from "@/lib/fxblue";
import { cn } from "@/lib/utils";

/**
 * Two categorical slots, validated against this site's dark card surface
 * (#0b1120) for the OKLCH lightness band, chroma floor, CVD separation and
 * contrast. They are deliberately a step deeper than the --neon brand hexes,
 * which sit above the band as large fills. Balance keeps the first slot for
 * good, so a new account never repaints the series.
 */
const BALANCE = "#DC5200";
const EQUITY = "#00A3C7";

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const compactUsd = (n: number) =>
  n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${Math.round(n)}`;

/**
 * On a phone there isn't room for a 150px axis gutter plus a bar-end label, so
 * the chart drops both and leans on the tooltip and the table view instead.
 */
function useCompact(maxWidth = 720) {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [maxWidth]);
  return compact;
}

export function FxBlueCapitalChart({ data }: { data: FxBlueCapitalPoint[] }) {
  const [view, setView] = useState<"chart" | "table">("chart");
  const compact = useCompact();

  if (data.length === 0) {
    return (
      <div className="surface p-6 text-sm text-muted-foreground">
        No account balances are available to chart right now.
      </div>
    );
  }

  const totals = data.reduce(
    (acc, d) => ({
      balance: acc.balance + d.balance,
      equity: acc.equity + d.equity,
      floating: acc.floating + (d.floatingPl ?? d.equity - d.balance),
    }),
    { balance: 0, equity: 0, floating: 0 },
  );

  const max = Math.max(...data.flatMap((d) => [d.balance, d.equity]));
  // Room at the right for the bar-end labels, and enough vertical space per
  // account that the chart keeps working as accounts are added.
  const height = data.length * (compact ? 88 : 76) + 64;

  return (
    <div className="surface p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            Balance vs equity, every tracked account
          </h3>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            The same figures as the panels above, side by side. Balance is
            closed money; equity includes open trades, so the gap between the
            two bars is floating P/L.
          </p>
        </div>
        <div
          role="group"
          aria-label="Chart or table view"
          className="flex shrink-0 rounded-md border border-border/60 bg-background/40 p-0.5"
        >
          <ViewToggle
            active={view === "chart"}
            onClick={() => setView("chart")}
            icon={BarChart3}
            label="Chart"
          />
          <ViewToggle
            active={view === "table"}
            onClick={() => setView("table")}
            icon={Table2}
            label="Table"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Total label="Combined balance" value={usd(totals.balance)} />
        <Total label="Combined equity" value={usd(totals.equity)} />
        <Total
          label="Open floating P/L"
          value={`${totals.floating > 0 ? "+" : ""}${usd(totals.floating)}`}
          tone={totals.floating > 0 ? "up" : totals.floating < 0 ? "down" : "flat"}
        />
      </div>

      {view === "chart" ? (
        <div className="mt-6 w-full" style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              barGap={2}
              barCategoryGap="30%"
              margin={{ top: 8, right: compact ? 8 : 96, left: 0, bottom: 4 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis
                type="number"
                domain={[0, Math.ceil((max * 1.08) / 1000) * 1000]}
                tickFormatter={compactUsd}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval="preserveStartEnd"
              />
              <YAxis
                type="category"
                dataKey="shortLabel"
                tickLine={false}
                axisLine={false}
                width={150}
                tickMargin={8}
                interval={0}
                // Narrow screens can't spare a 150px gutter without clipping
                // the longer account names, so the name moves above each pair.
                hide={compact}
              />
              <Tooltip
                cursor={{ fill: "rgba(148, 163, 184, 0.06)" }}
                content={<CapitalTooltip data={data} />}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={9}
                wrapperStyle={{ fontSize: 12, paddingBottom: 12 }}
                formatter={(value: string) => (
                  <span className="text-muted-foreground">{value}</span>
                )}
              />
              <Bar
                dataKey="balance"
                name="Balance"
                fill={BALANCE}
                barSize={16}
                radius={[0, 4, 4, 0]}
                isAnimationActive={false}
              >
                {compact ? (
                  <LabelList dataKey="shortLabel" content={CompactNameLabel} />
                ) : (
                  <LabelList
                    dataKey="balance"
                    position="right"
                    offset={8}
                    formatter={(v: number) => usd(v)}
                    style={{
                      fill: "rgba(226, 232, 240, 0.95)",
                      fontSize: 11,
                      fontFamily: "ui-monospace, monospace",
                    }}
                  />
                )}
              </Bar>
              <Bar
                dataKey="equity"
                name="Equity"
                fill={EQUITY}
                barSize={16}
                radius={[0, 4, 4, 0]}
                isAnimationActive={false}
              >
                {!compact && (
                  <LabelList
                    dataKey="equity"
                    position="right"
                    offset={8}
                    formatter={(v: number) => usd(v)}
                    style={{
                      fill: "rgba(148, 163, 184, 0.9)",
                      fontSize: 11,
                      fontFamily: "ui-monospace, monospace",
                    }}
                  />
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <CapitalTable data={data} />
      )}

      <p className="mt-5 text-xs text-muted-foreground">
        {data.some((d) => d.stale)
          ? "One or more accounts are charted from the cached snapshot because FX Blue was unreachable — see the panel above for which."
          : "Both views read the same FX Blue fetch as the panels above, so they refresh together."}
        {view === "chart" && compact && (
          <> Tap a bar for exact figures, or switch to Table.</>
        )}
      </p>
    </div>
  );
}

/** Compact-mode account name, left-aligned just above its pair of bars. */
function CompactNameLabel(props: unknown) {
  const { x, y, value } = props as { x: number; y: number; value: string };
  return (
    <text
      x={x}
      y={y - 8}
      fill="rgba(148, 163, 184, 0.9)"
      fontSize={10}
      fontFamily="ui-monospace, monospace"
    >
      {value}
    </text>
  );
}

function ViewToggle({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
        active
          ? "bg-muted/60 text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function Total({
  label,
  value,
  tone = "flat",
}: {
  label: string;
  value: string;
  tone?: "up" | "down" | "flat";
}) {
  return (
    <div className="rounded-md border border-border/60 bg-background/40 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          "mono mt-1 text-lg",
          tone === "up"
            ? "text-neon-green"
            : tone === "down"
              ? "text-neon-red"
              : "text-foreground",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function CapitalTooltip({
  active,
  label,
  data,
}: {
  active?: boolean;
  label?: string;
  data: FxBlueCapitalPoint[];
}) {
  const point = data.find((d) => d.shortLabel === label);
  if (!active || !point) return null;

  const floating = point.floatingPl ?? point.equity - point.balance;

  return (
    <div className="min-w-[220px] rounded-md border border-border bg-popover/95 p-3 text-xs shadow-lg backdrop-blur">
      <div className="font-semibold">{point.label}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {point.live ? "Live account" : "Demo account"}
        {point.stale && " · cached"}
      </div>
      <dl className="mt-2 space-y-1">
        <TooltipRow color={BALANCE} term="Balance" value={usd(point.balance)} />
        <TooltipRow color={EQUITY} term="Equity" value={usd(point.equity)} />
        <TooltipRow
          term="Floating P/L"
          value={`${floating > 0 ? "+" : ""}${usd(floating)}`}
        />
      </dl>
    </div>
  );
}

function TooltipRow({
  color,
  term,
  value,
}: {
  color?: string;
  term: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      <dt className="flex items-center gap-2 text-muted-foreground">
        <span
          className="h-2 w-2 shrink-0 rounded-sm"
          style={{ backgroundColor: color ?? "transparent" }}
        />
        {term}
      </dt>
      <dd className="mono text-foreground">{value}</dd>
    </div>
  );
}

function CapitalTable({ data }: { data: FxBlueCapitalPoint[] }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[560px] text-sm">
        <caption className="sr-only">
          Latest balance, equity and floating P/L for every tracked FX Blue
          account
        </caption>
        <thead>
          <tr className="border-b border-border/60 text-left text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <th scope="col" className="py-2 pr-4 font-semibold">
              Account
            </th>
            <th scope="col" className="py-2 pr-4 font-semibold">
              Type
            </th>
            <th scope="col" className="py-2 pr-4 text-right font-semibold">
              Balance
            </th>
            <th scope="col" className="py-2 pr-4 text-right font-semibold">
              Equity
            </th>
            <th scope="col" className="py-2 text-right font-semibold">
              Floating P/L
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => {
            const floating = d.floatingPl ?? d.equity - d.balance;
            return (
              <tr key={d.id} className="border-b border-border/40">
                <th
                  scope="row"
                  className="mono py-3 pr-4 text-left font-normal text-foreground"
                >
                  {d.label}
                  {d.stale && (
                    <span className="ml-2 text-xs text-neon-orange">
                      cached
                    </span>
                  )}
                </th>
                <td className="py-3 pr-4 text-muted-foreground">
                  {d.live ? "Live" : "Demo"}
                </td>
                <td className="mono py-3 pr-4 text-right">{usd(d.balance)}</td>
                <td className="mono py-3 pr-4 text-right">{usd(d.equity)}</td>
                <td
                  className={cn(
                    "mono py-3 text-right",
                    floating > 0
                      ? "text-neon-green"
                      : floating < 0
                        ? "text-neon-red"
                        : "text-muted-foreground",
                  )}
                >
                  {floating > 0 ? "+" : ""}
                  {usd(floating)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
