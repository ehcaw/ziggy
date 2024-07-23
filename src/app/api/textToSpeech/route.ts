import axios from "axios";
import OpenAI from "openai";
import Readable from "stream";
import { NextRequest, NextResponse } from "next/server";

const apikey = process.env.OPENAI_SECRET_KEY;

if (!apikey) {
  throw new Error("no apikey man!!");
}

const openai = new OpenAI({
  apiKey: apikey,
});

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input,
      response_format: "mp3",
      speed: 1,
    });

    // Ensure response.body is treated as a Readable stream
    const bodyStream = response.body as unknown as Readable;

    if (!bodyStream) {
      throw new Error("Response body is null or undefined");
    }

    // Convert the Node.js Readable stream to a Web ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        bodyStream.on("data", (chunk) => controller.enqueue(chunk));
        bodyStream.on("end", () => controller.close());
        bodyStream.on("error", (err) => controller.error(err));
      },
    });

    // Return a streaming response
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}
