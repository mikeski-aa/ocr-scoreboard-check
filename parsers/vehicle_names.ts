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
        let newItem = {
          name: item,
          rating: "10.7",
        };
        return newItem;
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
  let detailedArray: any = await getVehiclesAndRatingsForEachNation();
  console.log("detaield array is ");
  console.log(detailedArray);
  detailedArray = await filterSavedFile(detailedArray);
  detailedArray = await checkDuplicateWithDifferentNations(detailedArray);
  detailedArray = replaceQuotes(detailedArray);
  detailedArray = detailedArray.sort((a: any, b: any) => {
    if (a.name < b.name) {
      return -1;
    }

    if (b.name < a.name) {
      return 1;
    }

    return 0;
  });
  const csvWriter = createObjectCsvWriter({
    path: "./public/vehicleCSVnew.csv",
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

  await Papa.parse(csvString, {
    header: true,
    delimiter: ";",
    complete: (results) => {
      console.log("parsed successfully");
      // console.log(results.data);
      // filteredSavedFile only works on .name and .rating,
      //needs to be changed to .NAME and .RATING to be used with
      // parsed data
      // replaceQuotes(results.data);

      return results.data;
    },
  });
}

// let's think how we can break this down
// 1. we need to find everything with nations in brackets
// 2. we should check if there are any duplicates in the bracket results i.e A6M2 (USA) and A6M2 (CHINA)
// 3. need to check duplicates vs original list and fix it there too.

// this function can be used when parsing the file directly after getting all info.
// what this function does is it checks for redundant bracketed names and removes them.
async function filterSavedFile(vehicles: any) {
  let currentVehicles = [...vehicles];
  const regex =
    /\((Sweden|France|Japan|USSR|IAF|Germany|China|USA|USMC|Great Britain|Israel|Italy)\)/g;

  const filteredBracket = currentVehicles.filter((item: any) =>
    item.name.match(regex)
  );

  console.log(filteredBracket);

  // what I want to do next is split the ().
  // then let's go through original array and find every item that has a bracket, but only exists once.
  // we can then edit and remove the pointless bracket.

  for (let x = 0; x < filteredBracket.length; x++) {
    const splitName = filteredBracket[x].name.split(" (");

    const singleMatch: any = currentVehicles.filter(
      (item: any) =>
        item.name.includes(splitName[0]) &&
        item.rating === filteredBracket[x].rating
    );

    console.log("single match format");
    console.log(singleMatch);

    // if filteres length is 1, it means that no other instance of this exists and the brackets are redundant.
    if (singleMatch.length === 1) {
      // console.log(singleMatch);
      currentVehicles = currentVehicles.filter(
        (item) => item.name != singleMatch[0].name
      );
      currentVehicles.push({
        name: splitName[0],
        rating: filteredBracket[x].rating,
      });
    }
  }

  // purely for logging purposes

  for (let y = 0; y < currentVehicles.length; y++) {
    console.log(currentVehicles[y]);
  }

  console.log("current vehicles & original length compare");
  console.log(currentVehicles.length);
  console.log(vehicles.length);

  return currentVehicles;
}

async function checkDuplicateWithDifferentNations(vehicles: any) {
  let currentVehicles = [...vehicles];
  const regex =
    /\((Sweden|France|Japan|USSR|IAF|Germany|China|USA|USMC|Great Britain|Israel|Italy)\)/g;

  const findBracket = currentVehicles.filter((item: any) =>
    item.name.match(regex)
  );

  // now for each item we want to find uniques:
  for (let x = 0; x < findBracket.length; x++) {
    const splitName = findBracket[x].name.split(" (");
    const duplicates = currentVehicles.filter(
      (item: any) =>
        !(
          item.name.split(" (")[0] === splitName[0] &&
          item.rating === findBracket[x].rating
        )
    );
    const replacementItem = {
      name: splitName[0],
      rating: findBracket[x].rating,
    };

    duplicates.push(replacementItem);
    currentVehicles = duplicates;
  }

  // purely for logging to see diff
  console.log("current vehicles & original length compare");
  console.log(currentVehicles.length);
  console.log(vehicles.length);

  return currentVehicles;
}

function replaceQuotes(vehicles: any) {
  const currentVehicles = vehicles;

  const filtered = currentVehicles.filter((item: any) =>
    item.name.includes('"')
  );

  const quotelessList = currentVehicles.filter(
    (item: any) => !item.name.includes('"')
  );

  for (let x = 0; x < filtered.length; x++) {
    filtered[x].name = filtered[x].name.replace(/"/g, "");
    quotelessList.push(filtered[x]);
  }

  return quotelessList;
}

// parseSavedFile();
saveToCSV();
