import { Beaker, LineChart, Microscope, Radio } from "lucide-react";

const steps = [
  {
    icon: Beaker,
    title: "Hypothesise",
    body: "Strategies start as written specs — entry/exit rules, risk model, and the regime they should and shouldn't work in.",
    accent: "orange" as const,
  },
  {
    icon: Microscope,
    title: "Backtest",
    body: "Walk-forward backtests on 5–10 years of clean tick data with realistic slippage, spreads, and commissions.",
    accent: "blue" as const,
  },
  {
    icon: Radio,
    title: "Shadow & forward-test",
    body: "Promising strategies run on a paper account for at least 60 days before any real capital is risked.",
    accent: "orange" as const,
  },
  {
    icon: LineChart,
    title: "Live & published",
    body: "Live strategies stream PnL to /performance. Underperformers are retired publicly — no quiet deletes.",
    accent: "blue" as const,
  },
];

export function HowItWorks() {
  return (
    <section className="container-wide py-20 md:py-24">
      <div className="mb-12 max-w-2xl">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
          How the desk works
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          From hypothesis to live capital, in the open.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Every strategy goes through the same four stages. The process is the
          edge — the chart is just the receipt.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, idx) => (
          <div
            key={s.title}
            className="surface surface-hover relative overflow-hidden p-6"
          >
            <div className="mono absolute right-5 top-5 text-xs text-muted-foreground">
              0{idx + 1}
            </div>
            <div
              className={
                s.accent === "orange"
                  ? "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neon-orange/30 bg-neon-orange/10 text-neon-orange"
                  : "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neon-blue/30 bg-neon-blue/10 text-neon-blue"
              }
            >
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
