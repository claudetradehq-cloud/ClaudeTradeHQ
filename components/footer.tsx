import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import { XIcon } from "@/components/icons/x-icon";

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
          <div className="flex items-center gap-2 pt-1">
            <SocialLink
              href="https://x.com/ClaudeTradeHQ"
              label="Follow @ClaudeTradeHQ on X"
            >
              <XIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="https://github.com" label="GitHub">
              <Github className="h-4 w-4" />
            </SocialLink>
          </div>
        </div>

        <FooterColumn
          title="Product"
          links={[
            { href: "/backtests", label: "Backtests" },
            { href: "/downloads", label: "Downloads" },
            { href: "/funded-accounts", label: "Funded Accounts" },
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

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/70 bg-card/40 text-muted-foreground transition-colors hover:border-neon-orange/50 hover:bg-card/80 hover:text-neon-orange"
    >
      {children}
    </a>
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
