import OpenAI from "openai";
import { Uploadable } from "openai/uploads.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function transcribeUtil(blob: Blob) {
  const file = new File([blob], "audio.wav", { type: "audio/wav" });

  try {
    if (!file) {
      return "no file detected";
    }
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
    });
    return transcription.text;
  } catch (error) {
    return error;
  }
}
