"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/backtests", label: "Backtests" },
  { href: "/performance", label: "Performance" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative inline-flex h-9 w-9 overflow-hidden rounded-md ring-1 ring-neon-orange/40 shadow-glow-orange transition-transform group-hover:scale-105">
            <Image
              src="/brand/logo.jpg"
              alt="ClaudeTradeHQ logo"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </span>
          <span className="text-glow-orange text-sm font-semibold tracking-wide text-neon-orange">
            ClaudeTradeHQ
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-neon-orange to-neon-blue" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="hidden sm:flex">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="sm" variant="accent" className="hidden sm:inline-flex">
            <Link href="/performance">Live PnL</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
