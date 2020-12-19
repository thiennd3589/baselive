import TextBox from "elements/TextBox";
import { Obj } from "interfaces/common";
import React from "react";
import { Checkbox, Radio } from "semantic-ui-react";
import "./styles.scss";

interface SurveyProps {
  questionList?: Obj[];
}

const Survey = (props: SurveyProps) => {
  return (
    <div className="Survey">
      <div className="Content">
        {props.questionList ? (
          props.questionList.map((item, index) => {
            switch (item.type) {
              case 0:
                return (
                  <div className="RadioGroup" key={index}>
                    <div className="Question">{item.question}</div>
                    {(item.answerList as Obj[]).map((radio, index) => {
                      return (
                        <Radio
                          label={radio.answer}
                          name={item.question as string}
                          value={radio.answer as string}
                          key={index}
                        />
                      );
                    })}
                  </div>
                );
              case 1:
                return (
                  <div className="CheckboxGroup" key={index}>
                    <div className="Question">{item.question}</div>
                    {(item.answerList as Obj[]).map((checkbox, index) => {
                      return (
                        <Checkbox
                          label={checkbox.answer}
                          name={item.question as string}
                          value={checkbox.answer as string}
                          key={index}
                        />
                      );
                    })}
                  </div>
                );
              case 2:
                return (
                  <div className="InputQuestion">
                    <div className="Question">{item.question}</div>
                    <TextBox label="Answer" />
                  </div>
                );
            }
          })
        ) : (
          <div>You have no question</div>
        )}
      </div>
    </div>
  );
};

export default Survey;
