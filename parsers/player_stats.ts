import * as cheerio from "cheerio";

async function getPlayerPage(playerName: string) {
  const url = `https://warthunder.ru/ru/community/userinfo/?nick=${playerName}`;

  const response: any = await fetch(url, { method: "GET" });
  const text = await response.text();
  const $ = cheerio.load(text);

  console.log($.html());
}

getPlayerPage("Rat");
