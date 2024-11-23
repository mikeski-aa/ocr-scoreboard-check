import { Dispatch, SetStateAction } from "react";
import pictureExample from "../assets/censoredpic.png";

function TutorialModal({
  setModal,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const closeAction = () => {
    setModal(false);
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <div className="text">
          <div className="headingTextModal">How to use the app:</div>
          <ul>
            <li>Take a screenshot at the START of the game</li>
            <li>Do not crop / change it</li>
            <li>Pictures taken with a mobile phone will not work</li>
            <li>
              Make sure your mouse cursor is NOT hovering over the scoreboard
            </li>
            <li>
              Ideally wait until everyone has loaded in to take a screenshot
            </li>
            <li>None of your screenshots or data is saved by this app</li>
          </ul>
        </div>
        <img className="exampleImage" src={pictureExample} />
        <button className="closeBtn" onClick={closeAction}>
          Close
        </button>
      </div>
    </div>
  );
}

export default TutorialModal;
