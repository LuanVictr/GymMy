import { Request, Response } from "express";
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const apikey = process.env.OPENAI_KEY;

const openai = new OpenAI({apiKey: apikey});

async function GenerateAnswer(question?: string, prevMessages?: []) {
  const payload: OpenAI.ChatCompletionCreateParamsNonStreaming = {
    messages: [
      {
        role: "system",
        content:
          "You are a exercise assistant ready to ask questions about gym, exercises and fitness lifestyle. Answer like a professional and be brief. Use the most updated information and always explain how to do the exercises, treat people like they are a beginer. Use neutral languagde. give brief answers and talk in portuguese, format the answer in html",
      },
    ],
    model: "gpt-3.5-turbo",
  };

  if (question) {
    payload.messages.push({ role: "user", content: question });
  }

  const completion = await openai.chat.completions.create(payload);

  return completion.choices[0].message.content;
}

export default GenerateAnswer;