import React from "react";
import { Icon, SemanticICONS } from "semantic-ui-react";
import "./styles.scss";

const icons: SemanticICONS[] = [
  "user",
  "file alternate",
  "tv",
  "assistive listening systems",
  "chart bar",
  "braille",
  "setting",
];

interface ControlBarProps {
  show: boolean;
  onHide?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ControlBar = (props: ControlBarProps) => {
  const onHide = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    props.onHide && props.onHide(event);
  };
  return (
    <div className="ControlBar">
      {props.show === true && (
        <div className="HideIcon" onClick={onHide}>
          <Icon name="caret down" />
        </div>
      )}
      <div className="Items">
        {icons.map((icon, index) => (
          <Icon name={icon} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ControlBar;
