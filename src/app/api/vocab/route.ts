//src/app/api/vocab/route.ts

import axios from "axios";
import getWord from "@/api/randomWord";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
  const randomWord = await getWord();
  if (randomWord) {
    return NextResponse.json({ word: randomWord });
  } else {
    return NextResponse.json({ error: "Failed to get word" }, { status: 500 });
  }
}
