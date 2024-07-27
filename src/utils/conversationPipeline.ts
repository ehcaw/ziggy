import axios from "axios";

export async function conversationUtil(
  blob: Blob,
  prompt?: string,
  max_tokens?: number,
) {
  // Create audio file
  const userAudioFile = new File([blob], "audio.wav", { type: "audio/wav" });
  const formData = new FormData();
  formData.append("file", userAudioFile);

  // Parallel API calls for transcription and TTS setup
  const [transcribeResponse, ttsContext] = await Promise.all([
    axios.post("/api/transcribe", formData),
    setupAudioContext(),
  ]);

  if (transcribeResponse.status !== 200) {
    throw new Error("Transcription response not ok");
  }

  const transcription = transcribeResponse.data.transcription.text;
  console.log("Transcription:", transcription);

  // AI response
  const respResponse = await axios.post("/api/respond", {
    input: transcription,
    prompt: prompt,
    max_tokens: max_tokens,
  });

  if (respResponse.status !== 200) {
    throw new Error("AI response not ok");
  }

  const aiResponse = respResponse.data;
  console.log("AI Response:", aiResponse);

  // TTS
  const ttsResponse = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: aiResponse }),
  });

  if (!ttsResponse.ok) {
    throw new Error("TTS response not ok");
  }

  return streamAndPlayAudio(
    ttsResponse,
    ttsContext.audioContext,
    ttsContext.sourceNode,
  );
}

async function setupAudioContext() {
  const audioContext = new window.AudioContext();
  const sourceNode = audioContext.createBufferSource();
  return { audioContext, sourceNode };
}

async function streamAndPlayAudio(
  response: Response,
  audioContext: AudioContext,
  sourceNode: AudioBufferSourceNode,
) {
  const reader = response.body!.getReader();
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

  const audioBuffer = await audioContext.decodeAudioData(audioData.buffer);
  sourceNode.buffer = audioBuffer;
  sourceNode.connect(audioContext.destination);
  sourceNode.start();

  return new Promise((resolve) => {
    sourceNode.onended = () => resolve("Audio playback completed");
  });
}
