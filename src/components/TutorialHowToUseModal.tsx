import { Dispatch, SetStateAction } from "react";
import pictureExample from "../assets/tutorialOverlay.png";
import locationex from "../assets/examplelocation.png";

function TutorialHowToUseModal({
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
          <div className="headingTextModal">
            How to make screenshots easier to take using Steam
          </div>
          <div className="text">
            <ul>
              <li>Open steam overlay - default keybind: Shift + Tab </li>
              <li>Click the cog - label 1.</li>
              <li>Go to In Game - label 2.</li>
              <li>Set up a preferred easy to access keybind</li>
              <li>Enable "Save an external copy of screenshots" - label 3</li>
              <li>
                Select preferred screenshot folder that is easily accessible -
                label 4
              </li>
            </ul>
          </div>
          <img className="exampleImage" src={pictureExample} />
          <div className="text">
            <ul>
              <li>
                After you click upload, navigate to the screenshot folder you
                have selected
              </li>
              <li>
                Each time you click upload, your screenshot folder will be
                pre-selected
              </li>
              <li>Your newest screenshot will be saved on top of the list</li>
            </ul>
          </div>
          <img className="exampleImage" src={locationex} />
          <div className="text">
            NOTE: If you don't use steam, other 3rd party screenshot apps have
            similar screenshot folder functionality you can set up
          </div>
          <button className="closeBtn" onClick={closeAction}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TutorialHowToUseModal;
