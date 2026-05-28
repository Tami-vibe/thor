export type DesignFamilyId =
  | "trustAuthority"
  | "rawEnergy"
  | "calmLuxury"
  | "precisionTech"
  | "warmIndulgence"
  | "warmApproach";

export type VariationPersonality = "authority" | "emotion" | "disruptor";

export type LayoutVariantId = "centeredEditorial" | "splitHero" | "stackedProof" | "minimalGrid";

export type ThorFontConfig = {
  display: {
    family: string;
    weights: readonly number[];
    cssVariable: string;
  };
  sans: {
    family: string;
    weights: readonly number[];
    cssVariable: string;
  };
};

export type ThorPalette = {
  background: string;
  surface: string;
  border: string;
  navBorderLight: string;
  textPrimary: string;
  textSecondary: string;
  /** Primary brand color (CTA bands, primary buttons) */
  accent: string;
  accentGold: string;
  selectedTint: string;
  hoverTint: string;
  buttonPrimaryBg: string;
  buttonPrimaryHoverBg: string;
  buttonPrimaryText: string;
  onPrimary: string;
  onPrimaryMuted: string;
  navBackdrop: string;
  ctaButtonOverlay: string;
};

export type DesignFamily = {
  id: DesignFamilyId;
  personality: string;
  sectors: readonly string[];
  subcategories: readonly string[];
  fonts: ThorFontConfig;
  palettes: {
    dark: ThorPalette;
    light: ThorPalette;
  };
};

export type LayoutVariant = {
  id: LayoutVariantId;
  label: string;
  description: string;
};

export const thorFonts: ThorFontConfig = {
  display: { family: "Fraunces", weights: [300, 400, 700, 900], cssVariable: "--font-fraunces" },
  sans: { family: "Inter", weights: [400, 500, 600], cssVariable: "--font-inter" },
} as const;

const darkBase: ThorPalette = {
  background: "#0A0F1E",
  surface: "#111827",
  border: "#1E293B",
  navBorderLight: "#F1F5F9",
  textPrimary: "#F8FAFC",
  textSecondary: "#64748B",
  accent: "#0EA5E9",
  accentGold: "#EAB308",
  selectedTint: "rgba(234, 179, 8, 0.08)",
  hoverTint: "rgba(14, 165, 233, 0.05)",
  buttonPrimaryBg: "#0A0F1E",
  buttonPrimaryHoverBg: "#111827",
  buttonPrimaryText: "#F8FAFC",
  onPrimary: "#FFFFFF",
  onPrimaryMuted: "rgba(255, 255, 255, 0.9)",
  navBackdrop: "rgba(10, 15, 30, 0.90)",
  ctaButtonOverlay: "rgba(255, 255, 255, 0.12)",
};

const lightBase: ThorPalette = {
  background: "#FFFFFF",
  surface: "#F8FAFC",
  border: "#E2E8F0",
  navBorderLight: "#F1F5F9",
  textPrimary: "#0F172A",
  textSecondary: "#94A3B8",
  accent: "#0EA5E9",
  accentGold: "#EAB308",
  selectedTint: "rgba(234, 179, 8, 0.08)",
  hoverTint: "rgba(14, 165, 233, 0.05)",
  buttonPrimaryBg: "#0A0F1E",
  buttonPrimaryHoverBg: "#111827",
  buttonPrimaryText: "#FFFFFF",
  onPrimary: "#FFFFFF",
  onPrimaryMuted: "rgba(255, 255, 255, 0.9)",
  navBackdrop: "rgba(255, 255, 255, 0.95)",
  ctaButtonOverlay: "rgba(255, 255, 255, 0.12)",
};

const trustAuthorityDark: ThorPalette = {
  ...darkBase,
  accent: "#1E40AF",
  buttonPrimaryBg: "#1E40AF",
  buttonPrimaryHoverBg: "#1E3A8A",
};

const trustAuthorityLight: ThorPalette = {
  ...lightBase,
  accent: "#1E40AF",
  buttonPrimaryBg: "#1E40AF",
  buttonPrimaryHoverBg: "#1E3A8A",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  border: "#CBD5E1",
};

