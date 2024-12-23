import { useState } from "react";
import "./App.css";
import ImageUploader from "./components/ImageUploader";
import TextRecognition from "./components/ImageRecognition";
import TutorialModal from "./components/TutorialModal";
import TutorialHowToUseModal from "./components/TutorialHowToUseModal";
import Snowfall from "react-snowfall";

export interface ISessionDate {
  gamesPlayed: number;
  uptierCount: number;
  downtierCount: number;
}

function App() {
  const [selectedImage, setSelected] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [sessionActive, setSessionActive] = useState<boolean>(false);

  // DONE
  // 1. CSV re-parser.
  // CSV items need to be reparsed to remove duplicate
  // for example F-84G-21-RE exists in Italy, China and USA. All 3 are the same plane with same rating.
  // These needs to be consolidated into one plane i.e F-84G-21-RE.
  // Check needs to include that the BR matches as some countries have higher / lower BR aircraft.

  // 2. there are 5 results that are parsed with "" markers. These are easy to manually fix but I should add a filter to remove them

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // TO DO:
  // Parsing image change.
  // Not all plane items will be on line index 6 as it is current coded.
  // Longer plane names - i.e those with spaces will go over that line limit and will not be identified resulting
  // in lower overall place identified %.

  const handleModalDisplay = (input: boolean) => {
    if (input) {
      setShowModal(true);
    } else {
      setShowTutorial(true);
    }
  };

  const handleSessionStart = () => {
    setSessionActive(true);
  };

  return (
    <div className="mainContent">
      <Snowfall />
      <div className="pageHeading">Battle Rating Checker</div>
      {showModal ? <TutorialModal setModal={setShowModal} /> : null}
      {showTutorial ? (
        <TutorialHowToUseModal setModal={setShowTutorial} />
      ) : null}
      <div className="tutorialButtonHolder">
        <button onClick={() => handleModalDisplay(true)} className="howtoBtn">
          HOW TO USE THE APP
        </button>
        <button onClick={() => handleModalDisplay(false)} className="howtoBtn">
          EASY SCREENSHOT TUTORIAL
        </button>
      </div>
      <div
        className={
          sessionActive
            ? "sessionContainer active"
            : "sessionContainer inactive"
        }
      >
        <button
          className={
            sessionActive
              ? "startSessionButton active"
              : "startSessionButton inactive"
          }
          onClick={handleSessionStart}
        >
          START SESSION
        </button>
        <div className="sessionItems">
          <div className="sessionHeading">Session started</div>
          <div className="sessionGames"></div>
          <div className="sessionGames"></div>
          <div className="sessionGames"></div>
        </div>
      </div>

      <div className="previewResultHolder">
        <ImageUploader otherState={setSelected} />
        <TextRecognition selectedImage={selectedImage} />
      </div>
    </div>
  );
}

export default App;
