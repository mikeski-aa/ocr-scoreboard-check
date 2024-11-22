import { SyntheticEvent, useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import { stackedElims } from "../utils/nameFilters";
import LoadingModal from "./LoadingModal";
import CSVcheck from "../utils/CSVcheck";

function checkLongerName(input: any) {
  if (!testFunc(input.words[7].text)) {
    let newWord = input.words[6].text + " " + input.words[7].text;
    return newWord;
  } else {
    return "";
  }
}

function checkForValidFormat(input: any) {
  if (input.data.lines.length < 7) {
    alert("error");
    return false;
  }
}

// filter the results
// might need to move this elsewhere
// if image is not recognised, we return error
function filterParsedResults(input: Tesseract.RecognizeResult) {
  let arrayText = [];
  let counter = 0;

  if (input.data.lines.length < 7) {
    return { arrayText: ["undefined"], itemsCounted: 0, error: false };
  }

  for (let x = 0; x < input.data.lines.length; x++) {
    // all player data starts with 0 0 0 0 0 indicating the player scores at the start of the game
    if (input.data.lines[x].text.includes("0 0")) {
      counter += 1;
      // the word data we are looking for is at index 6 of the words array within results
      if (input.data.lines[x].words[6].text.length != 1) {
        // we want to filter anything that has one word results - these normally indicate player has not loaded and the OCR has not been able to read the value.

        console.log(input.data.lines[x].words[7].text);

        if (
          input.data.lines[x].words[7].text === "109" ||
          input.data.lines[x].words[7].text === "Phantom" ||
          input.data.lines[x].words[7].text === "IDS" ||
          input.data.lines[x].words[7].text === "Harrier" ||
          input.data.lines[x].words[7].text === "Vautour" ||
          input.data.lines[x].words[7].text === "262" ||
          input.data.lines[x].words[7].text === "229"
        ) {
          let newTripleWord =
            input.data.lines[x].words[6].text +
            " " +
            input.data.lines[x].words[7].text +
            " " +
            input.data.lines[x].words[8].text;
          arrayText.push(newTripleWord);
        } else if (checkLongerName(input.data.lines[x]) != "") {
          arrayText.push(checkLongerName(input.data.lines[x]));
        } else {
          arrayText.push(input.data.lines[x].words[6].text);
        }
      }
    }
  }

  return { arrayText: arrayText, itemsCounted: counter, error: false };
}

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
    "Fy",
    "44",
    "Ai",
    "4:",
    "A",
    "-+",
    "+i",
    "41",
    "Ali",
    `“+`,
    "i",
    "413",
    "4)",
    "“+i",
  ];
  const containsSymbol = symbols.some((symbol) => input === symbol);

  console.log(containsSymbol);
  return containsSymbol;
}

const TextRecognition = ({ selectedImage }: { selectedImage: string }) => {
  const [recognizedText, setRecognizedText] = useState<any>([
    { NAME: "placeholder", RATING: "0" },
    { NAME: "placeholder", RATING: "0" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);
  const [possibleItems, setPossibleItems] = useState<number>(0);
  const [value, setValue] = useState<number>();
  const [actualParsed, setActualParsed] = useState<number>(0);
  const [displayError, setDisplayError] = useState<boolean>(false);

  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        setLoading(true);
        const result = await Tesseract.recognize(selectedImage);
        setLoading(false);

        console.log(result.data);
        if (checkForValidFormat(result)) {
          return;
        } else {
          setDisplay(true);
          const filterParse = filterParsedResults(result);

          const wordArray = filterParse.arrayText;
          setPossibleItems(filterParse.itemsCounted);
          const filteredArray: string[] = [];

          // filter the words
          for (let x = 0; x < wordArray.length; x++) {
            filteredArray.push(stackedElims(wordArray[x]));
          }

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

          // if no data is parsed, invalid data was provided
          if (checkedWithCSV.wholeArray.length === 0) {
            setDisplayError(true);
          } else {
            setDisplayError(false);
          }

          console.log("CSV CHECKED");
          console.log(checkedWithCSV);
        }
      }
    };
    recognizeText();
  }, [selectedImage]);

  const handleInputChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(+target.value);
  };

  const calculateTier = () => {
    if (value) {
      if (+recognizedText[0].RATING > +value) {
        console.log("uptier detected");
        let difference = +recognizedText[0].RATING - +value;
        let rounded = Math.round(difference * 100) / 100;
        return `Uptier detected: +${rounded}`;
      } else {
        console.log("downtier detected");
        let difference =
          +value - +recognizedText[recognizedText.length - 1].RATING;
        let rounded = Math.round(difference * 100) / 100;
        return `Downtier detected: -${rounded}`;
      }
    }
  };
  return (
    <div className="imgRecogResultDiv">
      <LoadingModal state={loading} />
      {display && !displayError ? (
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
            {recognizedText.length > 3 ? (
              <h4>
                Rating range: {recognizedText[0].RATING} -
                {recognizedText[recognizedText.length - 1].RATING}
              </h4>
            ) : null}

            <label>Input your BR</label>
            <input
              type="number"
              className="brInput"
              onChange={(e) => handleInputChange(e)}
              value={value}
            ></input>
            <div className="relativeBR">{calculateTier()}</div>
            <div className="parsedCompare">Items detected: {possibleItems}</div>
            <div>Items parsed: {actualParsed}</div>
            <div className="parsePercent">
              {(Math.round((actualParsed / possibleItems) * 100) / 100) * 100}%
              of items succesfully parsed
            </div>
          </div>
        </div>
      ) : (
        <div className="errMsg">
          <div className="errText">
            Error parsing the image. Make sure the screenshot is from Air RB at
            the START of the game. Check the HOW TO if you need more help.
          </div>
        </div>
      )}
    </div>
  );
};
export default TextRecognition;
