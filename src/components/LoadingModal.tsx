import spinner from "../assets/gear-spinner (1).svg";
import "../styles/modalstyle.css";

function LoadingModal({ state }: { state: boolean }) {
  // dont render modal
  if (!state) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modalContainer">
        <div className="heading">
          <h4>Processing Image</h4>
          <img className="loadingImg" src={spinner}></img>
        </div>
      </div>
    </div>
  );
}

export default LoadingModal;
