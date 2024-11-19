import * as cheerio from "cheerio";
import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";
import path from "node:path";
import Papa from "papaparse";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nations = [
  {
    urlName: "USA_aircraft",
    country: "USA",
  },
  {
    urlName: "Britain_aircraft",
    country: "Britain",
  },
  {
    urlName: "Germany_aircraft",
    country: "Germany",
  },
  {
    urlName: "USSR_aircraft",
    country: "USSR",
  },
  {
    urlName: "China_aircraft",
    country: "China",
  },
  {
    urlName: "Japan_aircraft",
    country: "Japan",
  },
  {
    urlName: "Italy_aircraft",
    country: "Italy",
  },
  {
    urlName: "France_aircraft",
    country: "France",
  },
  {
    urlName: "Sweden_aircraft",
    country: "Sweden",
  },
  {
    urlName: "Israel_aircraft",
    country: "Israel",
  },
];

// returns array of all vehicles from vehicle list
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
    return array;
  } catch (error) {
    console.log(error);
  }
}

// converts empty spaces to underscores
function urlNameConvert(name: string) {
  const splitName = name.split(" ");
  let joinName = splitName.join("_");

  return joinName;
}

// get specific plane battle rating
async function getSpecificDetails(vehicleName: string) {
  const formattedName = urlNameConvert(vehicleName);

  const url = `https://wiki.warthunder.com/${formattedName}`;

  try {
    const response = await fetch(url, { method: "GET" });
    const text: any = await response.text();

    const $ = cheerio.load(text, { decodeEntities: false });

    const rating = $(
      "#mw-content-text > div.mw-parser-output > div.specs_card_main > div.specs_card_main_info > div.general_info_2 > div.general_info_br > table > tbody > tr:nth-child(2) > td:nth-child(2)"
    ).html();

    const vehicle = {
      name: vehicleName,
      rating: rating,
    };

    console.log(vehicle);
    return vehicle;
  } catch (error) {
    console.log(error);
  }
}

async function getVehiclesAndRatingsForEachNation() {
  const detailedArray: any = [];

  for (let x = 0; x < nations.length; x++) {
    const vehicles = await getVehicleListForNation(
      nations[x].urlName,
      nations[x].country
    );

    const promises: any = vehicles?.map(async (item) => {
      if (item === "MQ-1" || item === "Orion" || item === "Wing Loong I") {
        return;
      }

      const newItem = await getSpecificDetails(item);
      return newItem;
    });

    const results = await Promise.all(promises);

    let counter = 0;
    for (let x = 0; x < results.length; x++) {
      detailedArray.push(results[x]);
      counter += 1;
      console.log(counter);
    }
  }

  return detailedArray;
}

// save to csv
async function saveToCSV() {
  const detailedArray: any = await getVehiclesAndRatingsForEachNation();
  console.log("detaield array is ");
  console.log(detailedArray);
  const csvWriter = createObjectCsvWriter({
    path: "./wiki-parser/vehicleCSV.csv",
    header: [
      { id: "name", title: "NAME" },
      { id: "rating", title: "RATING" },
    ],
    headerIdDelimiter: ";",
    fieldDelimiter: ";",
  });

  csvWriter.writeRecords(detailedArray).then(() => console.log("Done writing"));
}

async function parseSavedFile() {
  const filePath = path.resolve(__dirname, "../public/vehicleCSV.csv");
  const csvString = fs.readFileSync(filePath, "utf8");

  Papa.parse(csvString, {
    header: true,
    delimiter: ";",
    complete: (results) => {
      console.log("parsed");
      console.log(results.data);
    },
  });
}

async function filterSavedFile(file:)



// getVehiclesAndRatingsForEachNation();

// [{
//   urlName: "USA_aircraft",
//   country: "USA",
// },
// {
//   urlName: "Britain_aircraft",
//   country: "Britain",
// },
// {
//   urlName: "Germany_aircraft",
//   country: "Germany",
// },
// {
//   urlName: "USSR_aircraft",
//   country: "USSR",
// },
// {
//   urlName: "China_aircraft",
//   country: "China",
// },
// {
//   urlName: "Japan_aircraft",
//   country: "Japan",
// },
// {
//   urlName: "Italy_aircraft",
//   country: "Italy",
// },
// {
//   urlName: "France_aircraft",
//   country: "France",
// },
// {
//   urlName: "Sweden_aircraft",
//   country: "Sweden",
// },
// {
//   urlName: "Israel_aircraft",
//   country: "Israel",
// },
// ];
