import { NextResponse } from "next/server";

type GenerateRequestBody = {
  businessName: string;
  sector: string;
  subcategory: string;
  offer: string;
  idealClient: string;
  result: string;
  cta: string;
  email?: string;
  phone?: string;
  website?: string;
  valueProp?: string;
};

type ClaudeGenerated = {
  headline: string;
  subheadline: string;
  heroDescription: string;
  features: Array<{ title: string; description: string }>;
  testimonial: { quote: string; author: string; role: string };
  ctaText: string;
  ctaSubtext: string;
};

function toErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  return "Unknown error";
}

function extractJsonObject(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start, end + 1);
}

function isClaudeGenerated(value: unknown): value is ClaudeGenerated {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (typeof v.headline !== "string") return false;
  if (typeof v.subheadline !== "string") return false;
  if (typeof v.heroDescription !== "string") return false;
  if (!Array.isArray(v.features) || v.features.length !== 3) return false;
  if (
    !v.features.every(
      (f) =>
        f &&
        typeof f === "object" &&
        typeof (f as Record<string, unknown>).title === "string" &&
        typeof (f as Record<string, unknown>).description === "string",
    )
  )
    return false;
  if (!v.testimonial || typeof v.testimonial !== "object") return false;
  const t = v.testimonial as Record<string, unknown>;
  if (typeof t.quote !== "string" || typeof t.author !== "string" || typeof t.role !== "string") return false;
  if (typeof v.ctaText !== "string") return false;
  if (typeof v.ctaSubtext !== "string") return false;
  return true;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing ANTHROPIC_API_KEY" }, { status: 500 });
    }

    const body = (await req.json()) as Partial<GenerateRequestBody>;
    const required: Array<keyof GenerateRequestBody> = [
      "businessName",
      "sector",
      "subcategory",
      "offer",
      "idealClient",
      "result",
      "cta",
    ];
    for (const key of required) {
      if (!body[key] || typeof body[key] !== "string") {
        return NextResponse.json({ error: `Missing or invalid ${key}` }, { status: 400 });
      }
    }

    const systemPrompt = `You are an expert landing page copywriter specializing in ${body.sector} businesses. Write conversion-focused landing page copy that feels human, specific, and premium — never generic. Speak directly to the ideal client's pain points and desires.`;

    const userPrompt = `Create landing page copy for:
Business: ${body.businessName}
Type: ${body.sector} → ${body.subcategory}
Offer: ${body.offer}
Ideal client: ${body.idealClient}
Result delivered: ${body.result}
CTA goal: ${body.cta}

Return ONLY a JSON object with these exact keys:
{
  headline: string (powerful, max 8 words),
  subheadline: string (clear benefit, max 20 words),
  heroDescription: string (2 sentences, specific),
  features: [
    { title: string, description: string },
    { title: string, description: string },
    { title: string, description: string }
  ],
  testimonial: {
    quote: string (realistic, specific),
    author: string,
    role: string
  },
  ctaText: string (action verb + benefit),
  ctaSubtext: string (remove friction, max 8 words)
}`;

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1200,
        temperature: 0.4,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const text = await anthropicRes.text().catch(() => "");
      return NextResponse.json(
        { error: "Claude API error", status: anthropicRes.status, details: text.slice(0, 500) },
        { status: 500 },
      );
    }

    const data = (await anthropicRes.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };

    const text = data.content?.find((c) => c.type === "text")?.text ?? "";
    const jsonText = extractJsonObject(text) ?? text;

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse Claude JSON", details: text.slice(0, 500) },
        { status: 500 },
      );
    }

    if (!isClaudeGenerated(parsed)) {
      return NextResponse.json({ error: "Claude response shape invalid", raw: parsed }, { status: 500 });
    }

    return NextResponse.json(parsed, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error", details: toErrorMessage(err) }, { status: 500 });
  }
}

