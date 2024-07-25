import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardImageLoader({ src, alt }: { src: string; alt: string }) {
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
              className="object-cover aspect-square rounded-md"
              alt={alt}
              width={150}
              height={150}
            />
          </div>
          <div className="flex flex-col h-full">
            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
              Generated Alt:
            </h4>
            <p className="text-balance scroll-m-20">...Generating</p>
            <Button className="mt-auto w-fit">Improve Alt</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
