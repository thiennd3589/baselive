import Editor from "components/Editor";
import Header from "components/Header";
import InforSectionContainer from "components/InforSectionContainer";
import Sidebar from "components/Sidebar";
import Button from "elements/Button";
import ImageInput from "elements/ImageInput";
import TextBox from "elements/TextBox";
import { Global } from "global";
import { EventInfo, Obj } from "interfaces/common";
import React, { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  saveEventBasicInfo,
  updateEvent,
  uploadImage,
} from "redux-saga/global-actions";
import { State } from "redux-saga/reducers";
import { handleEventInfoForRequest } from "utils";
import "./styles.scss";

const Detail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    createEventResult,
    basicInfo,
    imageUploaded,
    updateEventResult,
  } = useSelector(
    (state: State) => ({
      createEventResult: state.createEventResult,
      basicInfo: state.basicInfoLocal,
      imageUploaded: state.imageUploaded,
      updateEventResult: state.updateEventResult,
    }),
    shallowEqual
  );
  const [state, setState] = useState({ summary: "" });

  const [redirect, setRedirect] = useState(false);
  const [, redraw] = useState({});

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

  useEffect(() => {
    if (createEventResult && createEventResult.success) {
      ref.current.id = (createEventResult.response as Obj).data as number;
      redraw({});
    }
    if (imageUploaded && imageUploaded.success) {
      ref.current.eventImage = ((imageUploaded.response as Obj).data as Obj)
        .url as string;
      redraw({});
    }
  }, [createEventResult, imageUploaded]);

  useEffect(() => {
    ref.current = (basicInfo as unknown) as EventInfo;
    redraw({});
  }, [basicInfo]);

  useEffect(() => {
    if (updateEventResult && updateEventResult.success && redirect) {
      history.push("/ticket");
    }
  });

  const onImageChange = (file: File) => {
    let formData = new FormData();
    formData.append("file", file);
    dispatch(uploadImage(formData));
  };

  const onSummaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ref.current.summary = event.target.value;
    setState((prev) => ({ ...prev, summary: event.target.value }));
  };

  const onDiscriptionChange = (data: any) => {
    ref.current.description = JSON.stringify(data);
  };

  const onSubmit = () => {
    dispatch(saveEventBasicInfo((ref.current as unknown) as Obj));
    dispatch(updateEvent(handleEventInfoForRequest(ref.current) as Obj));
    setRedirect(true);
  };
  return (
    <div className="Detail">
      <Sidebar
        menus={Global.menu}
        eventName={ref.current.title}
        eventTime={ref.current.eventStart}
        active="/eventDetail"
      />
      <div className="Main">
        <Header disableLogo />
        <InforSectionContainer
          className="ImageDrop"
          icon="image outline"
          title="Main event image"
          subTitle={[
            "This is the first image attendees will see at the top of your listing.",
            "Use a high quality image: 333x222px (1,5:1 ratio).",
          ]}
        >
          <ImageInput onChange={onImageChange} image={ref.current.eventImage} />
        </InforSectionContainer>
        <InforSectionContainer
          className="Description"
          icon="folder open outline"
          title="Description"
          subTitle={[
            "Add more details to your event like your schedule, sponsors,",
            "or featured guests.",
          ]}
        >
          <TextBox
            label="Summary"
            name="summary"
            onChange={onSummaryChange}
            value={state.summary ? state.summary : ref.current.summary}
          />
          <Editor
            onChange={onDiscriptionChange}
            value={ref.current.description}
          />
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
  );
};

export default Detail;
