import * as cheerio from "cheerio";
import puppeteer, { PuppeteerError } from "puppeteer";
import UserAgent from "user-agents";

async function getPlayerPage(playerName: string) {
  const url = `https://warthunder.ru/ru/community/userinfo/?nick=Rat`;
  const userAgent = new UserAgent();
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(userAgent.random().toString());
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  page.setDefaultNavigationTimeout(60000);
  await page.waitForSelector(
    "#bodyRoot > div.content > div:nth-child(2) > div:nth-child(3) > div > section > div.user-info > div.user-profile > ul > li:nth-child(3)"
  );

  const content = await page.content();
  const $ = cheerio.load(content);

  console.log($.html());
}

getPlayerPage("Rat");
