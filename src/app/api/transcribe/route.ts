import OpenAI from "openai";
import { NextResponse } from "next/server";
import { Uploadable } from "openai/uploads.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("file");

    if (!audioFile) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const response = await openai.audio.transcriptions.create({
      file: audioFile as Uploadable,
      model: "whisper-1",
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}
