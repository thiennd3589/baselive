import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import "./styles.scss";

interface ImageInputProps {
  image?: string;
  onChange?: (file: File) => void;
}

const ImageInput = (props: ImageInputProps) => {
  const [filePreview, setFilePreview] = useState<string>("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFilePreview(URL.createObjectURL(event.target.files[0]));
      props.onChange && props.onChange(event.target.files[0]);
    }
  };

  return (
    <div className="ImageInput">
      <div className="Icon">
        <Icon name="file image" />
      </div>
      <div className="DropZone">
        <div className="Label">
          <span>Click to add main event image</span>
          <br />
          <span>
            <strong> JPEG </strong> or <strong> PNG </strong> , no larger than
            10MB
          </span>
        </div>
        <div className="Zone">
          <label htmlFor="file-input">
            <div className="Add">
              {filePreview ? (
                <img src={filePreview} alt="file" />
              ) : props.image ? (
                <img src={props.image} alt="file" />
              ) : (
                <Icon name="add" />
              )}
            </div>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
