import { Download, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ExpertAdvisor } from "@/lib/data";

export function EADownloadCard({ ea }: { ea: ExpertAdvisor }) {
  return (
    <article className="surface surface-hover group relative flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {ea.strategy} · {ea.asset} · {ea.timeframe}
          </div>
          <h3 className="mt-1.5 text-lg font-semibold leading-snug">
            {ea.name}
          </h3>
          <p className="mt-1 text-sm text-neon-orange/90">{ea.tagline}</p>
        </div>
        <Badge variant={ea.available ? "success" : "muted"}>
          {ea.available ? `v${ea.version}` : "Coming soon"}
        </Badge>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{ea.description}</p>

      <div
        className={`mt-6 grid gap-2 border-t border-border/60 pt-5 ${
          ea.mt4File && ea.mt5File ? "sm:grid-cols-2" : ""
        }`}
      >
        {ea.mt4File && (
          <DownloadButton
            label="MT4 (.ex4)"
            file={ea.mt4File}
            available={ea.available}
          />
        )}
        {ea.mt5File && (
          <DownloadButton
            label="MT5 (.ex5)"
            file={ea.mt5File}
            available={ea.available}
          />
        )}
      </div>
    </article>
  );
}

function DownloadButton({
  label,
  file,
  available,
}: {
  label: string;
  file: string | null;
  available: boolean;
}) {
  if (!available || !file) {
    return (
      <Button variant="outline" size="sm" disabled className="w-full">
        <Lock className="h-3.5 w-3.5" />
        {label}
      </Button>
    );
  }
  return (
    <Button asChild variant="outline" size="sm" className="w-full">
      <a href={`/expert-advisors/${file}`} download>
        <Download className="h-3.5 w-3.5" />
        {label}
      </a>
    </Button>
  );
}
