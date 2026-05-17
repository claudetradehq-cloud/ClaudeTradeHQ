import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/50">
      <div className="container-wide grid gap-12 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative inline-flex h-9 w-9 overflow-hidden rounded-md ring-1 ring-neon-orange/30">
              <Image
                src="/brand/logo.jpg"
                alt="ClaudeTradeHQ logo"
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="text-glow-orange text-sm font-semibold tracking-wide text-neon-orange">
              ClaudeTradeHQ
            </span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            Systematic trading research & education. Audited backtests, live
            performance, and zero hype.
          </p>
        </div>

        <FooterColumn
          title="Product"
          links={[
            { href: "/backtests", label: "Backtests" },
            { href: "/performance", label: "Performance" },
            { href: "/about", label: "About" },
          ]}
        />
        <FooterColumn
          title="Research"
          links={[
            { href: "#", label: "Methodology" },
            { href: "#", label: "Risk model" },
            { href: "#", label: "Changelog" },
          ]}
        />
        <FooterColumn
          title="Legal"
          links={[
            { href: "#", label: "Risk disclosure" },
            { href: "#", label: "Terms" },
            { href: "#", label: "Privacy" },
          ]}
        />
      </div>

      <div className="border-t border-border/60">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} ClaudeTradeHQ. For research and
            educational purposes only. Past performance does not guarantee
            future results.
          </p>
          <p className="mono">build · v0.1.0</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">
        {title}
      </h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hover:text-neon-orange transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
