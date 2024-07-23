"use client";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Mic, MicOff } from "lucide-react";
import { useMicrophone } from "@/hooks/useMicrophonePermissions";
import axios from "axios";

export default function VocabGen() {
  const [vocabWord, setVocabWord] = useState<string>("hello world");
  const [vocabWordDefinition, setVocabWordDefinition] = useState<string>(
    "even more hello world",
  );
  const [microphoneOn, setMicrophoneOn] = useState<boolean>(false);
  const [currentAudioRecording, setCurrentAudioRecording] =
    useState<HTMLAudioElement | null>(null);
  const [timesPronouncedCorrect, setTimesPronouncedCorrect] =
    useState<number>(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  let audioBlobs: BlobPart[] = [];
  const microphonePermissions = useMicrophone();

  const generateVocab = async () => {
    const vocab = await fetch("/api/vocab", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseJson = await vocab.json();
    console.log(responseJson[0].word);
    console.log(responseJson[0].definition);
    setVocabWord(responseJson[0].word);
    setVocabWordDefinition(responseJson[0].definition);
    //setVocabWord(vocabJson[0]);
  };

  const microphoneButton = async () => {
    setMicrophoneOn(!microphoneOn);
    console.log("microphone toggled");
    if (microphoneOn) {
      const currentAudioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorder.current = new MediaRecorder(currentAudioStream, {
        mimeType: "audio/webm",
      });
      mediaRecorder.current.start();
      mediaRecorder.current.ondataavailable = (event: { data: BlobPart }) => {
        console.log("currently recording");
        audioBlobs.push(event.data);
      };
      mediaRecorder.current.onstop = async () => {
        try {
          const audioBlob = new Blob(audioBlobs, { type: "audio/wav" });
          const formData = new FormData();
          formData.append("file", audioBlob);
          const transcription = await axios.post("/api/transcribe", {
            body: formData,
          });
          const transcriptionText = transcription.data.transcription;
          if (transcriptionText == vocabWord) {
            setTimesPronouncedCorrect(timesPronouncedCorrect + 1);
            if (timesPronouncedCorrect == 3) {
              alert("you've pronounced it correctly 3 times! moving on");
              setTimesPronouncedCorrect(0);
              setVocabWord("");
              setVocabWordDefinition("");
            }
          } else {
            alert("incorrect. try again");
          }
        } catch (error) {
          console.error(error);
        }
      };
    }
  };

  return (
    <div className="w-full h-screen bg-white dark:bg-gray-800 p-8">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Practice your vocabulary and pronunciation!
        </h1>
        <div className="w-full max-w-md">
          <div className="rounded-md shadow-sm">
            <div className="text-center block w-full text-lg py-3 px-4 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
              {vocabWord}
            </div>
            <div className="text-center block w-full text-lg py-3 px-4 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
              {vocabWordDefinition}
            </div>
          </div>
          <div className="flex-cols-2 flex justify-center justify-items-center">
            <Button onClick={() => generateVocab()}> Generate </Button>
            <Button onClick={() => microphoneButton()}>
              {" "}
              Open Mic
              {microphoneOn ? <Mic /> : <MicOff />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
