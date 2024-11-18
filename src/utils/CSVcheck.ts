import Papa from "papaparse";

export interface IVehicleData {
  name: string;
  rating: "string";
}

async function loadCSV() {
  const response = await fetch("./vehicleCSV.csv");
  const txt = await response.text();
  Papa.parse(txt, {
    header: true,
    complete: (results) => {
      console.log("parsed CSV:", results.data);

      return results.data;
    },
  });
}

function CSVcheck() {}

export default CSVcheck;
