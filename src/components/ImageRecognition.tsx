import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import { resourceLimits } from "worker_threads";
import { eliminateO, eliminateSigns, stackedElims } from "../utils/nameFilters";
import LoadingModal from "./LoadingModal";
import CSVcheck, { IVehicleData } from "../utils/CSVcheck";

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
  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        setLoading(true);
        const result = await Tesseract.recognize(selectedImage);
        setLoading(false);
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
  return (
    <div>
      <LoadingModal state={loading} />
      <h2>Recognized Text:</h2>
      <h4>Max rating: {maxRating}</h4>
      <h4>Min rating: {minRating}</h4>
      <ul>
        {recognizedText.map((item: any, index: number) => (
          <li key={index}>
            Name: {item.NAME} Rating: {item.RATING}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TextRecognition;
