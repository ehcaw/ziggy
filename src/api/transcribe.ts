// src/api/transcribe

import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import axios from "axios";

const apikey = process.env.OPENAI_SECRET_KEY;

if (!apikey) {
  throw new Error("no apikey man!!");
}

const openai = new OpenAI({
  apiKey: apikey,
});

export async function transcribe(audioBit: Blob) {
  const fileFromAudioBit = new File([audioBit], "audio.wav", {
    type: "audio/wav",
  });
  const formData = new FormData();
  formData.append("file", fileFromAudioBit);
  formData.append("model", "whisper-1");
  formData.append("response_format", "text");

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${apikey}`,
        },
      },
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data.text;
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
