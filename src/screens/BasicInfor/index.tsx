import React, { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CustomDropdown from "elements/Dropdown";
import TextBox from "elements/TextBox";
import DateTimePicker from "elements/DateTimePicker";
import Checkbox from "elements/Checkbox";
import Button from "elements/Button";
import Header from "components/Header";
import InforSectionContainer from "components/InforSectionContainer";
import {
  createEvent,
  queryCategory,
  queryCategoryType,
  saveEventBasicInfo,
} from "redux-saga/global-actions";
import { State } from "redux-saga/reducers";
import { EventInfo, Obj } from "interfaces/common";
import "./styles.scss";
import { DropdownProps } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { mapCategoryToDropdownOptions } from "utils";
import { handleEventInfoForRequest } from "utils/event";
import { Global } from "global";

export const selectionButton = [
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
  const history = useHistory();
  const ref = useRef<{
    category: Obj[];
    categoryType: Obj[];
    info: EventInfo;
  }>({
    category: [],
    categoryType: [],
    info: {
      tags: [],
      title: "",
      organizer: [],
      frequency: "",
      category: undefined,
      categoryType: undefined,
      eventStart: "",
      eventEnd: "",
      startTime: "",
      endTime: "",
    },
  });

  const [state, setState] = useState<InforState>({
    tag: { value: "", errorMessage: "", showError: false },
    title: { value: "", errorMessage: "", showError: false },
    organizer: { value: "", errorMessage: "", showError: false },
  });

  const { category, categoryType, createEventResult } = useSelector(
    (state: State) => ({
      category: state.category,
      categoryType: state.categoryType,
      createEventResult: state.createEventResult,
    }),
    shallowEqual
  );
  const basicInfoLocal = useSelector((state: State) => state.basicInfoLocal);

  const [, redraw] = useState<{}>();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    dispatch(
      queryCategoryType({
        type: "categoryType",
        referTableId: "",
        referTableName: "",
      })
    );
    dispatch(
      queryCategory({ type: "category", referTableId: "", referTableName: "" })
    );
  }, []);

  useEffect(() => {
    if (createEventResult && createEventResult.success && redirect) {
      history.push("/eventDetail");
    }
  }, [createEventResult]);

  useEffect(() => {
    if (categoryType && categoryType.success) {
      ref.current.categoryType = mapCategoryToDropdownOptions(
        (categoryType.response as Obj).data as Obj[]
      );
      redraw({});
    }
    if (category && category.success) {
      ref.current.category = mapCategoryToDropdownOptions(
        (category.response as Obj).data as Obj[]
      );
      redraw({});
    }
  }, [category, categoryType]);

  useEffect(() => {}, [basicInfoLocal]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ref.current = {
      ...ref.current,
      info: { ...ref.current.info, [event.target.name]: event.target.value },
    };
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
    ref.current.info.frequency = type;
    redraw({});
  };

  const onDropdownChange = (data: DropdownProps, type: string) => {
    const selectItem = data.options?.find((item) => item.value === data.value);
    ref.current = {
      ...ref.current,
      info: { ...ref.current.info, [type]: selectItem },
    };
  };

  const onDateTimeChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: any,
    name: string
  ) => {
    ref.current = {
      ...ref.current,
      info: { ...ref.current.info, [name]: data.value },
    };
  };

  const onSubmit = () => {
    dispatch(saveEventBasicInfo((ref.current.info as unknown) as Obj));
    dispatch(createEvent(handleEventInfoForRequest(ref.current.info) as Obj));
    setRedirect(true);
  };

  const renderBasicSection = () => (
    <>
      <InforSectionContainer
        className="BasicSection"
        icon="building outline"
        title="Basic Information"
        subTitle={[
          "Name your event and tell event-goers why they should come.",
          "Add details that highlight what makes it unique.",
        ]}
      >
        <div className="Form">
          <TextBox
            label="Event title"
            name="title"
            value={state.title.value}
            errorMessage={state.title.errorMessage}
            showError={state.title.showError}
            onChange={onChange}
          />
          <TextBox
            label="Organizer"
            name="organizer"
            value={state.organizer.value}
            errorMessage={state.organizer.errorMessage}
            showError={state.organizer.showError}
            onChange={onChange}
          />
          <div className="EventType">
            <CustomDropdown
              placeholder={`${
                ref.current.info.categoryType
                  ? ref.current.info.categoryType?.value
                  : "Type"
              }`}
              options={ref.current.categoryType}
              onChange={(data) => {
                onDropdownChange(data, "categoryType");
              }}
            />
            <CustomDropdown
              placeholder={`${
                ref.current.info.category
                  ? ref.current.info.category?.value
                  : "Category"
              }`}
              options={ref.current.category}
              onChange={(data) => {
                onDropdownChange(data, "category");
              }}
            />
          </div>
          <div className="TagsSection">
            <div className="Label">
              <h3>Tags</h3>
              <span>
                Improve discoverability of your event by adding tags relevant to
                the subject matter.
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
              <Button className="AddButton" onClick={addTag} text="Add" />
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
      </InforSectionContainer>
    </>
  );

  const renderDateTimeSection = () => (
    <>
      <InforSectionContainer
        className="DateTimeSection"
        icon="calendar alternate outline"
        title="Date and time"
        subTitle={[
          "Tell event-goers when your event starts and ends so they can",
          "make plans to attend.",
        ]}
      >
        <div className="Form">
          <div className="SelectButton">
            {selectionButton.map((button, index) => (
              <Button
                key={index}
                onClick={() => {
                  onSelectEventFrequency(button.value);
                }}
                className={
                  button.value === ref.current.info.frequency ? "Active" : ""
                }
                text={button.text}
              />
            ))}
          </div>
          <div className="DateTime">
            <span>Single event happens once and can last multiple days</span>
            <div className="Start Time">
              <DateTimePicker
                label="Event start"
                onChange={(e, data) => {
                  onDateTimeChange(e, data, "eventStart");
                }}
              />
              <DateTimePicker
                type="time"
                label="Start time"
                onChange={(e, data) => {
                  onDateTimeChange(e, data, "startTime");
                }}
              />
            </div>
            <div className="End Time">
              <DateTimePicker
                label="Event end"
                onChange={(e, data) => {
                  onDateTimeChange(e, data, "eventEnd");
                }}
              />
              <DateTimePicker
                type="time"
                label="End time"
                onChange={(e, data) => {
                  onDateTimeChange(e, data, "endTime");
                }}
              />
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
      </InforSectionContainer>
    </>
  );

  return (
    <>
      <Header />
      <div className="BasicInfor">
        <div className="Main">
          {renderBasicSection()}
          {renderDateTimeSection()}
          <div className="SubmitSection">
            <Button text="Discard" className="Discard" />
            <Button
              className="Continue"
              text={`Save & continue`}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
