export interface ScrapeResponse {
  title: string;
  description: string;
  images: {
    src: string;
    alt: string;
  }[];
  url: string;
}
