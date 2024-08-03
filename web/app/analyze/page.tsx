export const revalidate = 1800;
import { Suspense } from "react";
import { GetAlt } from "./components/getAlt";
import { getSeo } from "@/services/scraper-service";
import { CardImageLoader } from "./components/loader";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Analyze({
  searchParams,
}: {
  searchParams: { url: string; page: number };
}) {
  const { url, page = 1 } = searchParams;
  const currentPage = Number(page);
  const seo = await getSeo(url, currentPage);
  const { images, totalPages } = seo.imagesInfo;

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
        {images.map((image, index) => (
          <Suspense
            key={image.src}
            fallback={
              <CardImageLoader
                image={image}
                index={(page - 1) * 5 + index + 1}
              />
            }
          >
            <GetAlt image={image} index={(page - 1) * 5 + index + 1} />
          </Suspense>
        ))}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/analyze?url=${url}&page=${currentPage - 1}`}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink href={`/analyze?url=${url}&page=${index + 1}`}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={`/analyze?url=${url}&page=${currentPage + 1}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
  );
}
