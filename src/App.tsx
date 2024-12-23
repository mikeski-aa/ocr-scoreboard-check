import {
  createContext,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import "./App.css";
import ImageUploader from "./components/ImageUploader";
import TextRecognition from "./components/ImageRecognition";
import TutorialModal from "./components/TutorialModal";
import TutorialHowToUseModal from "./components/TutorialHowToUseModal";
import Snowfall from "react-snowfall";

export interface ISessionData {
  gamesPlayed: number;
  uptierCount: number;
  downtierCount: number;
}

export interface ISessionContextInit {
  sessionInfo: ISessionData;
  setSessionInfo: Dispatch<SetStateAction<ISessionData>>;
  sessionActive: boolean;
  sessionTier: number;
}

const defaultSessionState: ISessionData = {
  gamesPlayed: 0,
  uptierCount: 0,
  downtierCount: 0,
};

export const SessionContext = createContext<ISessionContextInit>({
  sessionInfo: defaultSessionState,
  setSessionInfo: () => {},
  sessionActive: false,
  sessionTier: 0,
});

function App() {
  const [selectedImage, setSelected] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [sessionTier, setSessionTier] = useState<number>(0);

  const [sessionInfo, setSessionInfo] =
    useState<ISessionData>(defaultSessionState);

  const brRange: number[] = [
    1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 4.3, 4.7, 5.0, 5.3, 5.7,
    6.0, 6.3, 6.7, 7.0, 7.3, 7.7, 8.0, 8.3, 8.7, 9.0, 9.3, 9.7, 10.0, 10.3,
    10.7, 11.0, 11.3, 11.7, 12.0, 12.3, 12.7, 13.0, 13.3, 13.7, 14.0,
  ];

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

  const handleDropdownSelect = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    if (+target.value != 0) {
      setSessionTier(+target.value);
    }
  };

  return (
    <div className="mainContent">
      <Snowfall />
      <SessionContext.Provider
        value={{ sessionActive, sessionInfo, setSessionInfo, sessionTier }}
      >
        <div className="pageHeading">Battle Rating Checker</div>
        {showModal ? <TutorialModal setModal={setShowModal} /> : null}
        {showTutorial ? (
          <TutorialHowToUseModal setModal={setShowTutorial} />
        ) : null}
        <div className="tutorialButtonHolder">
          <button onClick={() => handleModalDisplay(true)} className="howtoBtn">
            HOW TO USE THE APP
          </button>
          <button
            onClick={() => handleModalDisplay(false)}
            className="howtoBtn"
          >
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
          <div
            className={
              sessionActive ? "sessionItems active" : "sessionItems inactive"
            }
          >
            <div className="sessionHeading">Session started</div>
            <select
              className={
                sessionTier != 0
                  ? "brSelectDropdown inactive"
                  : "brSelectDropdown active"
              }
              onChange={(e) => handleDropdownSelect(e)}
            >
              <option value={0}>Select your rating</option>
              {brRange.map((item, index) => (
                <option value={item} key={index.toFixed(1)}>
                  {item.toFixed(1)}
                </option>
              ))}
            </select>
            <div
              className={
                sessionTier != 0
                  ? "sessionDetailsContainer active"
                  : "sessionDetailsContainer inactive"
              }
            >
              <div className="sessionGames">
                Tier selected: {sessionTier.toFixed(1)}
              </div>
              <div className="sessionGames">
                Games played: {sessionInfo.gamesPlayed}
              </div>
              <div className="sessionGames">
                Uptier count: {sessionInfo.uptierCount}
              </div>
              <div className="sessionGames">
                Downtier count:{sessionInfo.downtierCount}
              </div>
            </div>
          </div>
        </div>

        <div className="previewResultHolder">
          <ImageUploader otherState={setSelected} />
          <TextRecognition selectedImage={selectedImage} />
        </div>
      </SessionContext.Provider>
    </div>
  );
}

export default App;
