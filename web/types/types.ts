export interface ScrapeResponse {
  title: string;
  description: string;
  images: ScraperImage[];
  url: string;
}

export interface ScraperImage {
  src: string;
  alt: string;
}
