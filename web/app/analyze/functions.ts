"use server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";

export async function generateAlt(image: { src: string; alt: string }) {
  const result = await streamText({
    model: openai("gpt-4-turbo"),
    maxTokens: 2000,
    messages: [
      {
        role: "user",
        content:
          "Genera una descripción alternativa para esta imagen de no mas de 15 palabras",
      },
      {
        role: "user",
        content: [
          {
            type: "image",
            image: image.src,
          },
        ],
      },
    ],
  });

  return createStreamableValue(result.textStream).value;
}
