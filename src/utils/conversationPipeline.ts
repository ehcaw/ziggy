import axios from "axios";

export async function converse(audioBlobs: BlobPart[], prompt?: string) {
  const userSpeech = new Blob(audioBlobs, { type: "audio/wav" });
  const formData = new FormData();
  formData.append("file", userSpeech);
  formData.append("model", "whisper-1");
  formData.append("response_format", "text");
  const transcription = await axios.post("/api/transcribe", { body: formData });
  const transcriptionText = transcription.data.transcription;

  const aiConversationResponseBody = {
    text: transcriptionText,
    prompt:
      prompt ||
      "You are a helpful assistant that is helping the user learn english. Start with simple conversations and slowly ramp up the difficulty",
  };
  const aiConversationResponse = await axios.post("/api/conversation", {
    body: aiConversationResponseBody,
  });
  const audioResponse = await axios.post("/api/textToSpeech/", {
    body: {
      input: aiConversationResponse.data.choices.message.content,
    },
  });
  return new Audio(audioResponse.data.audioBlob);
}
