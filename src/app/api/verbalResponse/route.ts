import { NextRequest, NextResponse } from "next/server";}
import OpenAI from "openai";
import { Readable } from "stream";


const key = process.env.OPENAI_SECRET_KEY;

if (!key) {
  throw new Error("No API key found");
}

const openai = new OpenAI({
  apiKey: key// This is just for development purposes; will have to fix later on
});

export default async function POST(request: NextRequest) {
  const input = request.nextUrl.searchParams.get('input');

  if (typeof input !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input,
      response_format: "mp3",
      speed: 1,
    });

    const readableStream: Readable = response.body as unknown as Readable;

    // Create a Web ReadableStream from the Node.js Readable stream
    const stream = new ReadableStream({
      start(controller) {
        readableStream.on('data', (chunk) => controller.enqueue(chunk));
        readableStream.on('end', () => controller.close());
        readableStream.on('error', (err) => controller.error(err));
      },
    });

    // Return a streaming response
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create audio" }, { status: 500 });
  }
}
