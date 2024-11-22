import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";

function ImageUploader({
  otherState,
}: {
  otherState: Dispatch<SetStateAction<string>>;
}) {
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
      <div className="buttonNameWrapper">
        <div className="buttonWrapper">
          <label htmlFor="uploadBtn" className="UploadFakeBtn">
            Upload
          </label>
          <input
            id="uploadBtn"
            className="hiddenInput"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
          />
        </div>
        <div className="fileName">{activeName}</div>
      </div>
      {selectedImage && (
        <img src={selectedImage} alt="selected" className="previewImg" />
      )}
    </div>
  );
}

export default ImageUploader;
