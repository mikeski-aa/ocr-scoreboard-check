import { SyntheticEvent, useState } from "react";

function ImageUploader() {
  const [selectedImage, setSelected] = useState<string>("");

  const handleImageUpload = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    if (target.files) {
      const image = target.files[0];
      setSelected(URL.createObjectURL(image));
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e)}
      />
      {selectedImage && (
        <img src={selectedImage} alt="selected" className="previewImg" />
      )}
    </div>
  );
}

export default ImageUploader;
