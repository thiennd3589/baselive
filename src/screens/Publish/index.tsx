import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Button from "elements/Button";
import DateTimePicker from "elements/DateTimePicker";
import { Global } from "global";
import { EventInfo, Obj, TicketInfo } from "interfaces/common";
import React, { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveEventBasicInfo, updateEvent } from "redux-saga/global-actions";
import { State } from "redux-saga/reducers";
import { CheckboxProps, Radio } from "semantic-ui-react";
import { handleEventInfoForRequest, notificationSuccess } from "utils";
import "./styles.scss";

interface PreviewItemInterface {
  image: string;
  title: string;
  startDate: string;
  ticket?: TicketInfo;
  category?: string;
}

const PreviewItem = (props: PreviewItemInterface) => {
  return (
    <div className="PreviewItem">
      <div className="Image">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="Info">
        <div>
          <div className="Category">{props.category}</div>
          <div className="MainInfo">
            <h2>{props.title}</h2>
            <p>{props.startDate}</p>
            {props.ticket && <p>${props.ticket?.price}</p>}
          </div>
          <div className="Preview">Preview</div>
        </div>
      </div>
    </div>
  );
};

interface PublishState {
  schedule: string | number | undefined;
  publishDate: string;
  publishTime: string;
}

const Publish = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { eventInfo, updateEventResult } = useSelector(
    (state: State) => ({
      eventInfo: state.basicInfoLocal,
      updateEventResult: state.updateEventResult,
    }),
    shallowEqual
  );

  const ref = useRef<EventInfo>({
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
    summary: "",
  });

  const [state, setState] = useState<PublishState>({
    schedule: "now",
    publishDate: ``,
    publishTime: "",
  });
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (eventInfo) {
      ref.current = (eventInfo as unknown) as EventInfo;
    }
  }, [eventInfo]);

  useEffect(() => {
    if (updateEventResult && updateEventResult.success && redirect) {
      setTimeout(() => {
        history.push("/");
      });
    }
  }, [updateEventResult]);

  const setSchedule = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    data: CheckboxProps
  ) => {
    setState((prev) => ({ ...prev, schedule: data.value }));
  };

  const onDateTimeChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: any,
    name: string
  ) => {
    ref.current = { ...ref.current, [name]: data.value };
    setState((prev) => ({ ...prev, [name]: data.value }));
  };

  const onSubmit = () => {
    dispatch(saveEventBasicInfo((ref.current as unknown) as Obj));
    dispatch(updateEvent(handleEventInfoForRequest(ref.current) as Obj));
    setRedirect(true);
  };

  return (
    eventInfo && (
      <div className="Publish">
        <Sidebar menus={Global.menu} active="/publish" />
        <div className="Main">
          <Header disableLogo />
          <div className="Content">
            <h1>Publish Your Event</h1>
            <PreviewItem
              category={(eventInfo.category as Obj).text as string}
              image={eventInfo.eventImage as string}
              title={eventInfo.title as string}
              startDate={eventInfo.eventStart as string}
              ticket={
                eventInfo.ticketList
                  ? (eventInfo.ticketList as TicketInfo[])[0]
                  : undefined
              }
            />
            <div className="Privacy">
              <h3>Who can see your event</h3>
              <Radio
                label={"Public (Share on Baselive and search engines)"}
                checked
              />
            </div>
            <div className="Schedule">
              <h3>Select publish time</h3>
              <div>
                <Radio
                  label={"Right now"}
                  value="now"
                  checked={state.schedule === "now"}
                  onClick={setSchedule}
                />
                <Radio
                  label={"Schedule"}
                  value="schedule"
                  checked={state.schedule === "schedule"}
                  onClick={setSchedule}
                />
              </div>
            </div>
            {state.schedule === "schedule" && (
              <div className="DateTime">
                <DateTimePicker
                  label="Schedule Day"
                  onChange={(e, data) => {
                    onDateTimeChange(e, data, "publishDate");
                  }}
                  disabledIcon
                />
                <DateTimePicker
                  type="time"
                  label="Schedule Time"
                  onChange={(e, data) => {
                    onDateTimeChange(e, data, "publishTime");
                  }}
                />
              </div>
            )}
            <div className="SubmitSection">
              <Button
                className="Continue"
                text={`Continue`}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Publish;
