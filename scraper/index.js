import express from "express";
import { chromium } from "playwright";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 4000;

const scrape = async (web) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(web);
  const title = await page.title();
  const url = page.url();
  const pageImages = await page.$$eval("img", (imgs) =>
    imgs.map((img) => {
      return {
        src: img.src,
        alt: img.alt,
      };
    }),
  );

  const description = await page.$eval(
    "meta[name='description']",
    (meta) => meta.content,
  );
  await browser.close();

  const uniqueImages = new Map(pageImages.map((image) => [image.src, image]));
  const images = Array.from(uniqueImages.values());

  return { title, url, images, description };
};

app.get("/scraper", (req, res) => {
  const { web } = req.query;
  if (!web) {
    return res.status(400).json({ message: "Please provide a web url" });
  }
  scrape(web)
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
