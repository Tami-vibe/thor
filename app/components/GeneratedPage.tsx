import { Shield, Sparkles, Zap } from "lucide-react";

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

export function GeneratedPage({
  businessName,
  data,
  theme,
  onToggleTheme,
  onRegenerate,
  contact,
  copy,
}: {
  businessName: string;
  data: ClaudeGenerated;
  theme: Theme;
  onToggleTheme: () => void;
  onRegenerate: () => void;
  contact: { email?: string; phone?: string };
  copy: {
    navRegenerate: string;
    navCta: string;
    whyTitlePrefix: string;
    testimonialAria: string;
    builtWithThor: string;
  };
}) {
  const isLight = theme === "light";

  const ui = isLight
    ? {
        pageBg: "bg-white text-[#0A0F1E]",
        nav: "border-b border-[#F1F5F9] bg-white/95 backdrop-blur-md",
        headline: "text-[#0F172A]",
        secondary: "text-[#64748B]",
        card: "border border-[#E2E8F0] bg-[#F8FAFC]",
        cardTitle: "text-[#0A0F1E]",
      }
    : {
        pageBg: "bg-[#0A0F1E] text-[#F8FAFC]",
        nav: "bg-[#0A0F1E]/90 backdrop-blur-md",
        headline: "text-[#F8FAFC]",
        secondary: "text-[#64748B]",
        card: "border border-[#1E293B] bg-[#111827]",
        cardTitle: "text-[#F8FAFC]",
      };

  const blackBtn =
    "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0A0F1E] px-5 text-sm font-semibold text-white transition hover:bg-[#111827] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40";

  return (
    <div className={`min-h-[100dvh] transition-colors duration-300 ease-in-out ${ui.pageBg}`}>
      <header className={`fixed inset-x-0 top-0 z-40 flex h-16 items-center ${ui.nav}`}>
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6">
          <div className="min-w-0 text-[15px] font-semibold tracking-tight">{businessName}</div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onRegenerate}
              className={`text-sm font-semibold ${
                isLight ? "text-[#64748B] hover:text-[#0A0F1E]" : "text-[#64748B] hover:text-[#F8FAFC]"
              }`}
            >
              {copy.navRegenerate}
            </button>
            <button type="button" onClick={onToggleTheme} className={blackBtn}>
              {copy.navCta}
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 pt-24">
        <section className="mx-auto w-full max-w-4xl text-center">
          <h1
            className={`font-display mx-auto max-w-[720px] text-[40px] font-black leading-none tracking-[-0.02em] sm:text-[56px] lg:text-[72px] ${ui.headline}`}
          >
            {data.headline}
          </h1>
          <p className={`mx-auto mt-5 max-w-[560px] text-base leading-relaxed lg:text-lg ${ui.secondary}`}>
            {data.subheadline}
          </p>
          <p className={`mx-auto mt-4 max-w-[620px] text-sm leading-relaxed sm:text-base ${ui.secondary}`}>
            {data.heroDescription}
          </p>

          <div className="mt-8 flex flex-col items-center">
            <button type="button" className={`${blackBtn} px-8`}>
              {data.ctaText}
            </button>
            <div className={`mt-2 text-xs ${ui.secondary}`}>{data.ctaSubtext}</div>
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-4xl">
          <h2 className={`font-display text-2xl font-bold tracking-tight ${ui.headline}`}>
            {copy.whyTitlePrefix} {businessName}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[Sparkles, Shield, Zap].map((Icon, idx) => {
              const f = data.features[idx];
              return (
                <div key={f.title} className={`rounded-2xl p-5 transition-colors duration-300 ease-in-out ${ui.card}`}>
                  <Icon className="h-5 w-5 text-[#0EA5E9]" />
                  <div className={`mt-4 text-sm font-semibold ${ui.cardTitle}`}>{f.title}</div>
                  <div className={`mt-2 text-sm leading-relaxed ${ui.secondary}`}>{f.description}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-2xl text-center" aria-label={copy.testimonialAria}>
          <div className={`font-display text-4xl italic ${ui.headline}`}>&ldquo;</div>
          <p className={`mt-4 font-display text-xl italic leading-relaxed ${ui.headline}`}>{data.testimonial.quote}</p>
          <div className={`mt-6 text-sm font-semibold ${ui.headline}`}>{data.testimonial.author}</div>
          <div className={`mt-1 text-sm ${ui.secondary}`}>{data.testimonial.role}</div>
        </section>

        <section className="mt-16 bg-[#0EA5E9]">
          <div className="mx-auto w-full max-w-4xl px-6 py-14 text-center">
            <div className="font-display text-3xl font-black tracking-tight text-white">{data.ctaText}</div>
            <div className="mx-auto mt-3 max-w-[520px] text-sm text-white/90">{data.ctaSubtext}</div>
            <div className="mt-8 flex flex-col items-center">
              <button type="button" className={`${blackBtn} bg-[#0A0F1E] text-white hover:bg-[#111827]`}>
                {data.ctaText}
              </button>
              {contact.email || contact.phone ? (
                <div className="mt-4 text-xs text-white/90">
                  {contact.email ? <div>{contact.email}</div> : null}
                  {contact.phone ? <div>{contact.phone}</div> : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <footer className={`${isLight ? "bg-white" : "bg-[#0A0F1E]"} px-6 py-10`}>
          <div className="mx-auto w-full max-w-4xl text-center">
            <div className={`text-xs ${ui.secondary}`}>{copy.builtWithThor}</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

