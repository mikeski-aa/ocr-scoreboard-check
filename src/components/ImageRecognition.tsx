import { SyntheticEvent, useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import { stackedElims } from "../utils/nameFilters";
import LoadingModal from "./LoadingModal";
import CSVcheck from "../utils/CSVcheck";

// filter the results
// might need to move this elsewhere
const filterParsedResults = (input: Tesseract.RecognizeResult) => {
  let arrayText = [];
  let counter = 0;
  for (let x = 0; x < input.data.lines.length; x++) {
    // all player data starts with 0 0 0 0 0 indicating the player scores at the start of the game
    if (input.data.lines[x].text.includes("0 0")) {
      counter += 1;
      // the word data we are looking for is at index 6 of the words array within results
      if (input.data.lines[x].words[6].text.length != 1) {
        // we want to filter anything that has one word results - these normally indicate player has not loaded and the OCR has not been able to read the value.
        arrayText.push(input.data.lines[x].words[6].text);
        console.log(input.data.lines[x].words[7].text);

        if (!testFunc(input.data.lines[x].words[7].text)) {
          let newWord =
            input.data.lines[x].words[6].text +
            " " +
            input.data.lines[x].words[7].text;
          arrayText.push(newWord);
        }

        if (input.data.lines[x].words[7].text === "109") {
          let newTripleWord =
            input.data.lines[x].words[6].text +
            " " +
            input.data.lines[x].words[7].text +
            " " +
            input.data.lines[x].words[8].text;
          arrayText.push(newTripleWord);
        }
      }
    }
  }

  return { arrayText: arrayText, itemsCounted: counter };
};

// this function tests for common OCR misinterpretations
function testFunc(input: string) {
  let symbols = [
    "iil",
    "+",
    "A!",
    "Ai)",
    "yl",
    "Al",
    "+",
    "Ai)",
    "4",
    "®",
    "[4",
    "L4",
  ];
  const containsSymbol = symbols.some((symbol) => input === symbol);

  console.log(containsSymbol);
  return containsSymbol;
}

const TextRecognition = ({ selectedImage }: { selectedImage: string }) => {
  const [recognizedText, setRecognizedText] = useState<any>([
    { NAME: "placeholder", RATING: "0" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);
  const [possibleItems, setPossibleItems] = useState<number>(0);
  const [value, setValue] = useState<number>();
  const [numberDetected, setNumberDetected] = useState<number>(0);
  const [actualParsed, setActualParsed] = useState<number>(0);

  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        setLoading(true);
        const result = await Tesseract.recognize(selectedImage);
        setLoading(false);
        setDisplay(true);
        console.log(result.data);

        const filterParse = filterParsedResults(result);
        const wordArray = filterParse.arrayText;
        setPossibleItems(filterParse.itemsCounted);
        const filteredArray: string[] = [];

        // filter the words
        for (let x = 0; x < wordArray.length; x++) {
          filteredArray.push(stackedElims(wordArray[x]));
        }

        setNumberDetected(filteredArray.length);
        const checkedWithCSV = await CSVcheck(filteredArray);
        let sortedArray = checkedWithCSV.wholeArray.sort((a: any, b: any) => {
          if (+a.RATING < +b.RATING) {
            return 1;
          }

          if (+b.RATING < +a.RATING) {
            return -1;
          }

          return 0;
        });
        setRecognizedText(sortedArray);
        setActualParsed(checkedWithCSV.wholeArray.length);
        console.log("CSV CHECKED");
        console.log(checkedWithCSV);
      }
    };
    recognizeText();
  }, [selectedImage]);

  const handleInputChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(+target.value);
  };
  return (
    <div>
      <LoadingModal state={loading} />
      {display ? (
        <>
          <div className="sideBySide">
            <div className="detectedPlanes">
              <h4>Detected planes:</h4>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {recognizedText.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item.NAME}</td>
                      <td>{item.RATING}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="inputDiv">
              <h4>
                Rating range: {recognizedText[0].RATING} -{" "}
                {recognizedText[recognizedText.length - 1].RATING}
              </h4>
              <label>Input your BR</label>
              <input
                type="number"
                className="brInput"
                onChange={(e) => handleInputChange(e)}
                value={value}
              ></input>
              <div className="parsedCompare">
                Items detected: {possibleItems}
              </div>
              <div>Items parsed: {actualParsed}</div>
              <div className="parsePercent">
                {(Math.round((actualParsed / possibleItems) * 100) / 100) * 100}
                % of items succesfully parsed
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default TextRecognition;
