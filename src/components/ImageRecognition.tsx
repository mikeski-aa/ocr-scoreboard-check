import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import { resourceLimits } from "worker_threads";
const TextRecognition = ({ selectedImage }: { selectedImage: string }) => {
  const [recognizedText, setRecognizedText] = useState("");
  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        const result = await Tesseract.recognize(selectedImage);

        console.log(result.data);

        let arrayText = [];
        for (let x = 0; x < result.data.lines.length; x++) {
          if (result.data.lines[x].text.includes("0 0 0 0 0")) {
            arrayText.push(result.data.lines[x].words[6]);
          }
        }
        console.log(arrayText);
        setRecognizedText(result.data.text);
      }
    };
    recognizeText();
  }, [selectedImage]);
  return (
    <div>
      <h2>Recognized Text:</h2>
      <p>{recognizedText}</p>
    </div>
  );
};
export default TextRecognition;
