"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";

const formSchema = z.object({
  input: z.string(),
});

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

export default function SimpleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      /*
      const aiResponse = await axios.post("/api/respond", {
        input: values.input,
        prompt: "",
      });
      */
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: values.input }),
      });
      if (!response.ok) {
        throw new Error("respnse not ok");
      }
      const reader = response.body!.getReader();
      const audioContext = new window.AudioContext();
      const sourceNode = audioContext.createBufferSource();
      let audioBuffer = null;

      await streamAudio(reader, audioBuffer, audioContext, sourceNode);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h1>THIS IS TESTING TEXT TO SPEECH</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center items-center"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="hello world" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">poll response</Button>
        </form>
      </Form>
    </div>
  );
}
