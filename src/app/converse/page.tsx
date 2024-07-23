"use client";

//src/app/converse/page.tsx
//src/components/main/Conversation.tsx

import { Fragment, useEffect, useRef, useState } from "react";
import { useMicVAD } from "@ricky0123/vad-react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMicrophone } from "../../hooks/useMicrophonePermissions";
import { converse } from "@/utils/conversationPipeline";

const ConversationComponent: React.FC<{}> = () => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [synthesizedText, setSynthesizedText] = useState<string>("");
  const [currentAudioBit, setCurrentAudioBit] =
    useState<HTMLAudioElement | null>(null);
  const microphonePermissions = useMicrophone();
  let audioBlobs: BlobPart[] = [];

  const startRecording = async () => {
    const currentStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    mediaRecorder.current = new MediaRecorder(currentStream, {
      mimeType: "audio/webm",
    });
    mediaRecorder.current.start();

    mediaRecorder.current.ondataavailable = (event: { data: BlobPart }) => {
      audioBlobs.push(event.data);
    };
    mediaRecorder.current.onstop = async () => {
      console.log("MediaRecorder stopped", audioBlobs);
      try {
        const aiResponse = await converse(audioBlobs, "Hello");
        aiResponse.play();
      } catch (error) {
        console.log("bruh error", error);
      }
    };
  };
  const vadInstance = useMicVAD({
    startOnLoad: true,
    onSpeechStart: async () => {
      if (currentAudioBit) {
        currentAudioBit.pause();
        setCurrentAudioBit(null);
        console.log("ai response interrupted");
      }
      console.log("started speaking");
      startRecording();
    },
    onSpeechEnd: async (audio) => {
      console.log("ended speaking");
      if (mediaRecorder.current) {
        mediaRecorder.current.stop();
      }
    },
    preSpeechPadFrames: 5,
    positiveSpeechThreshold: 0.9,
    negativeSpeechThreshold: 0.6,
    redemptionFrames: 7,
  });

  useEffect(() => {
    return () => {
      if (mediaRecorder.current) {
        mediaRecorder.current.stop();
      }
    };
  });
  return (
    <Fragment>
      <div className={`relative h-screen flex flex-col`}>
        {/* Main container */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl">
            Please be aware that the voice that is speaking to you is AI, and
            therefore is not a real person.
          </p>
          <p>You said: {transcribedText}</p>
          <p>Polly responds: {synthesizedText}</p>
          <Button
            onClick={() => {
              console.log("recording is ready");
            }}
            className="mt-4" // Add margin-top for spacing if needed
          >
            {vadInstance.userSpeaking && <Mic className="h-4 w-4" />}

            {!vadInstance.userSpeaking && <MicOff className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* If user has not provided auth to micorphone*/}
      {!microphonePermissions && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center backdrop-blur-xl transition-all ease-in-out"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-white text-xl">Please enable mic permissions.</p>
        </div>
      )}
    </Fragment>
  );
};

export default ConversationComponent;
