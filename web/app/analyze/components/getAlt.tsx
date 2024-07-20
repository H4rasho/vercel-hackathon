"use client";

import { readStreamableValue } from "ai/rsc";
import { useState } from "react";
import { generateAlt } from "../functions";

export function GetAlt({ src, alt }: { src: string; alt: string }) {
  const [completion, setCompletion] = useState("");

  const getCompletion = async (image: { src: string; alt: string }) => {
    const streamableCompletion = await generateAlt(image);
    for await (const text of readStreamableValue(streamableCompletion)) {
      setCompletion(text ?? "");
    }
  };
  return (
    <div className="flex gap-3">
      <form>
        <img
          src={src}
          className="object-contain"
          alt={alt}
          width={200}
          height={200}
        />
        <p>{alt}</p>
      </form>
      <button
        className="bg-sky-400 text-white"
        onClick={() =>
          getCompletion({
            src,
            alt,
          })
        }
      >
        Improve Alt
      </button>
      <p>{completion}</p>
    </div>
  );
}
