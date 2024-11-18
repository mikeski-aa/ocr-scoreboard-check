import { useState } from "react";
import "./App.css";
import ImageUploader from "./components/ImageUploader";
import TextRecognition from "./components/ImageRecognition";

function App() {
  const [selectedImage, setSelected] = useState<string>("");

  return (
    <div className="mainContent">
      <ImageUploader otherState={setSelected} />
      <TextRecognition selectedImage={selectedImage} />
    </div>
  );
}

export default App;
