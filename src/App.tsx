import { useState } from "react";
import "./App.css";
import ImageUploader from "./components/ImageUploader";
import TextRecognition from "./components/ImageRecognition";

function App() {
  const [selectedImage, setSelected] = useState<string>("");

  return (
    <>
      <div className="container">Hello world</div>
      <ImageUploader otherState={setSelected} />
      <TextRecognition selectedImage={selectedImage} />
    </>
  );
}

export default App;
