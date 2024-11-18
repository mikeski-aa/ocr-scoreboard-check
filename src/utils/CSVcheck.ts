import Papa from "papaparse";

export interface IVehicleData {
  NAME: string;
  RATING: string;
}

async function loadCSV() {
  const response = await fetch("./vehicleCSV.csv");
  const txt = await response.text();
  let result: IVehicleData[] | any = [];
  Papa.parse(txt, {
    header: true,
    complete: (results) => {
      console.log("parsed CSV:", results.data);

      result = results.data;
    },
  });

  return result;
}

async function CSVcheck(inputArray: string[]) {
  const loadedCSV: IVehicleData[] = await loadCSV();
  console.log(inputArray);
  let newArray = [];

  for (let x = 0; x < inputArray.length; x++) {
    const filteredResult = loadedCSV.filter(
      (item) => item.NAME === inputArray[x]
    );

    // fixing putting errors into the thing
    if (filteredResult.length != 0) {
      console.log(filteredResult);
      newArray.push(filteredResult[0]);
    }
  }

  let OrderedNumbers = [];

  for (let x = 0; x < newArray.length; x++) {
    OrderedNumbers.push(+newArray[x].RATING);
  }

  console.log(OrderedNumbers.sort());

  const maxRating = OrderedNumbers[OrderedNumbers.length - 1];
  const minRating = OrderedNumbers[0];
  console.log(newArray);

  const ratingResults = {
    maxrating: maxRating,
    minrating: minRating,
    wholeArray: newArray,
  };
  return ratingResults;
}

export default CSVcheck;
