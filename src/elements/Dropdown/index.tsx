import { Obj } from "interfaces/common";
import React from "react";
import { Dropdown, DropdownItemProps } from "semantic-ui-react";
import "./styles.scss";

interface DropdownProps {
  placeholder?: string;
  options: DropdownItemProps[];
}

const CustomDropdown = (props: DropdownProps) => {
  return (
    <div className="CustomDropdown">
      <Dropdown
        placeholder={props.placeholder}
        fluid
        selection
        options={props.options}
        icon="angle down"
      />
    </div>
  );
};

export default CustomDropdown;
