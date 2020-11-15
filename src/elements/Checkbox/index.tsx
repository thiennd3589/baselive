import React from "react";
import {
  Checkbox as SemanticCheckbox,
  CheckboxProps as SemanticCheckboxProps,
} from "semantic-ui-react";
import "./styles.scss";

interface CheckboxProps {
  type?: string;
  label?: string;
  toggle?: boolean;
  subLabel?: string;

  onChange?: (
    event: React.FormEvent<HTMLInputElement>,
    data: SemanticCheckboxProps
  ) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const onChange = (
    event: React.FormEvent<HTMLInputElement>,
    data: SemanticCheckboxProps
  ) => {
    props.onChange && props.onChange(event, data);
  };
  return (
    <div className="Checkbox">
      <SemanticCheckbox toggle={props.toggle} onChange={onChange} />
      {props.label && (
        <label>
          <span className="Label">{props.label}</span>
          {props.subLabel && <span className="SubLabel">{props.subLabel}</span>}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
