import express from "express";
import { chromium } from "playwright";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 4000;
const OFFSET = 5;

const scrape = async (web, page) => {
  const browser = await chromium.launch();
  const webPage = await browser.newPage();
  await webPage.goto(web, { waitUntil: "domcontentloaded" });
  const title = await webPage.title();
  const url = webPage.url();
  const pageImages = await webPage.$$eval("img", (imgs) =>
    imgs.map((img) => {
      return {
        src: img.src,
        alt: img.alt,
      };
    }),
  );

  const description = await webPage.$eval(
    "meta[name='description']",
    (meta) => meta.content,
  );
  await browser.close();

  const uniqueImages = new Map(pageImages.map((image) => [image.src, image]));
  const images = Array.from(uniqueImages.values()).slice(
    (page - 1) * OFFSET,
    page * OFFSET,
  );

  return {
    title,
    url,
    imagesInfo: {
      images,
      totalImages: uniqueImages.size,
      totalPages: Math.ceil(uniqueImages.size / OFFSET),
    },
    description,
  };
};

app.get("/scraper", (req, res) => {
  const { web, page = 1 } = req.query;
  if (!web) {
    return res.status(400).json({ message: "Please provide a web url" });
  }
  scrape(web, page)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
