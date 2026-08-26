"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The address is never written out as a literal anywhere in this file, and the
 * server-rendered HTML only ever contains the "[at] / [dot]" placeholder — the
 * real string is assembled in the browser after mount. Harvesters that regex
 * the page source (or the RSC payload) for `\S+@\S+` come away with nothing.
 */
const USER_PARTS = ["claude", "trade", "hq"];
const DOMAIN_PARTS = ["gmail", "com"];
const AT = String.fromCharCode(64);

function buildAddress() {
  return `${USER_PARTS.join("")}${AT}${DOMAIN_PARTS.join(".")}`;
}

const PLACEHOLDER = `${USER_PARTS.join("")} [at] ${DOMAIN_PARTS.join(" [dot] ")}`;

export function ContactEmailBanner({
  eyebrow = "Talk to Dan directly",
  note,
  className,
}: {
  eyebrow?: string;
  note?: string;
  className?: string;
}) {
  const [address, setAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Assemble after mount so the address exists only in the live DOM.
  useEffect(() => setAddress(buildAddress()), []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(buildAddress());
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={cn(
        "surface relative overflow-hidden p-6 md:p-8",
        className,
      )}
    >
      <div
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-neon-orange/20 blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
            <Mail className="h-3.5 w-3.5" />
            {eyebrow}
          </div>
          <div
            className="mono mt-3 select-all break-all text-xl font-semibold tracking-tight text-foreground md:text-3xl"
            aria-label="ClaudeTradeHQ contact email address"
          >
            {address ?? PLACEHOLDER}
          </div>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            {note ??
              "Every build is quoted individually. Send your account details and what you want the EA to do — you get a straight answer on whether it can be built, and what it will take."}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Button onClick={copy} variant="default" size="sm">
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy address"}
          </Button>
          {address && (
            <Button asChild variant="outline" size="sm">
              <a href={`mailto:${address}`}>
                <Mail className="h-3.5 w-3.5" />
                Open in mail app
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
