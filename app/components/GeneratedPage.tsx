"use client";

import { Shield, Sparkles, Zap } from "lucide-react";
import type { DesignFamily, VariationPersonality } from "@/lib/designSystem";
import { useEffect, useMemo } from "react";

type ClaudeGenerated = {
  headline: string;
  subheadline: string;
  heroDescription: string;
  features: Array<{ title: string; description: string }>;
  testimonial: { quote: string; author: string; role: string };
  ctaText: string;
  ctaSubtext: string;
};

type Theme = "dark" | "light";

type Variation = {
  name: VariationPersonality;
  personality: string;
  angle: string;
};

export function GeneratedPage({
  businessName,
  data,
  designFamily,
  variation,
  theme,
  onToggleTheme,
  onRegenerate,
  contact,
  copy,
  topInset = false,
}: {
  businessName: string;
  data: ClaudeGenerated;
  designFamily: DesignFamily;
  variation: Variation;
  theme: Theme;
  onToggleTheme: () => void;
  onRegenerate: () => void;
  contact: { email?: string; phone?: string };
  topInset?: boolean;
  copy: {
    navRegenerate: string;
    navCta: string;
    whyTitlePrefix: string;
    testimonialAria: string;
    builtWithThor: string;
  };
}) {
  console.log("[GeneratedPage] designFamily", designFamily);
  console.log("[GeneratedPage] variation", variation);

  const isLight = theme === "light";

  const palette = isLight ? designFamily.palettes.light : designFamily.palettes.dark;
  const headlineFontFamily = designFamily.fonts.display.family;
  const headlineFontCss = useMemo(() => {
    // This project currently ships Thor fonts (Fraunces/Inter). Keep this deterministic and safe.
    const family = headlineFontFamily === "Fraunces" ? "Fraunces" : "Fraunces";
    return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family,
    )}:wght@300;400;700;900&display=swap`;
  }, [headlineFontFamily]);

  useEffect(() => {
    const id = "thor-headline-font";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = headlineFontCss;
  }, [headlineFontCss]);

  const headlineFontStyle: React.CSSProperties = {
    fontFamily: `"${headlineFontFamily}", Georgia, serif`,
  };

  const rootStyle: React.CSSProperties = {
    ["--color-bg" as never]: palette.background,
    ["--color-surface" as never]: palette.surface,
    ["--color-primary" as never]: palette.accent,
    ["--color-accent" as never]: palette.accentGold,
    ["--color-text" as never]: palette.textPrimary,
    ["--color-text-secondary" as never]: palette.textSecondary,
    ["--color-border" as never]: palette.border,
    ["--color-nav-backdrop" as never]: palette.navBackdrop,
    ["--color-nav-border" as never]: palette.navBorderLight,
    ["--color-on-primary" as never]: palette.onPrimary,
    ["--color-on-primary-muted" as never]: palette.onPrimaryMuted,
    ["--color-cta-button-overlay" as never]: palette.ctaButtonOverlay,
    ["--color-button-bg" as never]: palette.buttonPrimaryBg,
    ["--color-button-hover" as never]: palette.buttonPrimaryHoverBg,
    ["--color-button-text" as never]: palette.buttonPrimaryText,
  };

  const primaryBtn =
    "inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition focus:outline-none focus:ring-0";

  return (
    <div
      className="min-h-[100dvh] transition-colors duration-300 ease-in-out"
      style={{ ...rootStyle, backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
      data-variation={variation.name}
    >
      <div className={`fixed right-6 z-40 ${topInset ? "top-[7.75rem]" : "top-[76px]"}`}>
        <span
          className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 font-medium"
          style={{
            fontSize: 10,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            color: "var(--color-text-secondary)",
            letterSpacing: "0.02em",
          }}
        >
          {variation.name}
        </span>
      </div>
      <header
        className={`fixed inset-x-0 z-40 flex h-16 items-center backdrop-blur-md ${topInset ? "top-11" : "top-0"}`}
        style={{
          backgroundColor: "var(--color-nav-backdrop)",
          borderBottom: isLight ? "1px solid var(--color-nav-border)" : undefined,
        }}
      >
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6">
          <div className="min-w-0 text-[15px] font-semibold tracking-tight">{businessName}</div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onRegenerate}
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {copy.navRegenerate}
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              className={primaryBtn}
              style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
            >
              {copy.navCta}
            </button>
          </div>
        </div>
      </header>

      <main className={`px-6 ${topInset ? "pt-[7.75rem]" : "pt-24"}`}>
        <section className="mx-auto w-full max-w-4xl text-center">
          <h1
            className="mx-auto max-w-[720px] text-[40px] font-black leading-none tracking-[-0.02em] sm:text-[56px] lg:text-[72px]"
            style={headlineFontStyle}
          >
            {data.headline}
          </h1>
          <p
            className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed lg:text-lg"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {data.subheadline}
          </p>
          <p
            className="mx-auto mt-4 max-w-[620px] text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {data.heroDescription}
          </p>

          <div className="mt-8 flex flex-col items-center">
            <button
              type="button"
              className={`${primaryBtn} px-8`}
              style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
            >
              {data.ctaText}
            </button>
            <div className="mt-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
              {data.ctaSubtext}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight" style={headlineFontStyle}>
            {copy.whyTitlePrefix} {businessName}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[Sparkles, Shield, Zap].map((Icon, idx) => {
              const f = data.features[idx];
              return (
                <div
                  key={f.title}
                  className="rounded-2xl p-5 transition-colors duration-300 ease-in-out"
                  style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
                  <div className="mt-4 text-sm font-semibold">{f.title}</div>
                  <div className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {f.description}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-2xl text-center" aria-label={copy.testimonialAria}>
          <div className="text-4xl italic" style={headlineFontStyle}>
            &ldquo;
          </div>
          <p className="mt-4 text-xl italic leading-relaxed" style={headlineFontStyle}>
            {data.testimonial.quote}
          </p>
          <div className="mt-6 text-sm font-semibold">{data.testimonial.author}</div>
          <div className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            {data.testimonial.role}
          </div>
        </section>

        <section className="mt-16" style={{ backgroundColor: "var(--color-primary)" }}>
          <div className="mx-auto w-full max-w-4xl px-6 py-14 text-center">
            <div
              className="text-3xl font-black tracking-tight"
              style={{ ...headlineFontStyle, color: "var(--color-on-primary)" }}
            >
              {data.ctaText}
            </div>
            <div
              className="mx-auto mt-3 max-w-[520px] text-sm"
              style={{ color: "var(--color-on-primary-muted)" }}
            >
              {data.ctaSubtext}
            </div>
            <div className="mt-8 flex flex-col items-center">
              <button
                type="button"
                className={`${primaryBtn} px-8`}
                style={{
                  backgroundColor: "var(--color-cta-button-overlay)",
                  color: "var(--color-on-primary)",
                }}
              >
                {data.ctaText}
              </button>
              {contact.email || contact.phone ? (
                <div className="mt-4 text-xs" style={{ color: "var(--color-on-primary-muted)" }}>
                  {contact.email ? <div>{contact.email}</div> : null}
                  {contact.phone ? <div>{contact.phone}</div> : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <footer className="px-6 py-10" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="mx-auto w-full max-w-4xl text-center">
            <div className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
              {copy.builtWithThor}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

