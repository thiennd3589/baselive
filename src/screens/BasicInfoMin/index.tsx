import InforSectionContainer from "components/InforSectionContainer";
import Sidebar from "components/Sidebar";
import CustomDropdown from "elements/Dropdown";
import TextBox from "elements/TextBox";
import { Global } from "global";
import { EventInfo, Obj } from "interfaces/common";
import React, { useEffect, useRef, useState } from "react";
import Button from "elements/Button";
import { selectionButton } from "../BasicInfor";
import { handleEventInfoForRequest, mapCategoryToDropdownOptions } from "utils";
import "./styles.scss";
import { DropdownProps } from "semantic-ui-react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { State } from "redux-saga/reducers";
import Loader from "components/Loader";
import { useHistory } from "react-router-dom";
import { saveEventBasicInfo, updateEvent } from "redux-saga/global-actions";
import DateTimePicker from "elements/DateTimePicker";
import Checkbox from "elements/Checkbox";

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
  eventStart: string;
  eventEnd: string;
  startTime: string;
  endTime: string;
}

const BasicInfoMin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState<InforState>({
    tag: { value: "", errorMessage: "", showError: false },
    title: { value: "", errorMessage: "", showError: false },
    organizer: { value: "", errorMessage: "", showError: false },
    eventStart: "",
    eventEnd: "",
    startTime: "",
    endTime: "",
  });

  const [, redraw] = useState<{}>();

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

  const basicInfoLocal = useSelector((state: State) => state.basicInfoLocal);
  const createEventResult = useSelector(
    (state: State) => state.createEventResult
  );

  const { category, categoryType } = useSelector(
    (state: State) => ({
      category: state.category,
      categoryType: state.categoryType,
    }),
    shallowEqual
  );

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

  useEffect(() => {
    if (basicInfoLocal) {
      ref.current.info = basicInfoLocal as any;
      redraw({});
    }
  }, [basicInfoLocal, createEventResult]);

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

  const onDateTimeChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: any,
    name: string
  ) => {
    ref.current = {
      ...ref.current,
      info: { ...ref.current.info, [name]: data.value },
    };
    setState((prev) => ({ ...prev, [name]: data.value }));
  };

  const onDropdownChange = (data: DropdownProps, type: string) => {
    ref.current = {
      ...ref.current,
      info: { ...ref.current.info, [type]: data.value },
    };
  };

  const onSubmit = () => {
    dispatch(saveEventBasicInfo((ref.current.info as unknown) as Obj));
    dispatch(updateEvent(handleEventInfoForRequest(ref.current.info) as Obj));
    history.push("/eventDetail");
  };

  return basicInfoLocal ? (
    <div className="BasicInfoMin">
      <Sidebar
        menus={Global.menu}
        eventName={ref.current.info.title}
        eventTime={ref.current.info.eventStart}
        active="/basicInfo"
      />
      <div className="Main">
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
              value={
                state.title.value ? state.title.value : ref.current.info.title
              }
              errorMessage={state.title.errorMessage}
              showError={state.title.showError}
              onChange={onChange}
            />
            <TextBox
              label="Organizer"
              name="organizer"
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
                  onDropdownChange(data, "categoryType");
                }}
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
                  value={
                    state.eventStart
                      ? state.eventStart
                      : ref.current.info.eventStart
                  }
                />
                <DateTimePicker
                  type="time"
                  label="Start time"
                  onChange={(e, data) => {
                    onDateTimeChange(e, data, "startTime");
                  }}
                  value={
                    state.startTime
                      ? state.startTime
                      : ref.current.info.startTime
                  }
                />
              </div>
              <div className="End Time">
                <DateTimePicker
                  label="Event end"
                  onChange={(e, data) => {
                    onDateTimeChange(e, data, "eventEnd");
                  }}
                  value={
                    state.eventEnd ? state.eventEnd : ref.current.info.eventEnd
                  }
                />
                <DateTimePicker
                  type="time"
                  label="End time"
                  onChange={(e, data) => {
                    onDateTimeChange(e, data, "endTime");
                  }}
                  value={
                    state.endTime ? state.endTime : ref.current.info.endTime
                  }
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
  ) : (
    <Loader />
  );
};

export default BasicInfoMin;
