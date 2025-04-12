"use client";

//src/app/converse/page.tsx
//src/components/main/Conversation.tsx

import { Fragment, useEffect, useRef, useState } from "react";
import { useMicVAD } from "@ricky0123/vad-react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMicrophone } from "../../hooks/useMicrophonePermissions";
import { conversationUtil } from "@/utils/conversationPipeline";
import axios from "axios";

const ConversationComponent: React.FC<{}> = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [synthesizedText, setSynthesizedText] = useState<string>("");
  const [microphoneBool, setMicrophoneBool] = useState<boolean>(false);
  const microphonePermissions = useMicrophone();
  const vadInstanceRef = useRef<{
    listening: boolean;
    errored:
      | false
      | {
          message: string;
        };
    loading: boolean;
    userSpeaking: boolean;
    pause: () => void;
    start: () => void;
    toggle: () => void;
  }>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = async () => {
        console.log("media recorder stopped");
        /*
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        console.log(blob);
        audioChunksRef.current = [];
        const conversation = conversationUtil(blob);
        */
      };

      mediaRecorderRef.current.start();
      console.log("recording started");
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  const stopRecording = async () => {
    console.log("stopped recording");
    /*
    console.log(mediaRecorderRef.current);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state == "inactive"
    )
      mediaRecorderRef.current.stop();
      */
  };

  const handleToggle = (microphoneBool: boolean) => {
    setMicrophoneBool(microphoneBool);
  };

  useEffect(() => {
    vadInstanceRef.current = useMicVAD({
      startOnLoad: true,
      onSpeechStart: async () => {
        await startRecording();
      },
      onSpeechEnd: async (audio) => {
        await stopRecording();
      },
      preSpeechPadFrames: 5,
      positiveSpeechThreshold: 0.9,
      negativeSpeechThreshold: 0.6,
      redemptionFrames: 7,
    });
  }, []);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
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
            {vadInstanceRef.current && vadInstanceRef.current.userSpeaking && (
              <Mic className="h-4 w-4" />
            )}

            {vadInstanceRef.current && !vadInstanceRef.current.userSpeaking && (
              <MicOff className="h-4 w-4" />
            )}
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