export const designFamilies: readonly DesignFamily[] = [
  {
    id: "trustAuthority",
    personality: "Measured, credible, calm confidence. No hype. Strong hierarchy and proof-led structure.",
    sectors: ["Legal", "Finance", "Medical"],
    subcategories: [
      "Accident Attorney",
      "Family Law",
      "Criminal Defense",
      "Real Estate Law",
      "Corporate Law",
      "Immigration Law",
      "Accounting Firm",
      "Financial Advisor",
      "General Practice",
      "Dentist",
    ],
    fonts: thorFonts,
    palettes: { dark: trustAuthorityDark, light: trustAuthorityLight },
  },
  {
    id: "rawEnergy",
    personality: "Direct, bold, kinetic. High contrast, short punchy lines. Motion only via transform/opacity.",
    sectors: ["Fitness & Movement", "Hospitality"],
    subcategories: ["CrossFit Gym", "Martial Arts", "Personal Trainer", "Bar & Nightclub", "Restaurant"],
    fonts: thorFonts,
    palettes: { dark: darkBase, light: lightBase },
  },
  {
    id: "calmLuxury",
    personality: "Quiet premium. More whitespace, softer contrast, fewer elements. Every line earns its place.",
    sectors: ["Beauty & Wellness", "Hospitality", "Fitness & Movement"],
    subcategories: [
      "Spa & Massage",
      "Aesthetics Clinic",
      "Hair Salon",
      "Resort",
      "Hotel",
      "Yoga Studio",
      "Pilates Studio",
    ],
    fonts: {
      display: { family: "Cormorant Garamond", weights: [400, 600, 700], cssVariable: "--font-cormorant-garamond" },
      sans: thorFonts.sans,
    },
    palettes: {
      dark: {
        ...darkBase,
        accent: "#C17D52",
        accentGold: "#7A8F5E",
      },
      light: {
        ...lightBase,
        background: "#FDF8F3",
        surface: "#FFFFFF",
        border: "#E8DDD3",
        textPrimary: "#0A0F1E",
        textSecondary: "#64748B",
        accent: "#C17D52",
        accentGold: "#7A8F5E",
      },
    },
  },
  {
    id: "precisionTech",
    personality: "Sharp, modern, technical clarity without jargon. Strong grid, predictable rhythm, crisp copy.",
    sectors: ["SaaS", "Finance"],
    subcategories: ["Marketing Tech", "HR Tech", "Fintech", "Healthcare Tech", "Wealth Management"],
    fonts: thorFonts,
    palettes: { dark: darkBase, light: lightBase },
  },
  {
    id: "warmIndulgence",
    personality: "Inviting and sensory, but still minimal. Emphasis on comfort, craft, and the outcome.",
    sectors: ["Hospitality", "Beauty & Wellness"],
    subcategories: ["Café & Bakery", "Restaurant", "Nail Studio", "Barbershop"],
    fonts: thorFonts,
    palettes: { dark: darkBase, light: lightBase },
  },
  {
    id: "warmApproach",
    personality: "Human and friendly, structured for clarity. Removes intimidation and increases trust quickly.",
    sectors: ["Language Schools", "Church & Community", "Medical"],
    subcategories: ["Multi-language Center", "English", "Non-profit", "Community Center", "Mental Health", "Pediatrics"],
    fonts: thorFonts,
    palettes: { dark: darkBase, light: lightBase },
  },
] as const;

export const variationPersonalities: readonly VariationPersonality[] = [
  "authority",
  "emotion",
  "disruptor",
] as const;

export const layoutVariants: readonly LayoutVariant[] = [
  {
    id: "centeredEditorial",
    label: "Centered editorial",
    description: "Claude-like centered hero, tight hierarchy, minimal ornamentation.",
  },
  {
    id: "splitHero",
    label: "Split hero",
    description: "Two-column hero at lg+ with crisp left copy and a right supporting panel.",
  },
  {
    id: "stackedProof",
    label: "Stacked proof",
    description: "Hero then immediate proof block before feature grid. Strong trust cadence.",
  },
  {
    id: "minimalGrid",
    label: "Minimal grid",
    description: "Lean sectioning with compact grids and high whitespace. Minimal but structured.",
  },
] as const;

export function getDesignFamily(sector: string, subcategory?: string) {
  const sectorNorm = sector.trim().toLowerCase();
  const subNorm = (subcategory ?? "").trim().toLowerCase();

  const exact = designFamilies.find((f) => {
    const sectorMatch = f.sectors.some((s) => s.toLowerCase() === sectorNorm);
    const subMatch = subNorm
      ? f.subcategories.some((s) => s.toLowerCase() === subNorm)
      : false;
    return sectorMatch && (subNorm ? subMatch : true);
  });
  if (exact) return exact;

  const sectorOnly = designFamilies.find((f) => f.sectors.some((s) => s.toLowerCase() === sectorNorm));
  if (sectorOnly) return sectorOnly;

  return designFamilies.find((f) => f.id === "precisionTech") ?? designFamilies[0];
}

export function getRandomLayoutVariant() {
  const idx = Math.floor(Math.random() * layoutVariants.length);
  return layoutVariants[idx] ?? layoutVariants[0];
}

export function generateVariationSeed(): VariationPersonality {
  const idx = Math.floor(Math.random() * variationPersonalities.length);
  return variationPersonalities[idx] ?? "authority";
}

