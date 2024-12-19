import { Dispatch, SetStateAction } from "react";
import pictureExample from "../assets/censoredpic.png";
import examplePic from "../assets/examplesaved.png";

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
        <button className="closeModalBtn" onClick={closeAction}>
          X
        </button>
        <div className="yapText">
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
              <li>
                Enter your plane BR to let the app tell you if it is an uptier
                or downtier
              </li>
              <li>
                App remembers your plane BR between different screenshot uploads
              </li>
              <li>None of your screenshots or data is saved by this app</li>
            </ul>
          </div>
          <img className="exampleImage" src={pictureExample} />
          <div className="text">
            <div className="headingTextModal">Result example:</div>
            <ul>
              <li>
                Successfully processing the image will look like the below
                example
              </li>
              <li>
                Note that you can download the censored image above and try the
                app
              </li>
              <li>If you do not have any any screenshots on hand</li>
            </ul>
          </div>
          <img className="exampleImage" src={examplePic} />
          <button className="closeBtn" onClick={closeAction}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TutorialModal;
