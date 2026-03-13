import { NextRequest, NextResponse } from "next/server";
import { explainCode } from "@/services/geminiService";

export async function POST(request: NextRequest) {
  try {
    const { code, language } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const description = await explainCode(code, language || "javascript");
    console.log("[Explain Code] Result:", description);
    return NextResponse.json({ description });
  } catch (error) {
    console.error("Explain code error:", error);
    return NextResponse.json(
      { error: "Failed to explain code" },
      { status: 500 },
    );
  }
}
