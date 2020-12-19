import TextBox from "elements/TextBox";
import { Obj, SurveyQuestion } from "interfaces/common";
import React, { useEffect, useRef, useState } from "react";
import { Button, Icon, Label, Segment } from "semantic-ui-react";
import "./styles.scss";

interface SurveyFormProps {
  onSubmit?: (question: Obj) => void;
}

interface SurveyFormState {
  type: number;
  answerList: Obj[];
  question: string;
}

const SurveyForm = (props: SurveyFormProps) => {
  const [state, setState] = useState<SurveyFormState>({
    type: 0,
    question: "",
    answerList: [],
  });
  const [, redraw] = useState({});

  const changeType = (type: number) => {
    setState((prev) => ({
      ...prev,
      question: "",
      type: type,
      answerList: [],
    }));
  };

  const addAnswer = () => {
    setState((prev) => ({
      ...prev,
      answerList: prev.answerList.concat({
        value: "",
        name: prev.answerList.length,
      }),
    }));
  };

  const onQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, question: event.target.value }));
  };

  const onAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    state.answerList[parseInt(event.target.name)].value = event.target.value;
    redraw({});
  };

  const onSubmit = () => {
    const question = {
      ...state,
      answerList: state.answerList.map((item) => ({
        checked: false,
        answer: item.value,
      })),
    };
    props.onSubmit && props.onSubmit(question);
  };

  const renderForm = (type: number) => {
    switch (type) {
      case 0:
        return (
          <div className="CheckboxQuestion">
            {state.answerList.map((item, index) => (
              <TextBox
                label="Answer"
                value={item.answer as string}
                name={item.name as string}
                key={index}
                onChange={onAnswerChange}
              />
            ))}
            <Button icon labelPosition="left" onClick={addAnswer}>
              <Icon name="add square" />
              Add answer
            </Button>
          </div>
        );
      case 1:
        return (
          <div className="RadioQuestion">
            {state.answerList.map((item, index) => (
              <TextBox
                label="Answer"
                value={item.answer as string}
                name={item.name as string}
                key={index}
                onChange={onAnswerChange}
              />
            ))}
            <Button icon labelPosition="left" onClick={addAnswer}>
              <Icon name="add square" />
              Add answer
            </Button>
          </div>
        );
      case 2:
        return null;
    }
  };

  return (
    <div className="SurveyForm">
      <Segment raised>
        <div className="Labels">
          <Label
            as="a"
            color="red"
            ribbon
            horizontal
            className={state.type === 0 ? "Active" : ""}
            onClick={() => {
              changeType(0);
            }}
          >
            CHECKBOX
          </Label>
          <Label
            as="a"
            color="blue"
            ribbon
            horizontal
            className={state.type === 1 ? "Active" : ""}
            onClick={() => {
              changeType(1);
            }}
          >
            RADIO
          </Label>
          <Label
            as="a"
            color="orange"
            ribbon
            horizontal
            className={state.type === 2 ? "Active" : ""}
            onClick={() => {
              changeType(2);
            }}
          >
            INPUT
          </Label>
        </div>
        <div className="QuestionContent">
          <TextBox
            label="Your question"
            name="question"
            onChange={onQuestionChange}
          />
          {renderForm(state.type)}
          <Button className="Submit" onClick={onSubmit}>
            Add
          </Button>
        </div>
      </Segment>
    </div>
  );
};

export default SurveyForm;
