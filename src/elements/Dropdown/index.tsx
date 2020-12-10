import React from "react";
import {
  Dropdown,
  DropdownItemProps,
  DropdownProps as SemanticDropdownProps,
} from "semantic-ui-react";
import "./styles.scss";

interface DropdownProps {
  placeholder?: string;
  options: DropdownItemProps[];
  onChange: (data: SemanticDropdownProps) => void;
}

const CustomDropdown = (props: DropdownProps) => {
  const onChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: SemanticDropdownProps
  ) => {
    props.onChange(data);
  };

  return (
    <div className="CustomDropdown">
      <Dropdown
        placeholder={props.placeholder}
        fluid
        selection
        options={props.options}
        icon="angle down"
        onChange={onChange}
      />
    </div>
  );
};

export default CustomDropdown;
