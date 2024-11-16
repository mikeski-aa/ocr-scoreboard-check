import * as cheerio from "cheerio";

async function getVehicleListForNation(targeturl: string, countryname: string) {
  const url = `https://wiki.warthunder.com/Category:${targeturl}`;

  try {
    const response: any = await fetch(url, { method: "GET" });
    const text = await response.text();
    const $ = cheerio.load(text);

    const array: string[] = [];

    for (let x = 1; x < 200; x++) {
      for (let y = 1; y < 200; y++) {
        const model = $(
          `#mw-pages > div > div > div:nth-child(${x}) > ul > li:nth-child(${y}) > a`
        )
          .text()
          .trim();

        if (model === "") {
          break;
        } else {
          array.push(model);
        }
      }
    }
    console.log("Total number of aircrafts to parse: " + array.length);
    console.log(array);
  } catch (error) {
    console.log(error);
  }
}

getVehicleListForNation("USA_aircraft", "USA");

export default getVehicleListForNation;
