"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateAlt } from "../functions";
import { Loader2 } from "lucide-react";
import { ScraperImage } from "@/types/types";

export function GeneratedAlt(image: ScraperImage) {
  const [generatedAlt, setGeneratedAlt] = useState(image.alt);
  const [loading, setLoading] = useState(false);

  const completion = async () => {
    setLoading(true);
    const generatedAlt = await generateAlt(image);
    setGeneratedAlt(generatedAlt);
    console.log("Generated alt:", generatedAlt);
    setLoading(false);
  };
  return (
    <div className="flex flex-col h-full">
      <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
        Generated Alt:
      </h4>
      <p className="text-balance scroll-m-20">{generatedAlt}</p>
      <Button className="mt-auto w-fit" onClick={completion}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? "Generating" : "Improve Alt"}
      </Button>
    </div>
  );
}
