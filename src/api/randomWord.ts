//src/api/randomWord.ts

import axios from "axios";

export default async function getWord() {
  try {
    const randomWord = await axios.post(
      "https://random-word-api.herokuapp.com/word",
    );

    if (randomWord.status >= 200 && randomWord.status < 300) {
      return randomWord.data;
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
