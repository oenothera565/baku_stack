import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = "You are a Baku Stack mentor. Expert coder. Concise answers.";

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Debug: лог без раскрытия ключа
  console.log("API Key exists:", !!apiKey);
  console.log("API Key length:", apiKey?.length || 0);
  console.log("API Key prefix:", apiKey?.substring(0, 7) || "none");

  if (!apiKey) {
    return NextResponse.json(
      { error: "No API Key configured in Vercel Environment Variables" },
      { status: 500 }
    );
  }

  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: message }],
    });

    const content = response.content[0];
    const text = content.type === "text" ? content.text : "";

    return NextResponse.json({ content: text });
  } catch (error: any) {
    console.error("Anthropic API error:", error?.message || error);

    // Более детальная ошибка для отладки
    let errorMessage = "Failed to get response";
    if (error?.message) {
      errorMessage = error.message;
    }
    if (error?.type) {
      errorMessage = `${error.type}: ${errorMessage}`;
    }

    return NextResponse.json(
      { error: errorMessage, debug: error?.type },
      { status: 500 }
    );
  }
}
