import fs from "fs";
import Groq from "groq-sdk";

const performAiIntegration=async (stream)=>{

    const groq = new Groq({apiKey:process.env.GROQ_KEY});
    
    const transcription = await groq.audio.transcriptions.create({
        file: fs.createReadStream(stream),
        model: "whisper-large-v3",
        prompt: "Specify context or spelling", // Optional
        response_format: "json", // Optional
        language: "en", // Optional
        temperature: 0.0, // Optional
    });
    console.log(transcription.text);
    
}
export { performAiIntegration }