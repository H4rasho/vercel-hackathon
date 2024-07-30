export const revalidate = 0;
import { Suspense } from "react";
import { GetAlt } from "./components/getAlt";
import { getSeo } from "@/services/scraper-service";
import { CardImageLoader } from "./components/loader";

export default async function Analyze({
  searchParams,
}: {
  searchParams: { url: string; page: number };
}) {
  const { url, page = 0 } = searchParams;
  const seo = await getSeo(url);
  const images = seo.images.slice(0, 5);

  return (
    <main>
      <section>
        <h2 className="mt-10 scroll-m-20 border-b  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Website Info
        </h2>
        <div className="py-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Title
          </h3>
          <p className="leading-7">{seo.title}</p>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Description
          </h3>
          <p className="leading-7">{seo.description}</p>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="mt-10 scroll-m-20 border-b pb-2  text-3xl font-semibold tracking-tight transition-colors ">
          Founded Images
        </h2>
        {images.map(({ src, alt }) => (
          <Suspense
            key={src}
            fallback={<CardImageLoader src={src} alt={alt} />}
          >
            <GetAlt src={src} alt={alt} />
          </Suspense>
        ))}
      </section>
    </main>
  );
}
