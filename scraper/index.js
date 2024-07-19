import express from "express";
import { chromium } from "playwright";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 4000;

const WhiteList = ["http://localhost:3000"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (WhiteList.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

const scrape = async (web) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(web);
  const title = await page.title();
  const url = page.url();
  const images = await page.$$eval("img", (imgs) =>
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
  return { title, url, images, description };
};

app.get("/scrape", (req, res) => {
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
