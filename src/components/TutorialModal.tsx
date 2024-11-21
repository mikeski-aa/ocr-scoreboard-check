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
        <div className="text"></div>
        <img className="exampleImage" src={pictureExample} />
        <button className="closeBtn" onClick={closeAction}>
          Close
        </button>
      </div>
    </div>
  );
}

export default TutorialModal;
