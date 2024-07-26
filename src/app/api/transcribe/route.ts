import { NextResponse } from "next/server";
import { Uploadable } from "openai/uploads.mjs";
import OpenAI from "openai";

export async function POST(request: Request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const formData = await request.formData();
    const audioFile = formData.get("file");
    console.log("audioblob", audioFile);

    if (!audioFile) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile as Uploadable,
      model: "whisper-1",
    });

    return NextResponse.json({ transcription: transcription });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
