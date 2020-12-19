import React, { useEffect, useRef, useState } from "react";
import Header from "components/Header";
import InforSectionContainer from "components/InforSectionContainer";
import Sidebar from "components/Sidebar";
import TextBox from "elements/TextBox";
import { Global } from "global";
import "./styles.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { State } from "redux-saga/reducers";
import { EventInfo, Obj, SurveyQuestion } from "interfaces/common";
import Button from "elements/Button";
import {
  saveEventBasicInfo,
  updateEvent,
  uploadImage,
} from "redux-saga/global-actions";
import {
  getIdFromYoutube,
  handleEventInfoForRequest,
  notificationSuccess,
} from "utils";
import { useHistory } from "react-router-dom";
import Video from "screens/Watch/Video";
import Slide from "screens/Watch/Slide";
import { Checkbox, Icon, Modal, Radio } from "semantic-ui-react";
import SurveyForm from "./SurveyForm";
import ImageInput from "elements/ImageInput";

interface StageSettingProps {
  livestreamUrl: string;
  googleSlideUrl: string;
  adsUrl: string;
  adsImage: string;
  questionList: Obj[];
}

const StageSetting = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventInfo, updateEventResult, imageUploaded } = useSelector(
    (state: State) => ({
      eventInfo: state.basicInfoLocal,
      updateEventResult: state.updateEventResult,
      imageUploaded: state.imageUploaded,
    }),
    shallowEqual
  );

  const ref = useRef<Obj>({});
  const [state, setState] = useState<StageSettingProps>({
    livestreamUrl: "",
    googleSlideUrl: "",
    adsUrl: "",
    adsImage: "",
    questionList: [],
  });
  const [, redraw] = useState({});
  // const [questionList, setQuestionList] = useState<Obj[]>([]);
  const [redirect, setRedirect] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (eventInfo) {
      ref.current = eventInfo;
      setState((prev) => ({
        ...prev,
        livestreamUrl: eventInfo.livestreamUrl as string,
        googleSlideUrl: eventInfo.googleSlideUrl as string,
        adsUrl: eventInfo.adsUrl as string,
        adsImage: eventInfo.adsImage as string,
        questionList: eventInfo.questionList
          ? (eventInfo.questionList as Obj[])
          : [],
      }));
    }
  }, [eventInfo]);

  useEffect(() => {
    if (imageUploaded && imageUploaded.success) {
      ref.current.adsImage = ((imageUploaded.response as Obj).data as Obj)
        .url as string;
      redraw({});
    }
  }, [imageUploaded]);

  useEffect(() => {
    if (updateEventResult && updateEventResult.success && redirect) {
      history.push("/ticket");
    }
  });

  useEffect(() => {
    redraw({});
  }, [state.questionList]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ref.current = { ...ref.current, [event.target.name]: event.target.value };
    setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = () => {
    if (state.questionList) {
      const questionSendList: SurveyQuestion[] = state.questionList.map(
        (item) =>
          ({
            ...item,
            question: item.question as string,
            type: item.type as number,
            answerList: (item.answerList as Obj[]).map((answerItem) => ({
              answer: answerItem.answer as string,
            })),
          } as SurveyQuestion)
      );
      ref.current.questionList = questionSendList;
    }
    dispatch(saveEventBasicInfo((ref.current as unknown) as Obj));

    dispatch(
      updateEvent(
        handleEventInfoForRequest((ref.current as unknown) as EventInfo) as Obj
      )
    );
    setRedirect(true);
  };

  const onAddQuestion = (question: Obj) => {
    notificationSuccess({ content: "Add answer successfully" });
    setState((prev) => ({
      ...prev,
      questionList: prev.questionList.concat(question),
    }));
  };

  const onImageChange = (file: File) => {
    let formData = new FormData();
    formData.append("file", file);
    dispatch(uploadImage(formData));
  };

  const deleteQuestion = (question: string) => {
    setState((prev) => ({
      ...prev,
      questionList: prev.questionList.filter(
        (item) => item.question !== question
      ),
    }));
  };

  const renderQuestion = (question: Obj, index: number) => {
    return (
      <div className="Group" key={index}>
        <div className="Content">
          <div className="Question">{question.question}</div>
          {(question.answerList as Obj[]).map((item, index) => {
            return question.type === 0 ? (
              <Radio
                label={item.answer}
                name={question.question as string}
                value={item.answer as string}
                checked={false}
                key={index}
              />
            ) : question.type === 1 ? (
              <Checkbox
                label={item.answer}
                name={item.question as string}
                value={item.answer as string}
                checked={false}
                key={index}
              />
            ) : (
              <TextBox label="Answer" value="" />
            );
          })}
        </div>
        <div
          className="Delete"
          onClick={() => {
            deleteQuestion(question.question as string);
          }}
        >
          <Icon name="delete" />
        </div>
      </div>
    );
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
            <>
              <TextBox
                label="Links to your livestream"
                name="livestreamUrl"
                onChange={onChange}
                value={state.livestreamUrl}
              />
              {getIdFromYoutube(state.livestreamUrl) && (
                <Video
                  videoId={getIdFromYoutube(state.livestreamUrl)}
                  preview
                />
              )}
            </>
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
            <>
              <TextBox
                label="Slide presentation"
                name="googleSlideUrl"
                onChange={onChange}
                value={state.googleSlideUrl as string}
              />
              {state.googleSlideUrl && (
                <Slide slideUrl={state.googleSlideUrl} />
              )}
            </>
          </InforSectionContainer>
          <InforSectionContainer
            className={`Ads`}
            icon="phone"
            title={`Call to action`}
            subTitle={[
              "Invite audience to interact and track their buying signal with a banner that direct to",
              "your website or landing page.",
              "",
            ]}
          >
            <>
              <TextBox
                label="Insert your website here"
                name="adsUrl"
                onChange={onChange}
                value={state.adsUrl}
              />
              <ImageInput
                onChange={onImageChange}
                image={ref.current.adsImage as string}
              />
            </>
          </InforSectionContainer>
          <InforSectionContainer
            className={`Q&A`}
            icon="check square"
            title={`Q&A`}
            subTitle={[
              "This is the part where the viewer asks questions to take place during the presentation.",
              "Information is passed on to presenters immediately and they can reply to viewers.",
              "",
            ]}
          ></InforSectionContainer>
          <InforSectionContainer
            className={`QuestionList`}
            icon="list alternate"
            title={`Survey`}
            subTitle={[
              "This is the part where the speaker will ask multiple-choice questions for viewers in the",
              "form of surveys. The responses will be sent back and reported.",
              "",
            ]}
          >
            <>
              {state.questionList.map((item, index) => {
                return renderQuestion(item, index);
              })}
              <Modal
                onClose={() => {
                  setOpenForm(false);
                }}
                onOpen={() => {
                  setOpenForm(true);
                }}
                open={openForm}
                trigger={
                  <Button className="AddQuestion" text={`Add question`} />
                }
                className="ModalForm"
              >
                <Modal.Header>
                  <h2>Add question</h2>
                </Modal.Header>
                <SurveyForm onSubmit={onAddQuestion} />
              </Modal>
            </>
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
