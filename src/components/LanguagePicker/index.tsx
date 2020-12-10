import CustomDropdown from "elements/Dropdown";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DropdownProps } from "semantic-ui-react";
import { changeLanguage } from "./actions";
import "./styles.scss";

const languageOptions = [
  { key: "en", value: "en", text: "EN" },
  { key: "vi", value: "vi", text: "VI" },
];

const LanguagePicker = () => {
  const dispatch = useDispatch();

  const onChange = (data: DropdownProps) => {
    dispatch(changeLanguage(data.value as string));
  };
  return (
    <div className="LanguagePicker">
      <CustomDropdown
        placeholder="EN"
        options={languageOptions}
        onChange={onChange}
      />
    </div>
  );
};

export default LanguagePicker;
