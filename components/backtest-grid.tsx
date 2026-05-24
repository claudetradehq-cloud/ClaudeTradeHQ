"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  assets,
  backtests,
  statuses,
  strategies,
  timeframes,
} from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BacktestCard } from "@/components/backtest-card";

type Sort = "sharpe" | "return" | "drawdown" | "recent";
const ALL = "all";

export function BacktestGrid() {
  const [query, setQuery] = useState("");
  const [strategy, setStrategy] = useState<string>(ALL);
  const [asset, setAsset] = useState<string>(ALL);
  const [timeframe, setTimeframe] = useState<string>(ALL);
  const [status, setStatus] = useState<string>(ALL);
  const [sort, setSort] = useState<Sort>("sharpe");

  const filtered = useMemo(() => {
    return backtests
      .filter((b) => {
        if (strategy !== ALL && b.strategy !== strategy) return false;
        if (asset !== ALL && b.asset !== asset) return false;
        if (timeframe !== ALL && b.timeframe !== timeframe) return false;
        if (status !== ALL && b.status !== status) return false;
        if (query.trim()) {
          const q = query.toLowerCase();
          return (
            b.name.toLowerCase().includes(q) ||
            b.description.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        switch (sort) {
          case "return":
            return b.returnPct - a.returnPct;
          case "drawdown":
            return a.maxDrawdownPct - b.maxDrawdownPct;
          case "recent":
            return (b.endDate ?? "").localeCompare(a.endDate ?? "");
          case "sharpe":
          default:
            return b.sharpe - a.sharpe;
        }
      });
  }, [query, strategy, asset, timeframe, status, sort]);

  const activeFilters = [
    strategy !== ALL && { key: "strategy", label: strategy, clear: () => setStrategy(ALL) },
    asset !== ALL && { key: "asset", label: asset, clear: () => setAsset(ALL) },
    timeframe !== ALL && { key: "timeframe", label: timeframe, clear: () => setTimeframe(ALL) },
    status !== ALL && { key: "status", label: status, clear: () => setStatus(ALL) },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  const clearAll = () => {
    setQuery("");
    setStrategy(ALL);
    setAsset(ALL);
    setTimeframe(ALL);
    setStatus(ALL);
  };

  return (
    <div className="space-y-6">
      <div className="surface p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search strategy or description..."
              className="pl-9"
            />
          </div>

          <FilterSelect
            label="Strategy"
            value={strategy}
            onChange={setStrategy}
            options={strategies as unknown as string[]}
          />
          <FilterSelect
            label="Asset"
            value={asset}
            onChange={setAsset}
            options={assets as unknown as string[]}
          />
          <FilterSelect
            label="Timeframe"
            value={timeframe}
            onChange={setTimeframe}
            options={timeframes as unknown as string[]}
          />
          <FilterSelect
            label="Status"
            value={status}
            onChange={setStatus}
            options={statuses as unknown as string[]}
          />

          <div className="ml-auto flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sharpe">Sort: Sharpe</SelectItem>
                <SelectItem value="return">Sort: Return</SelectItem>
                <SelectItem value="drawdown">Sort: Lowest DD</SelectItem>
                <SelectItem value="recent">Sort: Most recent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {(activeFilters.length > 0 || query) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Active:
            </span>
            {query && (
              <Badge variant="outline" className="gap-1.5">
                “{query}”
                <button onClick={() => setQuery("")} aria-label="Clear search">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {activeFilters.map((f) => (
              <Badge key={f.key} variant="outline" className="gap-1.5">
                {f.label}
                <button onClick={f.clear} aria-label={`Clear ${f.key}`}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="ml-1 h-7 px-2 text-xs"
            >
              Reset all
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing <span className="text-foreground">{filtered.length}</span>{" "}
          of {backtests.length} backtests
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="surface p-16 text-center">
          <p className="text-sm text-muted-foreground">
            No backtests match those filters.
          </p>
          <Button onClick={clearAll} variant="outline" className="mt-4">
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((bt) => (
            <BacktestCard key={bt.id} bt={bt} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>All {label.toLowerCase()}</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
