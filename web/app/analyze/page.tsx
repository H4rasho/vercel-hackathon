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
      <section>
        {seo.images.map(({ src, alt }) => (
          <GetAlt src={src} alt={alt} />
        ))}
      </section>
    </main>
  );
}
