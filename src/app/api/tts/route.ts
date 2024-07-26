import axios from "axios";
import OpenAI from "openai";
import Readable from "stream";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const { input } = await request.json();

    const openaiResponse = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: input,
    });

    // Convert the ReadableStream to a Response object
    const response = new Response(openaiResponse.body);

    // Set the appropriate headers
    response.headers.set("Content-Type", "audio/mpeg");
    response.headers.set("Transfer-Encoding", "chunked");

    return response;
  } catch (error) {
    console.error("Error in TTS API:", error);
    return NextResponse.json(
      { error: "TTS processing failed" },
      { status: 500 },
    );
  }
}
