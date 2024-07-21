import { GetAlt } from "./components/getAlt";
import { getSeo } from "@/services/scraper-service";

export default async function Analyze({
  searchParams,
}: {
  searchParams: { url: string };
}) {
  const { url } = searchParams;
  const seo = await getSeo(url);

  return (
    <main>
      <p>
        Analizando pagina <strong>{url}</strong>
      </p>
      <h1>{seo.title}</h1>
      <p>{seo.description}</p>
      <section className="flex flex-col gap-4">
        <h2 className="mt-10 scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Images
        </h2>
        {seo.images.map(({ src, alt }) => (
          <GetAlt src={src} alt={alt} />
        ))}
      </section>
    </main>
  );
}
