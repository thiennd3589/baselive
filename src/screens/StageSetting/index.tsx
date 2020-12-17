import React, { useEffect, useRef, useState } from "react";
import Header from "components/Header";
import InforSectionContainer from "components/InforSectionContainer";
import Sidebar from "components/Sidebar";
import TextBox from "elements/TextBox";
import { Global } from "global";
import "./styles.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { State } from "redux-saga/reducers";
import { EventInfo, Obj } from "interfaces/common";
import Button from "elements/Button";
import { saveEventBasicInfo, updateEvent } from "redux-saga/global-actions";
import { handleEventInfoForRequest } from "utils";
import { useHistory } from "react-router-dom";

const StageSetting = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventInfo, updateEventResult } = useSelector(
    (state: State) => ({
      eventInfo: state.basicInfoLocal,
      updateEventResult: state.updateEventResult,
    }),
    shallowEqual
  );

  const ref = useRef<Obj>({});
  const [state, setState] = useState({ livestreamUrl: "", googleSlideUrl: "" });
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (eventInfo) {
      ref.current = eventInfo;
    }
  }, [eventInfo]);

  useEffect(() => {
    if (updateEventResult && updateEventResult.success && redirect) {
      history.push("/ticket");
    }
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ref.current = { ...ref.current, [event.target.name]: event.target.value };
    setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = () => {
    dispatch(saveEventBasicInfo((ref.current as unknown) as Obj));
    dispatch(
      updateEvent(
        handleEventInfoForRequest((ref.current as unknown) as EventInfo) as Obj
      )
    );
    setRedirect(true);
  };

  return (
    <div className="StageSetting">
      <Sidebar menus={Global.menu} active="/stage" />
      <div className="Main">
        <Header disableLogo />
        <div className="Content">
          <h1>Stage Setting</h1>
          <InforSectionContainer
            className="Media"
            icon="image"
            title="Media livestream"
            subTitle={[
              "This is the first image attendees will see at the top of your listing.",
              "Use a high quality image: 999x666px (1,5:1 ratio).",
              "",
            ]}
          >
            <TextBox
              label="Links to your livestream"
              name="livestreamUrl"
              onChange={onChange}
              value={state.livestreamUrl}
            />
          </InforSectionContainer>
          <InforSectionContainer
            className="GSlide"
            icon="file powerpoint"
            title="Slide presentation"
            subTitle={[
              "This is the first image attendees will see at the top of your listing.",
              "Use a high quality image: 999x666px (1,5:1 ratio).",
              "",
            ]}
          >
            <TextBox
              label="Slide presentation"
              name="googleSlideUrl"
              onChange={onChange}
              value={state.googleSlideUrl}
            />
          </InforSectionContainer>
          <div className="SubmitSection">
            <Button
              className="Continue"
              text={`Save & continue`}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageSetting;
