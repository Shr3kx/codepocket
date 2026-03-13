import { NextRequest, NextResponse } from "next/server";
import { suggestTags } from "@/services/geminiService";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const tags = await suggestTags(code);
    return NextResponse.json({ tags });
  } catch (error) {
    console.error("Suggest tags error:", error);
    return NextResponse.json(
      { error: "Failed to suggest tags" },
      { status: 500 },
    );
  }
}
