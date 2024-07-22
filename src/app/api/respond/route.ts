//src/app/api/converse/route.ts

import axios from "axios";

export default async function POST(request: Request) {
  const userInput = await request.json();
  try {
    const textResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Given a sentence or two, generate a response that pertains to the certain situation that you're put in. Reply as normally without quirk.",
          },
          {
            role: "system",
            content: prompt || "",
          },
          { role: "user", content: userInput.data.text },
        ],
      },
    );
    if (textResponse.status >= 200 && textResponse.status < 300) {
      return textResponse.data.choices[0].message.content;
    } else {
      throw new Error("Failed to get response from OpenAI");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error:",
        error.response?.status,
        error.response?.data,
      );
    } else {
      console.error("Unknown error:", error);
    }
  }
}
