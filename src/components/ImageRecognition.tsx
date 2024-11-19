import { SyntheticEvent, useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import { stackedElims } from "../utils/nameFilters";
import LoadingModal from "./LoadingModal";
import CSVcheck from "../utils/CSVcheck";

// filter the results
// might need to move this elsewhere
const filterParsedResults = (input: Tesseract.RecognizeResult) => {
  let arrayText = [];
  for (let x = 0; x < input.data.lines.length; x++) {
    // all player data starts with 0 0 0 0 0 indicating the player scores at the start of the game
    if (input.data.lines[x].text.includes("0 0 0 0 0")) {
      // the word data we are looking for is at index 6 of the words array within results
      if (input.data.lines[x].words[6].text.length != 1) {
        // we want to filter anything that has one word results - these normally indicate player has not loaded and the OCR has not been able to read the value.
        arrayText.push(input.data.lines[x].words[6].text);
      }
    }
  }
  console.log(arrayText);

  return arrayText;
};

const TextRecognition = ({ selectedImage }: { selectedImage: string }) => {
  const [recognizedText, setRecognizedText] = useState<any>([,]);
  const [loading, setLoading] = useState<boolean>(false);
  const [maxRating, setMaxRating] = useState<number>();
  const [minRating, setMinRating] = useState<number>();
  const [display, setDisplay] = useState<boolean>(false);
  const [value, setValue] = useState<number>();

  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        setLoading(true);
        const result = await Tesseract.recognize(selectedImage);
        setLoading(false);
        setDisplay(true);
        console.log(result.data);

        const wordArray = filterParsedResults(result);

        const filteredArray: string[] = [];

        // filter the words
        for (let x = 0; x < wordArray.length; x++) {
          filteredArray.push(stackedElims(wordArray[x]));
        }

        const checkedWithCSV = await CSVcheck(filteredArray);

        setRecognizedText(checkedWithCSV.wholeArray);
        setMaxRating(checkedWithCSV.maxrating);
        setMinRating(checkedWithCSV.minrating);
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
          <h4>
            Rating range: {maxRating} - {minRating}
          </h4>
          <div className="sideBySide">
            <div className="detectedPlanes">
              <h4>Detected planes:</h4>
              <ul>
                {recognizedText.map((item: any, index: number) => (
                  <li key={index}>
                    {item.NAME} {item.RATING}
                  </li>
                ))}
              </ul>
            </div>
            <div className="inputDiv">
              <label>Input your BR</label>
              <input
                type="number"
                className="brInput"
                onChange={(e) => handleInputChange(e)}
                value={value}
              ></input>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default TextRecognition;
