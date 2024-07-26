import axios from "axios";

async function streamAudio(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  audioBuffer: any,
  audioContext: AudioContext,
  sourceNode: any,
) {
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const audioData = new Uint8Array(
    chunks.reduce((acc, chunk) => acc + chunk.length, 0),
  );
  let offset = 0;
  for (const chunk of chunks) {
    audioData.set(chunk, offset);
    offset += chunk.length;
  }

  audioBuffer = await audioContext.decodeAudioData(audioData.buffer);
  sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.connect(audioContext.destination);
  sourceNode.start();
}

export async function conversationUtil(blob: Blob, prompt?: string) {
  const userAudioFile = new File([blob], "audio.wav", { type: "audio/wav" });
  const formData = new FormData();
  formData.append("file", userAudioFile);

  let response = await axios.post("/api/transcribe", formData);
  if (response.status !== 200) {
    throw new Error("transcription response not ok");
  }
  const transcription = response.data.transcription.text;

  response = await axios.post("/api/response", {
    input: transcription,
    prompt: prompt,
  });
  if (response.status !== 200) {
    throw new Error("ai response not ok");
  }
  const aiResponse = response.data;

  const chunks = [];
  const tts = await fetch("/api/tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: aiResponse }),
  });
  if (!tts.ok) {
    throw new Error("respnse not ok");
  }
  const reader = tts.body!.getReader();
  const audioContext = new window.AudioContext();
  const sourceNode = audioContext.createBufferSource();
  let audioBuffer = null;

  return await streamAudio(reader, audioBuffer, audioContext, sourceNode);
}
