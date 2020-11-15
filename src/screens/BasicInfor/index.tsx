import React, { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Divider, Icon } from "semantic-ui-react";
import CustomDropdown from "elements/Dropdown";
import TextBox from "elements/TextBox";
import { queryCategory, queryCategoryType } from "redux-saga/global-actions";
import { State } from "redux-saga/reducers";
import { Obj } from "interfaces/common";
import "./styles.scss";
import DateTimePicker from "elements/DateTimePicker";
import Checkbox from "elements/Checkbox";

const selectionButton = [
  { text: "Single event", value: "SINGLE_EVENT" },
  { text: "Recurring event", value: "RECURRING_EVENT" },
];

interface InforState {
  tag: {
    value: string;
    errorMessage: string;
    showError: boolean;
  };
  title: {
    value: string;
    errorMessage: string;
    showError: boolean;
  };
  organizer: {
    value: string;
    errorMessage: string;
    showError: boolean;
  };
  frequency?: string;
}

const BasicInfo = () => {
  const dispatch = useDispatch();
  const ref = useRef<{
    category: Obj[];
    categoryType: Obj[];
    info: { tags: string[] };
    frequency?: string;
  }>({
    category: [],
    categoryType: [],
    info: {
      tags: [],
    },
  });
  const [state, setState] = useState<InforState>({
    tag: { value: "", errorMessage: "", showError: false },
    title: { value: "", errorMessage: "", showError: false },
    organizer: { value: "", errorMessage: "", showError: false },
  });
  const { category, categoryType } = useSelector(
    (state: State) => ({
      category: state.category,
      categoryType: state.categoryType,
    }),
    shallowEqual
  );
  const [, redraw] = useState<{}>();
  useEffect(() => {
    dispatch(queryCategoryType());
    dispatch(queryCategory({ type: 1 }));
  }, []);

  useEffect(() => {
    if (categoryType && categoryType.success) {
      ref.current.categoryType = mapCategoryToDropdownOptions(
        categoryType.response as Obj[]
      );
      redraw({});
    }
    if (category && category.success) {
      ref.current.category = mapCategoryToDropdownOptions(
        category.response as Obj[]
      );
      redraw({});
    }
  }, [category, categoryType]);

  const mapCategoryToDropdownOptions = (category: Obj[]) => {
    return category.map((item) => ({
      key: item.id,
      text: item.name,
      value: item.name,
    }));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: {
        value: event.target.value,
        showError: false,
        errorMessage: "",
      },
    }));
  };

  const addTag = () => {
    const tag = state.tag.value.trim();
    if (tag !== "") {
      ref.current.info.tags.push(`#${state.tag.value}`);
      setState((prevState) => ({
        ...prevState,
        tag: {
          value: "",
          showError: false,
          errorMessage: "",
        },
      }));
    }
  };

  const onSelectEventFrequency = (type: string) => {
    ref.current.frequency = type;
    redraw({});
  };

  const renderBasicSection = () => (
    <>
      {" "}
      <div className="BasicSection">
        <div className="Icon">
          <Icon name="building outline" />
        </div>
        <div className="Content">
          <div className="Title">
            <div className="Text">
              <h2>Basic Information</h2>
              <span>
                Name your event and tell event-goers why they should come.
                <br />
                Add details that highlight what makes it unique.
              </span>
            </div>
          </div>
          <div className="Form">
            <TextBox
              label="Event title"
              name="title"
              value={state.title.value}
              errorMessage={state.title.errorMessage}
              showError={state.title.showError}
            />
            <TextBox
              label="Organizer"
              name="organizer"
              value={state.organizer.value}
              errorMessage={state.organizer.errorMessage}
              showError={state.organizer.showError}
            />
            <div className="EventType">
              <CustomDropdown
                placeholder="Type"
                options={ref.current.categoryType}
              />
              <CustomDropdown
                placeholder="Category"
                options={ref.current.category}
              />
            </div>
            <div className="TagsSection">
              <div className="Label">
                <h3>Tags</h3>
                <span>
                  Improve discoverability of your event by adding tags relevant
                  to the subject matter.
                </span>
              </div>
              <div className="InputSection">
                <TextBox
                  label={"Press enter to add tag"}
                  name="tag"
                  value={state.tag.value}
                  errorMessage={state.tag.errorMessage}
                  showError={state.tag.showError}
                  onChange={onChange}
                  onEnter={addTag}
                />
                <button className="AddButton" onClick={addTag}>
                  Add
                </button>
              </div>
              <div className="Tags">
                {ref.current.info.tags.map((tag, index) => (
                  <div className="Tag" key={index}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );

  const renderDateTimeSection = () => (
    <>
      {" "}
      <div className="DateTimeSection">
        <div className="Icon">
          <Icon name="calendar alternate outline" />
        </div>
        <div className="Content">
          <div className="Title">
            <div className="Text">
              <h2>Date and time </h2>
              <span>
                Tell event-goers when your event starts and ends so they can
                <br />
                make plans to attend.
              </span>
            </div>
          </div>
          <div className="Form">
            <div className="SelectButton">
              {selectionButton.map((button, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onSelectEventFrequency(button.value);
                  }}
                  className={
                    button.value === ref.current.frequency ? "Active" : ""
                  }
                >
                  {button.text}
                </button>
              ))}
            </div>
            <div className="DateTime">
              <span>Single event happens once and can last multiple days</span>
              <div className="Start Time">
                <DateTimePicker label="Event start" />
                <DateTimePicker type="time" label="Start time" />
              </div>
              <div className="End Time">
                <DateTimePicker label="Event end" />
                <DateTimePicker type="time" label="End time" />
              </div>
            </div>
            <div className="DisplaySelection">
              <Checkbox
                label="Display start time"
                subLabel="The start time of your event will be displayed to attendees."
                toggle
              />
              <Checkbox
                label="Display end time"
                subLabel="The end time of your event will be displayed to attendees."
                toggle
              />
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );

  return (
    <div className="BasicInfor">
      {renderBasicSection()}
      {renderDateTimeSection()}
      <div className="SubmitSection">
        <button className="Discard">Discard</button>
        <button className="Continue">{"Save & Continue"}</button>
      </div>
    </div>
  );
};

export default BasicInfo;
