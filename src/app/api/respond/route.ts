//src/app/api/respond/route.ts

import axios from "axios";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  let userInput = await request.json();
  let { input, prompt } = userInput;
  try {
    const textResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Given a sentence or two, generate a response that pertains to the certain situation that you're put in. Reply as normally without quirk.",
        },
        {
          role: "system",
          content:
            "Keep your answer short. One or two sentences max. If you cannot fit the response in 1 or 2 sentences, ask a clarifying question to narrow the topic down.",
        },
        {
          role: "system",
          content: prompt || "",
        },
        { role: "user", content: input },
      ],
      model: "gpt-4o-mini",
      temperature: 0.7,
    });
    return new NextResponse(textResponse.choices[0].message.content);
  } catch (error) {
    console.error(error);
    return new NextResponse("super duper error");
  }
}
