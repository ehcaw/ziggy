import OpenAI from "openai";
import { Uploadable } from "openai/uploads.mjs";

const key =
  process.env.OPENAI_SECRET_KEY ||
  "sk-proj-lNJbaInBug3iHXefI3ahT3BlbkFJFvHbxCe2b70iAWoJStIL";

const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true,
});

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
