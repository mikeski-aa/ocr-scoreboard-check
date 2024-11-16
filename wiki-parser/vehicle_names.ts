import * as cheerio from "cheerio";
import * as fs from "fs";
import { createObjectCsvWriter } from "csv-writer";
import { CsvWriter } from "csv-writer/src/lib/csv-writer";

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
async function getSpecificDetails(vehicleName) {
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

  nations.forEach(async (nation) => {
    const vehicles = await getVehicleListForNation(
      nation.urlName,
      nation.country
    );
    vehicles?.forEach(async (vehicle) => {
      if (
        vehicle === "MQ-1" ||
        vehicle === "Orion" ||
        vehicle === "Wing Loong I"
      ) {
        return;
      }

      const newItem = await getSpecificDetails(vehicle);
      detailedArray.push(newItem);
    });
  });

  console.log("detailed array is: ");
  console.log(detailedArray);
}

// for single nation function
async function produceDetailedArray() {
  const detailedArray: any = [];

  const vehicles = await getVehicleListForNation("Sweden_aircraft", "Sweden");

  // this needs to be resolved as promises otherwise we create empty CSV
  const promises: any = vehicles?.map(async (vehicle) => {
    if (
      vehicle === "MQ-1" ||
      vehicle === "Orion" ||
      vehicle === "Wing Loong I"
    ) {
      return;
    }

    const newItem = await getSpecificDetails(vehicle);
    return newItem;
  });

  const results = await Promise.all(promises);

  results.forEach((item) => {
    detailedArray.push(item);
  });

  return detailedArray;
}

// save to csv
async function saveToCSV() {
  const detailedArray: any = await produceDetailedArray();
  console.log("detaield array is ");
  console.log(detailedArray);
  const csvWriter = createObjectCsvWriter({
    path: "./wiki-parser/vehicleCSV.csv",
    header: [
      { id: "name", title: "NAME" },
      { id: "rating", title: "RATING" },
    ],
  });

  csvWriter.writeRecords(detailedArray).then(() => console.log("Done writing"));
}

saveToCSV();

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
