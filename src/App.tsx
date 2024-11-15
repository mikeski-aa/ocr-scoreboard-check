import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageUploader from "./components/imageUploader";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">Hello world</div>
      <ImageUploader />
    </>
  );
}

export default App;
