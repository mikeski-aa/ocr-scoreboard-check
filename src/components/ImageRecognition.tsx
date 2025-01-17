import { SyntheticEvent, useContext, useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import LoadingModal from "./LoadingModal";
import CSVcheck from "../utils/CSVcheck";
import { defaultSessionState, SessionContext } from "../App";
import { excpNames, symbols } from "../utils/utilValues";
import { newStackedElims } from "../utils/newNameFilters";

// the maximum "words" that can be had is 5
// this function is rather ugly but I am not picturing a simpler way of writing this at this moment
function checkLongerName(input: any) {
  if (
    excpNames.some((name) => name === input.words[6].text) &&
    input.words[7].text === "A"
  ) {
    return `${input.words[6].text} A`;
  }

  if (!testFunc(input.words[7].text)) {
    if (!testFunc(input.words[8].text)) {
      if (!testFunc(input.words[9].text)) {
        if (!testFunc(input.words[10].text)) {
          let newWord =
            input.words[6].text +
            " " +
            input.words[7].text +
            " " +
            input.words[8].text +
            " " +
            input.words[9].text +
            " " +
            input.words[10].text;
          return newWord;
        }
        let newWord =
          input.words[6].text +
          " " +
          input.words[7].text +
          " " +
          input.words[8].text +
          " " +
          input.words[9].text;
        return newWord;
      }
      let newWord =
        input.words[6].text +
        " " +
        input.words[7].text +
        " " +
        input.words[8].text;
      return newWord;
    }
    let newWord = input.words[6].text + " " + input.words[7].text;
    return newWord;
  } else {
    return "";
  }
}

function checkForValidFormat(input: any) {
  if (input.data.lines.length < 7) {
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

        if (checkLongerName(input.data.lines[x]) != "") {
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
  const containsSymbol = symbols.some((symbol) => input === symbol);

  // console.log(containsSymbol);
  return containsSymbol;
}

const TextRecognition = ({ selectedImage }: { selectedImage: string }) => {
  const sessionContext = useContext(SessionContext);
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
  const [displayTierText, setDisplayTierText] = useState<string>("");

  const brRange: number[] = [
    1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 4.3, 4.7, 5.0, 5.3, 5.7,
    6.0, 6.3, 6.7, 7.0, 7.3, 7.7, 8.0, 8.3, 8.7, 9.0, 9.3, 9.7, 10.0, 10.3,
    10.7, 11.0, 11.3, 11.7, 12.0, 12.3, 12.7, 13.0, 13.3, 13.7, 14.0,
  ];

  // reset image test
  useEffect(() => {
    if (sessionContext.midReset) {
      setDisplayTierText("");
      setDisplayError(false);
      setActualParsed(0);
      setValue(0);
      setPossibleItems(0);
      setDisplay(false);
      setLoading(false);
      setRecognizedText([
        { NAME: "placeholder", RATING: "0" },
        { NAME: "placeholder", RATING: "0" },
      ]);
      sessionContext.setMidReset(false);
      sessionContext.setSessionInfo(defaultSessionState);
    }
  }, [sessionContext.midReset]);

  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        setLoading(true);
        const result = await Tesseract.recognize(selectedImage);
        setLoading(false);
        console.clear();
        console.log(result.data);
        if (checkForValidFormat(result)) {
          return;
        } else {
          setDisplay(true);
          const filterParse = filterParsedResults(result);
          console.log(filterParse);
          const wordArray = filterParse.arrayText;
          setPossibleItems(filterParse.itemsCounted);
          const filteredArray: string[] = [];

          // filter the words
          // for (let x = 0; x < wordArray.length; x++) {
          //   filteredArray.push(stackedElims(wordArray[x]));
          // }

          for (let x = 0; x < wordArray.length; x++) {
            filteredArray.push(newStackedElims(wordArray[x]));
          }

          console.log("filtered array");
          console.log(filteredArray);
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
          let newVal: number = sessionContext.sessionInfo.gamesPlayed + 1;
          sessionContext.setSessionInfo({
            ...sessionContext.sessionInfo,
            gamesPlayed: newVal,
          });

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

  useEffect(() => {
    setValue(sessionContext.sessionTier);
  }, [sessionContext.sessionTier]);

  useEffect(() => {
    if (value) {
      if (+recognizedText[0].RATING > +value) {
        // console.log("uptier detected");
        let difference = +recognizedText[0].RATING - +value;
        let rounded = Math.round(difference * 100) / 100;
        let newUptier: number = sessionContext.sessionInfo.uptierCount + 1;
        sessionContext.setSessionInfo({
          ...sessionContext.sessionInfo,
          uptierCount: newUptier,
        });
        setDisplayTierText(`Uptier detected: +${rounded}`);
      } else {
        // console.log("downtier detected");
        let difference =
          +value - +recognizedText[recognizedText.length - 1].RATING;
        let rounded = Math.round(difference * 100) / 100;
        let newUptier: number = sessionContext.sessionInfo.downtierCount + 1;
        sessionContext.setSessionInfo({
          ...sessionContext.sessionInfo,
          downtierCount: newUptier,
        });
        setDisplayTierText(`Downtier detected: -${rounded}`);
      }
    }
  }, [recognizedText]);

  const calculateTier = () => {
    if (value) {
      if (+recognizedText[0].RATING > +value) {
        // console.log("uptier detected");
        let difference = +recognizedText[0].RATING - +value;
        let rounded = Math.round(difference * 100) / 100;
        return `Uptier detected: +${rounded}`;
      } else {
        // console.log("downtier detected");
        let difference =
          +value - +recognizedText[recognizedText.length - 1].RATING;
        let rounded = Math.round(difference * 100) / 100;

        return `Downtier detected: -${rounded}`;
      }
    }
  };

  const handleDropdownSelect = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    if (+target.value != 0) {
      setValue(+target.value);
    }
  };

  const renderedContent = () => {
    if (display == false && displayError == false) {
      return null;
      // <div className="initialState">
      //   <div className="emptyInfoText">No items have been uploaded yet</div>
      // </div>
    }

    if (display && !displayError) {
      return (
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
                {recognizedText[0].RATING}-
                {recognizedText[recognizedText.length - 1].RATING} BR game
                detected
              </h4>
            ) : null}
            {!sessionContext.sessionActive ? (
              <>
                <label>Input your BR</label>
                <select
                  className="brSelectDropdown"
                  onChange={(e) => handleDropdownSelect(e)}
                >
                  <option value={0}>Select your rating</option>
                  {brRange.map((item, index) => (
                    <option value={item} key={index.toFixed(1)}>
                      {item.toFixed(1)}
                    </option>
                  ))}
                </select>
                <div className="relativeBR">{displayTierText}</div>
              </>
            ) : null}

            <div className="relativeBR">{calculateTier()}</div>
            <div className="parsedCompare">Items detected: {possibleItems}</div>
            <div>Items parsed: {actualParsed}</div>
            <div className="parsePercent">
              {(
                (Math.round((actualParsed / possibleItems) * 100) / 100) *
                100
              ).toFixed(1)}
              % of items succesfully parsed
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="errMsg">
          <div className="errText">
            Error parsing the image. Make sure the screenshot is from Air RB at
            the START of the game. Check the HOW TO if you need more help.
          </div>
        </div>
      );
    }
  };

  return (
    <div className="imgRecogResultDiv">
      <LoadingModal state={loading} />
      {renderedContent()}
    </div>
  );
};
export default TextRecognition;
