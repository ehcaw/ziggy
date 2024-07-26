"use client";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import { useMicrophone } from "@/hooks/useMicrophonePermissions";
import axios from "axios";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { transcribeUtil } from "@/utils/openai";

export default function VocabGen() {
  const [vocabWord, setVocabWord] = useState<string>("hello world");
  const [vocabWordDefinition, setVocabWordDefinition] = useState<string>(
    "even more hello world",
  );
  // three states: off, recording, recordingPaused
  const [microphoneState, setMicrophoneState] = useState<string>("off");
  const [microphoneBool, setMicrophoneBool] = useState<boolean>(false);
  const [currentAudioBlob, setCurrentAudioBlob] = useState<Blob | null>(null);
  const [currentAudioRecording, setCurrentAudioRecording] =
    useState<HTMLAudioElement | null>(null);
  const [timesPronouncedCorrect, setTimesPronouncedCorrect] =
    useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
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

  useEffect(() => {}, [vocabWord, vocabWordDefinition]);

  useEffect(() => {
    if (microphoneBool) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [microphoneBool]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  const stopRecording = async () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setCurrentAudioBlob(blob);
        audioChunksRef.current = [];
        const audioFile = new File([blob], "audio.wav", { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", audioFile);
        const transcription = await axios.post("/api/transcribe", formData);
        console.log(transcription);
      };
    }
  };
  const handleToggle = (microphoneBool: boolean) => {
    setMicrophoneBool(microphoneBool);
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
          <div className="flex-cols-2 flex justify-center justify-items-center p-8">
            <Button onClick={() => generateVocab()}> Generate </Button>
            <Switch
              name="MicToggle"
              checked={microphoneBool}
              onCheckedChange={handleToggle}
            >
              <Label htmlFor="airplane-mode">
                Microphone {microphoneBool ? "on" : "off"}
                {microphoneBool ? <Mic /> : <MicOff />}
              </Label>
            </Switch>
            {microphoneBool ? <Mic /> : <MicOff />}
          </div>
        </div>
        {currentAudioBlob && (
          <audio controls src={URL.createObjectURL(currentAudioBlob)}>
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
      {!microphonePermissions && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center backdrop-blur-xl transition-all ease-in-out"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-white text-xl">Please enable mic permissions.</p>
        </div>
      )}
    </div>
  );
}

/*
const microphoneToggledOn = async () => {
  console.log("microphone toggled on");
  try {
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
    mediaRecorder.current!.onstop = async () => {
      try {
        const audioBlob = new Blob(audioBlobs, { type: "audio/wav" });
        /*
        const formData = new FormData();
        formData.append("file", audioBlob);

        const transcription = await axios.post(
          "/api/transcribe",
          formData,
          {},
        );

        const audioFile = new File([audioBlob], "audio.wav", {
          type: "audio/wav",
        });
        const transcriptionText = await transcribeUtil(audioFile);
        //const transcriptionText = transcription.data.transcription;
        console.log("transcription", transcriptionText);

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
  } catch (error) {
    console.error(error);
  }
};

const microphoneToggledOff = async () => {
  console.log("microphone toggled off");
  mediaRecorder.current!.stop();
};
*/
