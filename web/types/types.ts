export interface ScrapeResponse {
  title: string;
  description: string;
  imagesInfo: ImagesInfo;
  url: string;
}

export interface ImagesInfo {
  images: ScraperImage[];
  totalImages: number;
  totalPages: number;
}

export interface ScraperImage {
  src: string;
  alt: string;
}
