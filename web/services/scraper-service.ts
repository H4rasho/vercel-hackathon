import config from "@/config";
import { ScrapeResponse } from "@/types/types";

const { API_SCRAPER } = config;

export async function getSeo(url: string): Promise<ScrapeResponse> {
  const endpoint = `${API_SCRAPER}/scraper?web=${url}`;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
    });
    const json = (await response.json()) as ScrapeResponse;
    return json;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener datos");
  }
}
