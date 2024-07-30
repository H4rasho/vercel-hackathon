"use server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { ScraperImage } from "@/types/types";

export async function generateAlt(image: ScraperImage) {
  try {
    const { text } = await generateText({
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

    return text;
  } catch (error) {
    return "Error generating alt";
  }
}

export async function convertToBase64(imageUrl: string): Promise<string> {
  // Fetch the image from the URL
  const response = await fetch(imageUrl);
  // Ensure the response is OK
  if (!response.ok) {
    throw new Error("Failed to fetch image.");
  }
  // Get the image as a Blob
  const blob = await response.blob();
  // Convert the Blob to a base64 string
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
