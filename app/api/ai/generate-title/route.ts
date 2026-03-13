import { NextRequest, NextResponse } from "next/server";
import { generateTitle } from "@/services/geminiService";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const title = await generateTitle(code);
    console.log("[Generate Title] Result:", title);
    return NextResponse.json({ title });
  } catch (error) {
    console.error("Generate title error:", error);
    return NextResponse.json(
      { error: "Failed to generate title" },
      { status: 500 },
    );
  }
}
