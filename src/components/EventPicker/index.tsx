import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "semantic-ui-react";
import { queryEvents } from "./actions";
import "./styles.scss";

interface EventPickerProps {
  placeholder?: string;
}

const EventPicker = (props: EventPickerProps) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    value: "",
    redraw: false,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, value: event.target.value }));
  };

  const onSubmit = () => {
    setState((prevState) => ({ ...prevState, value: "" }));
    dispatch(queryEvents(state.value));
  };

  return (
    <div className="EventPicker">
      <div className="SearchIcon">
        <Icon name="search" />
      </div>
      <input
        type="text"
        placeholder={props.placeholder ? props.placeholder : `Try "Baselive`}
        value={state.value}
        onChange={onChange}
      />
      <div className="SearchButton">
        <button type="submit" onClick={onSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default EventPicker;
