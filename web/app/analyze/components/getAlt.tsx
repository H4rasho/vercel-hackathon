"use client";

import { readStreamableValue } from "ai/rsc";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateAlt } from "../functions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function GetAlt({ src, alt }: { src: string; alt: string }) {
  const [completion, setCompletion] = useState("");
  const [loading, setLoading] = useState(false);

  const getCompletion = async (image: { src: string; alt: string }) => {
    setLoading(true);
    const streamableCompletion = await generateAlt(image);
    for await (const text of readStreamableValue(streamableCompletion)) {
      setCompletion(text ?? "");
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>Original Alt: {alt}</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <div className="flex gap-4">
          <div>
            <img
              src={src}
              className="h-200 w-200 object-cover aspect-square rounded-md"
              alt={alt}
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col h-full">
            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
              Generated Alt:
            </h4>
            <p className="text-balance scroll-m-20">{completion}</p>
            <Button
              className="mt-auto w-fit"
              disabled={loading}
              onClick={() =>
                getCompletion({
                  src,
                  alt,
                })
              }
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Improve Alt
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
