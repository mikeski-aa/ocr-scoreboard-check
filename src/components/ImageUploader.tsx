import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from "react";
import { SessionContext } from "../App";

function ImageUploader({
  otherState,
}: {
  otherState: Dispatch<SetStateAction<string>>;
}) {
  const sessionContext = useContext(SessionContext);
  const [selectedImage, setSelected] = useState<string>("");
  const [activeName, setActiveName] = useState<string>("");

  const handleImageUpload = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    if (target.files) {
      const image = target.files[0];
      setActiveName(image.name);
      setSelected(URL.createObjectURL(image));
      otherState(URL.createObjectURL(image));
    }
  };

  return (
    <div className="imageUploader">
      {sessionContext.sessionActive && sessionContext.sessionTier === 0 ? (
        <div className="sessionWarning">
          You've started a new session, make sure to pick your plane's tier (top
          right) to continue!
        </div>
      ) : (
        <>
          <div className="buttonNameWrapper">
            <div className="buttonWrapper">
              <label htmlFor="uploadBtn" className="UploadFakeBtn">
                UPLOAD
              </label>
              <input
                id="uploadBtn"
                className="hiddenInput"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
              />
            </div>
            {activeName != "" ? (
              <div className="fileName">{activeName}</div>
            ) : null}
          </div>
          {selectedImage && (
            <img src={selectedImage} alt="selected" className="previewImg" />
          )}
        </>
      )}
    </div>
  );
}

export default ImageUploader;
