import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = "You are a Baku Stack mentor. Expert coder. Concise answers.";

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API Key not configured" },
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
  } catch (error: unknown) {
    // Proper error handling without logging sensitive info
    let errorMessage = "Failed to get response from AI";

    if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = String(error.message);
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
