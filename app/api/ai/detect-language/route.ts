import { NextRequest, NextResponse } from "next/server";
import { detectLanguage } from "@/services/geminiService";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const language = await detectLanguage(code);
    return NextResponse.json({ language });
  } catch (error) {
    console.error("Detect language error:", error);
    return NextResponse.json(
      { error: "Failed to detect language" },
      { status: 500 },
    );
  }
}
