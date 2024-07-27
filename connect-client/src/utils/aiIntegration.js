import Groq from "groq-sdk";
import { GROQ_API, } from "./apiEndpoints";

const performAiIntegration = async (audioFile) => {
    console.log(audioFile)
  const groq = new Groq({ apiKey: GROQ_API , dangerouslyAllowBrowser: true });

  const transcription = await groq.audio.transcriptions.create({
    file: audioFile,
    model: "whisper-large-v3",
    prompt: "Specify context or spelling", // Optional
    response_format: "json", // Optional
    language: "en", // Optional
    temperature: 0.0, // Optional
  });
  console.log(transcription);
  return transcription.text
};
export { performAiIntegration };
