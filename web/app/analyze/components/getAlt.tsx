import { generateAlt } from "../functions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GeneratedAlt } from "./generatedAlt";
import { ScraperImage } from "@/types/types";

export async function GetAlt({
  image,
  index,
}: {
  image: ScraperImage;
  index: number;
}) {
  const completion = await generateAlt(image);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image #{index}</CardTitle>
        <CardDescription>Original Alt: {image.alt}</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <div className="flex gap-4">
          <div>
            <img
              src={image.src}
              className="object-cover aspect-square rounded-md"
              alt={image.alt}
              width={150}
              height={150}
            />
          </div>
          <GeneratedAlt src={image.src} alt={completion} />
        </div>
      </CardContent>
    </Card>
  );
}
