import React, { useState } from "react";

import { useCSVReader } from "react-papaparse";

function parseData(input: string[]) {
  const newArray: string[] = [];

  input.forEach((item) => {
    const filtered = newArray.filter((filter) => filter === item[1]);
    if (filtered.length > 0) {
      return;
    } else {
      newArray.push(item[1]);
    }
  });

  // this doesnt get the BRs so it is kinda useless... need to get the data differently.
  // use the original parser to get list of planes and BRs
  return newArray;
}

function CSVReader() {
  const { CSVReader } = useCSVReader();
  const [parsedvals, setParsedVals] = useState<string[]>([]);

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        console.log("---------------------------");
        console.log(results.data);

        setParsedVals(parseData(results.data));

        console.log("---------------------------");
      }}
    >
      {({ getRootProps, acceptedFile, getRemoveFileProps }: any) => (
        <>
          <div>
            <button type="button" {...getRootProps()}>
              Add CSV file
            </button>
            <div>{acceptedFile && acceptedFile.name}</div>
            <button {...getRemoveFileProps()}>Remove</button>
            <table className="mess">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {parsedvals.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </CSVReader>
  );
}

export default CSVReader;
