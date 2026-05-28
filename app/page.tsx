"use client";

import {
  ArrowLeft,
  BookOpen,
  Cpu,
  Dumbbell,
  Heart,
  Mail,
  Moon,
  Scale,
  Sparkles,
  Stethoscope,
  Sun,
  TrendingUp,
  Upload,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { GeneratedPage } from "./components/GeneratedPage";

type Theme = "dark" | "light";
const THEME_STORAGE_KEY = "thor-theme";
const MODAL_STEPS = 6;
type BillingPeriod = "monthly" | "yearly";

type SectorId =
  | "fitness-and-movement"
  | "language-schools"
  | "legal"
  | "medical"
  | "finance"
  | "saas"
  | "hospitality"
  | "beauty-and-wellness"
  | "church-and-community";

type ClaudeGenerated = {
  headline: string;
  subheadline: string;
  heroDescription: string;
  features: Array<{ title: string; description: string }>;
  testimonial: { quote: string; author: string; role: string };
  ctaText: string;
  ctaSubtext: string;
};

type DesignFamily = import("@/lib/designSystem").DesignFamily;
type VariationPersonality = import("@/lib/designSystem").VariationPersonality;
type Variation = { name: VariationPersonality; personality: string; angle: string };
type ClaudeGeneratedWithDesign = ClaudeGenerated & { designFamily: DesignFamily; variation: Variation };

export default function Home() {
  const [selectedSectorId, setSelectedSectorId] = useState<SectorId | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedVisitorAction, setSelectedVisitorAction] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [theme, setTheme] = useState<Theme>("dark");
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [generated, setGenerated] = useState<ClaudeGeneratedWithDesign | null>(null);

  const [businessName, setBusinessName] = useState("");
  const [selling, setSelling] = useState("");
  const [idealClient, setIdealClient] = useState("");
  const [result, setResult] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [valueProposition, setValueProposition] = useState("");
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [brandAssetsFileName, setBrandAssetsFileName] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const brandAssetsInputRef = useRef<HTMLInputElement>(null);

  const copy = {
    headlineLine1: "For the ones who",
    headlineLine2Prefix: "mean ",
    headlineAccent: "business.",
    subheadline: "Because generic was never an option.",
    brandName: "Thor",
    getStarted: "Get Started",
    signIn: "Sign in",
    next: "Next",
    businessNameLabel: "What’s your business name?",
    businessNamePlaceholder: "e.g. Oak Street Pilates",
    sellingLabel: "What are you selling?",
    sellingPlaceholder: "e.g. Premium membership packages for our yoga studio",
    idealClientLabel: "Who is your ideal client?",
    idealClientPlaceholder: "e.g. Health-conscious professionals aged 30–50",
    resultLabel: "What result do you deliver?",
    resultPlaceholder: "e.g. Clients leave pain-free and energized within 4 weeks",
    visitorActionLabel: "What do you want visitors to do?",
    modalStep1Title: "What type of business are you?",
    modalStep2Title: "What best describes you?",
    modalStep3Title: "About your business",
    modalStep4Title: "Your clients & results",
    modalStep5Title: "Call to action",
    modalStep6Title: "Make it yours",
    modalStep6Subtitle: "Optional but powerful",
    uploadLogo: "Upload your logo",
    uploadBrandAssets: "Any images or visuals",
    contactEmailLabel: "Your contact email",
    contactEmailPlaceholder: "Displayed on your landing page",
    phoneLabel: "Your phone number",
    phonePlaceholder: "Optional — for contact section",
    websiteLabel: "Your website URL (if you have one)",
    websitePlaceholder: "We'll match your existing style",
    valuePropLabel: "Paste your value proposition or about us text",
    valuePropPlaceholder: "Any copy you already love — we'll weave it in",
    skipForNow: "Skip for now →",
    generatePage: "Generate My Page →",
    generating: "Generating...",
    forging: "Thor is forging your page...",
    generateErrorTitle: "Couldn’t generate. Try again.",
    close: "Close",
    back: "Back",
    resetSelectionAria: "Reset selection",
    selectionLabel: "Selected",
    sectorLabel: "Business sector",
    cta: "Generate My Landing Page",
    pricingTitle: "Explore plans",
    pricingSubtitle: "Start free. Upgrade when you’re ready to ship.",
    pricingDisclaimer: "Prices shown are examples — customize before publishing.",
    pricingCta: "Try Thor",
    pricingMonthly: "Monthly",
    pricingYearly: "Yearly",
    pricingPerMonth: "per month",
    pricingPerYear: "per year",
    pricingBilledYearly: "billed yearly",
    pricingFrom: "From",
    pricingIconAria: "Plan icon",
    pricingPlans: [
      {
        id: "free",
        name: "Free",
        subtext: "For trying Thor on a real offer",
        monthlyUsd: 0,
        yearlyDiscountPct: 0,
        features: ["Generate a landing page draft", "Edit sections and copy", "Basic preview"],
      },
      {
        id: "pro",
        name: "Pro",
        subtext: "For solo builders shipping weekly",
        monthlyUsd: 30,
        yearlyDiscountPct: 10,
        features: ["Everything in Free", "Remove branding", "Export + publish", "Priority generation"],
      },
      {
        id: "max",
        name: "Max",
        subtext: "For teams who need brand control",
        monthlyUsd: 100,
        yearlyDiscountPct: 20,
        isFrom: true,
        features: ["Everything in Pro", "Team workspaces", "Advanced brand controls", "Higher limits"],
      },
    ],
    faqTitle: "Frequently asked questions",
    faqOpenAria: "Open answer",
    faqCloseAria: "Close answer",
    faqs: [
      {
        q: "What is Thor?",
        a: "Thor is an AI landing page generator that turns your inputs into a conversion-ready page you can edit, preview, and publish.",
      },
      {
        q: "Can I edit everything after generating?",
        a: "Yes. Every section and every field is editable. Your edits always win.",
      },
      {
        q: "Do I need a website to use Thor?",
        a: "No. You can generate a full landing page from scratch and publish it when you’re ready.",
      },
      {
        q: "What do I upload?",
        a: "You can upload a logo and any images you want to use on the page. You can also paste your best copy and we’ll weave it in.",
      },
    ],
    footerProduct: "Product",
    footerCompany: "Company",
    footerLegal: "Legal",
    footerLinkPricing: "Pricing",
    footerLinkFaq: "FAQ",
    footerLinkContact: "Contact",
    footerLinkAbout: "About",
    footerLinkPrivacy: "Privacy",
    footerLinkTerms: "Terms",
    footerLinkSecurity: "Security",
    footerLinkStatus: "Status",
    footerCopyright: `© ${new Date().getFullYear()} Thor`,
    socialX: "X",
    socialInstagram: "Instagram",
    socialYoutube: "YouTube",
    socialLinkedIn: "LinkedIn",
    socialEmail: "Email",
    socialHrefX: "#",
    socialHrefInstagram: "#",
    socialHrefYoutube: "#",
    socialHrefLinkedIn: "#",
    socialHrefEmail: "#",
    generatedNavRegenerate: "Regenerate",
    generatedNavCta: "Toggle theme",
    generatedWhyPrefix: "Why",
    generatedTestimonialAria: "Testimonial",
    generatedBuiltWithThor: "Built with Thor",
    visitorActions: [
      { id: "book-consultation", label: "Book a Consultation" },
      { id: "start-free-trial", label: "Start Free Trial" },
      { id: "buy-now", label: "Buy Now" },
      { id: "book-a-class", label: "Book a Class" },
      { id: "get-a-quote", label: "Get a Quote" },
      { id: "contact-us", label: "Contact Us" },
      { id: "reserve-a-table", label: "Reserve a Table" },
      { id: "book-a-stay", label: "Book a Stay" },
    ],
    sectors: [
      { id: "fitness-and-movement", label: "Fitness & Movement" },
      { id: "language-schools", label: "Language Schools" },
      { id: "legal", label: "Legal" },
      { id: "medical", label: "Medical" },
      { id: "finance", label: "Finance" },
      { id: "saas", label: "SaaS" },
      { id: "hospitality", label: "Hospitality" },
      { id: "beauty-and-wellness", label: "Beauty & Wellness" },
      { id: "church-and-community", label: "Church & Community" },
    ],
  } as const;

  const sectorIconById: Record<SectorId, LucideIcon> = {
    "fitness-and-movement": Dumbbell,
    "language-schools": BookOpen,
    legal: Scale,
    medical: Stethoscope,
    finance: TrendingUp,
    saas: Cpu,
    hospitality: UtensilsCrossed,
    "beauty-and-wellness": Sparkles,
    "church-and-community": Heart,
  };

  const sectors = useMemo(
    () =>
      copy.sectors.map((sector) => ({
        ...sector,
        icon: sectorIconById[sector.id],
      })),
    [copy.sectors],
  );

  const subcategoriesBySectorId: Record<SectorId, readonly string[]> = {
    "fitness-and-movement": [
      "Yoga Studio",
      "Dance School",
      "Martial Arts",
      "Personal Trainer",
      "CrossFit Gym",
      "Pilates Studio",
    ],
    "language-schools": ["English", "Spanish", "French", "Mandarin", "Arabic", "Multi-language Center"],
    legal: [
      "Accident Attorney",
      "Family Law",
      "Criminal Defense",
      "Real Estate Law",
      "Corporate Law",
      "Immigration Law",
    ],
    medical: ["General Practice", "Dentist", "Physiotherapy", "Dermatology", "Pediatrics", "Mental Health"],
    finance: [
      "Accounting Firm",
      "Financial Advisor",
      "Tax Services",
      "Insurance Agency",
      "Mortgage Broker",
      "Wealth Management",
    ],
    saas: ["Education Tech", "Marketing Tech", "Automotive Tech", "HR Tech", "Fintech", "Healthcare Tech"],
    hospitality: ["Restaurant", "Hotel", "Bar & Nightclub", "Hostel", "Resort", "Café & Bakery"],
    "beauty-and-wellness": [
      "Hair Salon",
      "Spa & Massage",
      "Nail Studio",
      "Barbershop",
      "Tattoo Studio",
      "Aesthetics Clinic",
    ],
    "church-and-community": ["Church", "Mosque", "Synagogue", "Non-profit", "Community Center", "Charity"],
  } as const;

  const selectedSector = useMemo(
    () => sectors.find((s) => s.id === selectedSectorId) ?? null,
    [sectors, selectedSectorId],
  );
  const subcategoriesForSelectedSector = selectedSectorId ? subcategoriesBySectorId[selectedSectorId] : [];

  const [navScrolled, setNavScrolled] = useState(false);
  const isLight = theme === "light";

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        setModalStep(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [modalOpen]);

  function openModal() {
    setModalStep(1);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalStep(1);
  }

  function goToStep(step: 1 | 2 | 3 | 4 | 5 | 6) {
    setModalStep(step);
  }

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  async function handleGenerate() {
    setGenerateError(null);
    setIsGenerating(true);
    try {
      const payload = {
        businessName,
        sector: selectedSector?.label ?? "",
        subcategory: selectedSubcategory ?? "",
        offer: selling,
        idealClient,
        result,
        cta:
          copy.visitorActions.find((a) => a.id === selectedVisitorAction)?.label ??
          selectedVisitorAction ??
          "",
        email: contactEmail || undefined,
        phone: phone || undefined,
        website: websiteUrl || undefined,
        valueProp: valueProposition || undefined,
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = (await res.json().catch(() => null)) as { error?: string; details?: string } | null;
        throw new Error(err?.error ?? "Request failed");
      }

      const data = (await res.json()) as ClaudeGeneratedWithDesign;
      setGenerated(data);
      closeModal();
    } catch (e) {
      setGenerateError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleSkipEnhancements() {
    closeModal();
  }

  function handleFileSelect(
    file: File | undefined,
    setter: (name: string | null) => void,
  ) {
    if (file) setter(file.name);
  }

  function selectSector(sectorId: SectorId) {
    setSelectedSectorId(sectorId);
    setSelectedSubcategory(null);
    setModalStep(2);
  }

  function resetSelection() {
    setSelectedSectorId(null);
    setSelectedSubcategory(null);
    setModalStep(1);
    setModalOpen(false);
  }

  const ui = useMemo(
    () =>
      isLight
        ? {
            pageBg: "bg-white text-[#0A0F1E]",
            navScrolled: "border-b border-[#F1F5F9] bg-white/95 backdrop-blur-md",
            navTransparent: "border-b border-[#F1F5F9] bg-white",
            wordmark: "text-[#0A0F1E]",
            signIn: "text-[#64748B] hover:text-[#0A0F1E]",
            toggleHover: "hover:bg-[#F1F5F9]",
            toggleIcon: "text-[#0A0F1E]",
            headline: "text-[#0F172A]",
            subheadline: "text-[#94A3B8]",
            modal: "border-[#E2E8F0] bg-[#F8FAFC] text-[#0A0F1E]",
            modalHover: "hover:bg-[#F1F5F9]",
            textPrimary: "text-[#0A0F1E]",
            textSecondary: "text-[#64748B]",
            card: "border-[#E2E8F0] bg-[#F8FAFC]",
            cardDefaultBorder: "border-[#E2E8F0]",
            formField:
              "border-[#E2E8F0] bg-white text-[#0A0F1E] placeholder:text-[#64748B]",
            uploadZone:
              "border-dashed border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[rgba(14,165,233,0.05)]",
            dotInactive: "bg-[#E2E8F0]",
            pillDefault:
              "border border-[#E2E8F0] bg-[#F8FAFC] text-[#0A0F1E] hover:scale-[1.02] hover:border-[1.5px] hover:border-[#0EA5E9] hover:bg-[rgba(14,165,233,0.05)]",
            pillSelected:
              "border-[1.5px] border-[#EAB308] bg-[rgba(234,179,8,0.08)] text-[#0A0F1E]",
            iconBtn: "text-[#0A0F1E] hover:bg-[#F1F5F9]",
          }
        : {
            pageBg: "bg-[#0A0F1E] text-[#F8FAFC]",
            navScrolled: "bg-[#0A0F1E]/90 backdrop-blur-md",
            navTransparent: "bg-transparent",
            wordmark: "text-[#F8FAFC]",
            signIn: "text-[#64748B] hover:text-[#F8FAFC]",
            toggleHover: "hover:bg-[#111827]",
            toggleIcon: "text-[#F8FAFC]",
            headline: "text-[#F8FAFC]",
            subheadline: "text-[#64748B]",
            modal: "border-[#1E293B] bg-[#111827] text-[#F8FAFC]",
            modalHover: "hover:bg-[#1E293B]",
            textPrimary: "text-[#F8FAFC]",
            textSecondary: "text-[#64748B]",
            card: "border-[#334155] bg-[#111827]",
            cardDefaultBorder: "border-[#334155]",
            formField:
              "border-[#1E293B] bg-[#0A0F1E] text-[#F8FAFC] placeholder:text-[#64748B]",
            uploadZone:
              "border-dashed border-[#334155] bg-[#111827] hover:bg-[rgba(14,165,233,0.05)]",
            dotInactive: "bg-[#1E293B]",
            pillDefault:
              "border border-[#334155] bg-[#111827] text-[#F8FAFC] hover:scale-[1.02] hover:border-[1.5px] hover:border-[#0EA5E9] hover:bg-[rgba(14,165,233,0.05)]",
            pillSelected:
              "border-[1.5px] border-[#EAB308] bg-[rgba(234,179,8,0.08)] text-[#F8FAFC]",
            iconBtn: "text-[#F8FAFC] hover:bg-[#1E293B]",
          },
    [isLight],
  );

  const primaryBtn =
    "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0A0F1E] px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:bg-[#111827] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 disabled:cursor-not-allowed disabled:opacity-60";

  const selectorGrid = "grid grid-cols-2 gap-2 sm:grid-cols-3";

  const selectorCard = `relative flex h-20 flex-col justify-between rounded-xl border p-3 text-left outline-none ring-0 transition-all duration-150 ease-out hover:scale-[1.02] hover:border-[1.5px] hover:border-[#0EA5E9] hover:bg-[rgba(14,165,233,0.05)] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 sm:h-[90px] lg:h-[100px] ${ui.card}`;

  const selectorCardSelected =
    "border-[1.5px] border-[#EAB308] bg-[rgba(234,179,8,0.08)] hover:border-[#EAB308] hover:bg-[rgba(234,179,8,0.08)]";

  const formField = `w-full rounded-xl border shadow-sm outline-none ring-0 transition-all duration-200 focus:border-[#0EA5E9] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 ${ui.formField}`;

  const heroBtn =
    "inline-flex h-[52px] items-center justify-center rounded-full bg-[#0A0F1E] px-10 text-base font-semibold text-white transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-[#111827] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40";

  const uploadZone = `flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-4 text-center transition-all duration-150 hover:border-[#0EA5E9] ${ui.uploadZone}`;

  if (generated) {
    return (
      <GeneratedPage
        businessName={businessName || copy.brandName}
        data={generated}
        designFamily={generated.designFamily}
        variation={generated.variation}
        theme={theme}
        onToggleTheme={toggleTheme}
        onRegenerate={() => {
          setGenerated(null);
          setGenerateError(null);
          setModalStep(1);
          setModalOpen(true);
        }}
        contact={{ email: contactEmail || undefined, phone: phone || undefined }}
        copy={{
          navRegenerate: copy.generatedNavRegenerate,
          navCta: copy.generatedNavCta,
          whyTitlePrefix: copy.generatedWhyPrefix,
          testimonialAria: copy.generatedTestimonialAria,
          builtWithThor: copy.generatedBuiltWithThor,
        }}
      />
    );
  }

  function formatUsd(amount: number, opts?: { from?: boolean }) {
    const prefix = opts?.from ? `${copy.pricingFrom} ` : "";
    return `${prefix}$${amount}`;
  }

  function PlanIcon({ planId }: { planId: (typeof copy.pricingPlans)[number]["id"] }) {
    const common = "h-7 w-7";

    if (planId === "free") {
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true" focusable="false" role="img">
          <path
            d="M12 3.5c4.7 0 8.5 3.8 8.5 8.5S16.7 20.5 12 20.5 3.5 16.7 3.5 12 7.3 3.5 12 3.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8.2 9.3 12 7.4l3.8 1.9v5.4L12 16.6 8.2 14.7V9.3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    if (planId === "pro") {
      return (
        <svg
          viewBox="0 0 206.94 258.8"
          className={common}
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <path
            d="M206.94,127.28V28.88s-23.45-15.81-23.45-15.81l-44.16-.03-.11-7.42c-.03-2.3-7-3.93-11.33-4.38-16.2-1.67-32.22-1.65-48.41-.06-4.69.46-11.84,1.89-11.84,4.79v7.07s-44.21.02-44.21.02L0,28.93v98.38s23.51,15.91,23.51,15.91h61.14s0,108.91,0,108.91c.92,2.18,2.67,3.56,4.95,4.35,8.76,3.04,18.54,3.12,27.56.07,2.48-.84,4.22-2.25,5.13-4.42v-108.92s61.23,0,61.23,0l23.42-15.92Z"
            fill="currentColor"
          />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true" focusable="false" role="img">
        <path
          d="M12 3v18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 6c-2.6 0-4.6 1.2-6 3.2M12 6c2.6 0 4.6 1.2 6 3.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 10c-2.1 0-3.7.9-4.8 2.4M12 10c2.1 0 3.7.9 4.8 2.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M9.5 21h5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  function PlusMark({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" className={className ?? "h-4 w-4"} aria-hidden="true" focusable="false">
        <path
          d="M12 5v14M5 12h14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  function BrandIcon({
    name,
    className,
  }: {
    name: "x" | "instagram" | "youtube" | "linkedin";
    className?: string;
  }) {
    const cls = className ?? "h-4 w-4";

    if (name === "x") {
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true" focusable="false">
          <path
            d="M6 5h4.2l3.1 4.1L17.9 5H20l-5.7 6.6L20.6 19H16.4l-3.4-4.4L8.9 19H6.8l6.1-7L6 5Z"
            fill="currentColor"
          />
        </svg>
      );
    }

    if (name === "instagram") {
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true" focusable="false">
          <path
            d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M17.4 6.6h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }

    if (name === "youtube") {
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true" focusable="false">
          <path
            d="M21 8.2a3 3 0 0 0-2.1-2.1C17 5.6 12 5.6 12 5.6s-5 0-6.9.5A3 3 0 0 0 3 8.2 31 31 0 0 0 3 12a31 31 0 0 0 .1 3.8 3 3 0 0 0 2.1 2.1c1.9.5 6.9.5 6.9.5s5 0 6.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 21 12a31 31 0 0 0 0-3.8Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M10.4 9.7 15 12l-4.6 2.3V9.7Z" fill="currentColor" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden="true" focusable="false">
        <path
          d="M6.6 9.8V18.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6.6 6.6h.01"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M10.3 18.6v-4.7c0-1.8 1-3.1 2.7-3.1 1.6 0 2.4 1.1 2.4 3.1v4.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.3 9.8v8.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <div className={`min-h-[100dvh] font-sans transition-colors duration-300 ease-in-out ${ui.pageBg}`}>
      <header
        className={`fixed inset-x-0 top-0 z-40 flex h-16 items-center transition-all duration-300 ease-in-out ${
          navScrolled ? ui.navScrolled : ui.navTransparent
        }`}
      >
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <img
              src="/brand/hammer.svg"
              width={24}
              height={24}
              alt=""
              aria-hidden="true"
              className="mjolnir-mark block h-6 w-6 select-none"
              draggable={false}
            />
            <span
              className={`font-display text-[20px] font-bold leading-none transition-colors duration-300 ease-in-out ${ui.wordmark}`}
            >
              {copy.brandName}
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              className={`text-[15px] font-medium transition-colors duration-300 ease-in-out focus:outline-none ${ui.signIn}`}
            >
              {copy.signIn}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 ${ui.toggleIcon} ${ui.toggleHover}`}
              aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
            >
              {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <style jsx>{`
        @keyframes mjolnirMark {
          0% {
            opacity: 0.92;
            transform: translateY(0px) rotate(-3deg) scale(0.995);
          }
          40% {
            opacity: 1;
            transform: translateY(-0.5px) rotate(0deg) scale(1);
          }
          100% {
            opacity: 0.92;
            transform: translateY(0px) rotate(3deg) scale(0.995);
          }
        }
        .mjolnir-mark {
          animation: mjolnirMark 2.8s ease-in-out infinite;
          transform-origin: 50% 50%;
          will-change: transform, opacity;
        }
      `}</style>

      <main className="flex min-h-[100dvh] items-center justify-center px-6 pt-16">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1
            className={`font-display mx-auto max-w-[720px] text-[40px] font-black leading-none tracking-[-0.02em] transition-colors duration-300 ease-in-out sm:text-[56px] lg:text-[88px] ${ui.headline}`}
          >
            <span className="block">{copy.headlineLine1}</span>
            <span className="mt-1 block">
              {copy.headlineLine2Prefix}
              <span className="text-[#0EA5E9]">{copy.headlineAccent}</span>
            </span>
          </h1>
          <p
            className={`mx-auto mt-6 max-w-[440px] text-pretty text-base leading-relaxed transition-colors duration-300 ease-in-out lg:text-lg ${ui.subheadline}`}
          >
            {copy.subheadline}
          </p>
          <div
            className="mx-auto mt-6 h-px w-[120px] bg-[#0EA5E9] opacity-40"
            aria-hidden
          />
          <div className="mt-11 flex justify-center">
            <button type="button" onClick={openModal} className={heroBtn}>
              {copy.getStarted}
            </button>
          </div>
        </div>
      </main>

      {/* Pricing + FAQ + Footer */}
      <section className="px-6 pb-24 pt-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="text-center">
            <h2 className={`font-display text-2xl font-bold tracking-tight sm:text-3xl ${ui.textPrimary}`}>
              {copy.pricingTitle}
            </h2>
            <p className={`mx-auto mt-3 max-w-[520px] text-sm sm:text-base ${ui.textSecondary}`}>
              {copy.pricingSubtitle}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <div
              className={`inline-flex items-center rounded-full border p-1 transition-colors duration-300 ease-in-out ${
                isLight ? "border-[#E2E8F0] bg-white" : "border-[#1E293B] bg-[#111827]"
              }`}
              role="tablist"
              aria-label={copy.pricingTitle}
            >
              <button
                type="button"
                onClick={() => setBillingPeriod("monthly")}
                className={`min-h-9 rounded-full px-4 text-sm font-semibold transition ${
                  billingPeriod === "monthly"
                    ? "bg-[#0A0F1E] text-white"
                    : isLight
                      ? "text-[#0A0F1E]/70 hover:text-[#0A0F1E]"
                      : "text-[#F8FAFC]/70 hover:text-[#F8FAFC]"
                }`}
                aria-pressed={billingPeriod === "monthly"}
              >
                {copy.pricingMonthly}
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod("yearly")}
                className={`min-h-9 rounded-full px-4 text-sm font-semibold transition ${
                  billingPeriod === "yearly"
                    ? "bg-[#0A0F1E] text-white"
                    : isLight
                      ? "text-[#0A0F1E]/70 hover:text-[#0A0F1E]"
                      : "text-[#F8FAFC]/70 hover:text-[#F8FAFC]"
                }`}
                aria-pressed={billingPeriod === "yearly"}
              >
                {copy.pricingYearly}
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {copy.pricingPlans.map((plan) => {
              const cardShell = isLight
                ? "border-[#E2E8F0] bg-white"
                : "border-[#1E293B] bg-[#111827]";
              const monthlyEquivalentUsd =
                plan.id === "free"
                  ? 0
                  : Math.round(plan.monthlyUsd * (1 - plan.yearlyDiscountPct / 100));
              const yearlyTotalUsd = monthlyEquivalentUsd * 12;

              const priceText =
                billingPeriod === "monthly"
                  ? formatUsd(plan.monthlyUsd, { from: "isFrom" in plan ? plan.isFrom : false })
                  : formatUsd(yearlyTotalUsd, { from: "isFrom" in plan ? plan.isFrom : false });

              const monthlyEquivalentText =
                plan.id === "free"
                  ? null
                  : formatUsd(monthlyEquivalentUsd, { from: "isFrom" in plan ? plan.isFrom : false });

              return (
                <div
                  key={plan.id}
                  className={`flex min-h-[320px] flex-col rounded-2xl border p-5 transition-colors duration-300 ease-in-out ${cardShell}`}
                >
                  <div className="min-w-0">
                    <div className={`${isLight ? "text-[#0A0F1E]" : "text-[#F8FAFC]"}`}>
                      <span className="sr-only">{copy.pricingIconAria}</span>
                      <PlanIcon planId={plan.id} />
                    </div>
                    <div className={`mt-3 text-sm font-semibold ${ui.textPrimary}`}>{plan.name}</div>
                    <div className={`mt-1 min-h-8 text-xs leading-relaxed ${ui.textSecondary}`}>{plan.subtext}</div>
                    <div className={`mt-2 text-2xl font-bold tracking-tight ${ui.textPrimary}`}>{priceText}</div>
                    <div className="mt-1 min-h-10 space-y-1">
                      {billingPeriod === "yearly" && plan.id !== "free" && monthlyEquivalentText ? (
                        <div className={`text-xs ${ui.textSecondary}`}>
                          {monthlyEquivalentText} {copy.pricingPerMonth}
                        </div>
                      ) : (
                        <div className={`text-xs ${ui.textSecondary}`}>{copy.pricingPerMonth}</div>
                      )}
                      <div className={`text-xs ${ui.textSecondary} ${billingPeriod === "yearly" && plan.id !== "free" ? "" : "invisible"}`}>
                        {copy.pricingBilledYearly}
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={openModal}
                        className={`inline-flex w-full min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 ${
                          isLight
                            ? "border border-[#E2E8F0] bg-[#0A0F1E] text-white hover:bg-[#111827] hover:border-[#0A0F1E]"
                            : "border border-white/10 bg-[#0A0F1E] text-[#F8FAFC] hover:bg-[#111827] hover:border-white/20"
                        }`}
                      >
                        {copy.pricingCta}
                      </button>
                    </div>
                  </div>

                  <ul className="mt-5 flex-1 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className={`text-sm leading-relaxed ${ui.textSecondary}`}>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className={`mt-4 text-center text-xs ${ui.textSecondary}`}>{copy.pricingDisclaimer}</p>

          <div className="mt-16 text-center">
            <h2 className={`font-display text-2xl font-bold tracking-tight sm:text-3xl ${ui.textPrimary}`}>
              {copy.faqTitle}
            </h2>
          </div>
          <div
            className={`mx-auto mt-8 max-w-3xl rounded-2xl border transition-colors duration-300 ease-in-out ${
              isLight ? "border-[#E2E8F0] bg-white" : "border-[#1E293B] bg-[#111827]"
            }`}
          >
            {copy.faqs.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              const rowBorder =
                idx === 0 ? "" : isLight ? "border-t border-[#E2E8F0]" : "border-t border-[#1E293B]";
              const answerId = `faq-answer-${idx}`;

              return (
                <div key={item.q} className={`${rowBorder} px-5 py-4`}>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 text-left"
                    onClick={() => setOpenFaqIndex((cur) => (cur === idx ? null : idx))}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    aria-label={isOpen ? copy.faqCloseAria : copy.faqOpenAria}
                  >
                    <span className={`text-sm font-semibold leading-relaxed ${ui.textPrimary}`}>{item.q}</span>
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full transition ${
                        isLight
                          ? "text-[#0A0F1E]/60 hover:text-[#0A0F1E]"
                          : "text-[#F8FAFC]/60 hover:text-[#F8FAFC]"
                      }`}
                      aria-hidden="true"
                    >
                      <PlusMark className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`} />
                    </span>
                  </button>

                  <div
                    id={answerId}
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className={`mt-2 text-sm leading-relaxed ${ui.textSecondary}`}>{item.a}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-14">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <img
                  src="/brand/hammer.svg"
                  width={22}
                  height={22}
                  alt=""
                  aria-hidden="true"
                  className="block h-[22px] w-[22px] select-none"
                  draggable={false}
                />
                <span className="font-display text-[18px] font-bold text-white">{copy.brandName}</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={copy.socialHrefX}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40"
                  aria-label={copy.socialX}
                >
                  <BrandIcon name="x" className="h-4 w-4" />
                </a>
                <a
                  href={copy.socialHrefInstagram}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40"
                  aria-label={copy.socialInstagram}
                >
                  <BrandIcon name="instagram" className="h-4 w-4" />
                </a>
                <a
                  href={copy.socialHrefYoutube}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40"
                  aria-label={copy.socialYoutube}
                >
                  <BrandIcon name="youtube" className="h-4 w-4" />
                </a>
                <a
                  href={copy.socialHrefLinkedIn}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40"
                  aria-label={copy.socialLinkedIn}
                >
                  <BrandIcon name="linkedin" className="h-4 w-4" />
                </a>
                <a
                  href={copy.socialHrefEmail}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40"
                  aria-label={copy.socialEmail}
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <div className="text-xs font-semibold tracking-wide text-white/80">{copy.footerProduct}</div>
                <ul className="mt-3 space-y-2">
                  <li>
                    <a className="text-sm text-white/60 hover:text-white" href="#">
                      {copy.footerLinkPricing}
                    </a>
                  </li>
                  <li>
                    <a className="text-sm text-white/60 hover:text-white" href="#">
                      {copy.footerLinkFaq}
                    </a>
                  </li>
                  <li>
                    <a className="text-sm text-white/60 hover:text-white" href="#">
                      {copy.footerLinkContact}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="text-xs font-semibold tracking-wide text-white/80">{copy.footerCompany}</div>
                <ul className="mt-3 space-y-2">
                  <li>
                    <a className="text-sm text-white/60 hover:text-white" href="#">
                      {copy.footerLinkAbout}
                    </a>
                  </li>
                  <li>
                    <a className="text-sm text-white/60 hover:text-white" href="#">
                      {copy.footerLinkStatus}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="text-xs font-semibold tracking-wide text-white/80">{copy.footerLegal}</div>
                <ul className="mt-3 space-y-2">
                  <li>
                    <a className="text-sm text-white/60 hover:text-white" href="#">
                      {copy.footerLinkPrivacy}
                    </a>
                  </li>
                  <li>
                    <a className="text-sm text-white/60 hover:text-white" href="#">
                      {copy.footerLinkTerms}
                    </a>
                  </li>
                  <li>
                    <a className="text-sm text-white/60 hover:text-white" href="#">
                      {copy.footerLinkSecurity}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">{copy.footerCopyright}</div>
        </div>
      </footer>

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className={`relative flex max-h-[100dvh] w-full flex-col border shadow-2xl sm:max-h-[90vh] sm:max-w-lg sm:rounded-2xl sm:p-8 lg:max-w-xl ${ui.modal}`}
          >
            <div className="px-6 pt-6 sm:px-0 sm:pt-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  {modalStep >= 2 ? (
                    <button
                      type="button"
                      onClick={() => goToStep((modalStep - 1) as 1 | 2 | 3 | 4 | 5 | 6)}
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 ${ui.iconBtn}`}
                      aria-label={copy.back}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  ) : null}
                  <div className="min-w-0">
                    <h2 className={`truncate text-lg font-semibold tracking-tight ${ui.textPrimary}`}>
                      {modalStep === 1
                        ? copy.modalStep1Title
                        : modalStep === 2
                          ? copy.modalStep2Title
                          : modalStep === 3
                            ? copy.modalStep3Title
                            : modalStep === 4
                              ? copy.modalStep4Title
                              : modalStep === 5
                                ? copy.modalStep5Title
                                : copy.modalStep6Title}
                    </h2>
                    {modalStep === 6 ? (
                      <p className={`mt-1 text-sm ${ui.textSecondary}`}>{copy.modalStep6Subtitle}</p>
                    ) : null}
                    <div className="mt-2 flex items-center gap-2">
                      {Array.from({ length: MODAL_STEPS }).map((_, idx) => {
                        const active = idx + 1 === modalStep;
                        return (
                          <span
                            key={idx}
                            className={`h-2 w-2 rounded-full transition ${
                              active ? "bg-[#EAB308]" : ui.dotInactive
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 ${ui.iconBtn}`}
                  aria-label={copy.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 pb-6 sm:px-0 sm:pb-0">
              {isGenerating ? (
                <div className="flex min-h-[260px] flex-1 flex-col items-center justify-center text-center">
                  <div
                    className="h-10 w-10 animate-spin rounded-full border-2 border-[#0EA5E9]/25 border-t-[#0EA5E9]"
                    aria-hidden
                  />
                  <div className={`mt-5 text-sm font-medium ${ui.textPrimary}`}>{copy.forging}</div>
                  {generateError ? (
                    <div className="mt-3 max-w-[360px] text-sm text-red-400">
                      {copy.generateErrorTitle} {generateError}
                    </div>
                  ) : null}
                </div>
              ) : generateError ? (
                <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {copy.generateErrorTitle} {generateError}
                </div>
              ) : null}
              <div className="min-w-0 overflow-x-hidden">
                <div
                  className="flex w-[600%] transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${((modalStep - 1) / MODAL_STEPS) * 100}%)` }}
                >
                {/* Step 1 — Sector */}
                <div className="w-1/6 shrink-0 pr-0">
                  <div className={selectorGrid}>
                    {sectors.map((sector) => {
                      const selected = selectedSectorId === sector.id;
                      const Icon = sector.icon;
                      return (
                        <button
                          key={sector.id}
                          type="button"
                          onClick={() => selectSector(sector.id)}
                          className={`${selectorCard} ${selected ? selectorCardSelected : ""}`}
                        >
                          <Icon className="h-5 w-5 shrink-0 text-[#0EA5E9]" strokeWidth={2} />
                          <span className={`text-[13px] font-medium leading-tight ${ui.textPrimary}`}>
                            {sector.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2 — Subcategory */}
                <div className="w-1/6 shrink-0 pr-0">
                  <div className={selectorGrid}>
                    {subcategoriesForSelectedSector.map((subcategory) => {
                      const selected = selectedSubcategory === subcategory;
                      return (
                        <button
                          key={subcategory}
                          type="button"
                          onClick={() => {
                            setSelectedSubcategory(subcategory);
                            goToStep(3);
                          }}
                          className={`${selectorCard} justify-end ${selected ? selectorCardSelected : ""}`}
                        >
                          <span className={`text-[13px] font-medium leading-tight ${ui.textPrimary}`}>
                            {subcategory}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3 — About */}
                <div className="w-1/6 shrink-0">
                  <div className="flex flex-col gap-5">
                    <div className="min-w-0">
                      <label className={`block text-sm font-medium ${ui.textPrimary}`}>
                        {copy.businessNameLabel}
                      </label>
                      <div className="mt-2">
                        <input
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          type="text"
                          placeholder={copy.businessNamePlaceholder}
                          autoComplete="organization"
                          className={`min-h-11 px-4 text-base ${formField}`}
                        />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <label className={`block text-sm font-medium ${ui.textPrimary}`}>
                        {copy.sellingLabel}
                      </label>
                      <div className="mt-2">
                        <textarea
                          value={selling}
                          onChange={(e) => setSelling(e.target.value)}
                          rows={2}
                          placeholder={copy.sellingPlaceholder}
                          className={`min-h-12 resize-none px-4 py-3 text-base ${formField}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 — Clients & Results */}
                <div className="w-1/6 shrink-0">
                  <div className="flex flex-col gap-5">
                    <div className="min-w-0">
                      <label className={`block text-sm font-medium ${ui.textPrimary}`}>
                        {copy.idealClientLabel}
                      </label>
                      <div className="mt-2">
                        <textarea
                          value={idealClient}
                          onChange={(e) => setIdealClient(e.target.value)}
                          rows={2}
                          placeholder={copy.idealClientPlaceholder}
                          className={`min-h-12 resize-none px-4 py-3 text-base ${formField}`}
                        />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <label className={`block text-sm font-medium ${ui.textPrimary}`}>
                        {copy.resultLabel}
                      </label>
                      <div className="mt-2">
                        <textarea
                          value={result}
                          onChange={(e) => setResult(e.target.value)}
                          rows={2}
                          placeholder={copy.resultPlaceholder}
                          className={`min-h-12 resize-none px-4 py-3 text-base ${formField}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5 — CTA */}
                <div className="w-1/6 shrink-0">
                  <div className="flex flex-col gap-6">
                    <div>
                      <p className={`text-left text-sm font-medium ${ui.textPrimary}`}>
                        {copy.visitorActionLabel}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {copy.visitorActions.map((action) => {
                          const selected = selectedVisitorAction === action.id;
                          return (
                            <button
                              key={action.id}
                              type="button"
                              onClick={() => setSelectedVisitorAction(action.id)}
                              aria-pressed={selected}
                              className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-medium outline-none ring-0 transition-all duration-150 ease-out focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
                                selected ? ui.pillSelected : ui.pillDefault
                              }`}
                            >
                              {action.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 6 — Enhance your page */}
                <div className="w-1/6 shrink-0">
                  <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
                    <div className="flex flex-col gap-4">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => logoInputRef.current?.click()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") logoInputRef.current?.click();
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          handleFileSelect(e.dataTransfer.files[0], setLogoFileName);
                        }}
                        className={uploadZone}
                      >
                        <Upload className="h-5 w-5 text-[#0EA5E9]" />
                        <span className={`text-sm font-medium ${ui.textPrimary}`}>{copy.uploadLogo}</span>
                        <span className={`text-xs ${ui.textSecondary}`}>PNG, SVG, JPG</span>
                        {logoFileName ? (
                          <span className="text-xs text-[#0EA5E9]">{logoFileName}</span>
                        ) : null}
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept=".png,.svg,.jpg,.jpeg,image/png,image/svg+xml,image/jpeg"
                          className="hidden"
                          onChange={(e) =>
                            handleFileSelect(e.target.files?.[0], setLogoFileName)
                          }
                        />
                      </div>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => brandAssetsInputRef.current?.click()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            brandAssetsInputRef.current?.click();
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          handleFileSelect(e.dataTransfer.files[0], setBrandAssetsFileName);
                        }}
                        className={uploadZone}
                      >
                        <Upload className="h-5 w-5 text-[#0EA5E9]" />
                        <span className={`text-sm font-medium ${ui.textPrimary}`}>
                          {copy.uploadBrandAssets}
                        </span>
                        <span className={`text-xs ${ui.textSecondary}`}>Images</span>
                        {brandAssetsFileName ? (
                          <span className="text-xs text-[#0EA5E9]">{brandAssetsFileName}</span>
                        ) : null}
                        <input
                          ref={brandAssetsInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileSelect(e.target.files?.[0], setBrandAssetsFileName)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className={`block text-sm font-medium ${ui.textPrimary}`}>
                          {copy.contactEmailLabel}
                        </label>
                        <input
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          type="email"
                          placeholder={copy.contactEmailPlaceholder}
                          className={`mt-2 min-h-11 px-4 text-base ${formField}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${ui.textPrimary}`}>
                          {copy.phoneLabel}
                        </label>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          type="tel"
                          placeholder={copy.phonePlaceholder}
                          className={`mt-2 min-h-11 px-4 text-base ${formField}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${ui.textPrimary}`}>
                          {copy.websiteLabel}
                        </label>
                        <input
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          type="url"
                          placeholder={copy.websitePlaceholder}
                          className={`mt-2 min-h-11 px-4 text-base ${formField}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${ui.textPrimary}`}>
                          {copy.valuePropLabel}
                        </label>
                        <textarea
                          value={valueProposition}
                          onChange={(e) => setValueProposition(e.target.value)}
                          rows={3}
                          placeholder={copy.valuePropPlaceholder}
                          className={`mt-2 resize-none px-4 py-3 text-base ${formField}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 sm:px-0 sm:pb-0">
              <div className="mt-6 flex items-center justify-between gap-2">
                {modalStep === 6 ? (
                  <button
                    type="button"
                    onClick={handleSkipEnhancements}
                    className={`text-sm font-medium transition focus:outline-none ${ui.textSecondary} ${isLight ? "hover:text-[#0A0F1E]" : "hover:text-[#F8FAFC]"}`}
                  >
                    {copy.skipForNow}
                  </button>
                ) : (
                  <span />
                )}
                {modalStep === 6 ? (
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`${primaryBtn} px-5 text-sm ${isGenerating ? "animate-pulse" : ""}`}
                  >
                    {isGenerating ? copy.generating : copy.generatePage}
                  </button>
                ) : modalStep < MODAL_STEPS ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (modalStep === 1) {
                        if (selectedSectorId) goToStep(2);
                        return;
                      }
                      if (modalStep === 2) {
                        if (selectedSubcategory) goToStep(3);
                        return;
                      }
                      goToStep((modalStep + 1) as 1 | 2 | 3 | 4 | 5 | 6);
                    }}
                    className={`${primaryBtn} px-5 text-sm`}
                  >
                    {copy.next}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
