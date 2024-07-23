//src/app/api/vocab/route.ts
import getWord from "@/api/randomWord";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    /*
    let randomWord = await fetch("https://random-word-api.herokuapp.com/word");
    randomWord = await randomWord.json();
    return Response.json(randomWord);
    */

    let randomWord = await fetch(
      "https://random-word-gen-steel.vercel.app/word",
    );
    randomWord = await randomWord.json();
    return Response.json(randomWord);
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
    return Response.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}
