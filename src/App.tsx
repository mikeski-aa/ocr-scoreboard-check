import { useState } from "react";
import "./App.css";
import ImageUploader from "./components/ImageUploader";
import TextRecognition from "./components/ImageRecognition";

function App() {
  const [selectedImage, setSelected] = useState<string>("");

  return (
    <div className="mainContent">
      <h4>Tell me the BR</h4>
      <div>
        Upload a picture of the scoreboard at the start of the game to get the
        plane ratings
      </div>
      <ImageUploader otherState={setSelected} />
      <TextRecognition selectedImage={selectedImage} />
    </div>
  );
}

export default App;
