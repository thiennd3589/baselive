import React from "react";
import { Divider, Icon, SemanticICONS } from "semantic-ui-react";
import "./styles.scss";

interface InforSectionContainerProps {
  icon?: SemanticICONS;
  className?: string;
  children?: JSX.Element | JSX.Element[] | string | string[];
  title?: string;
  subTitle?: string[];
}

const InforSectionContainer = (props: InforSectionContainerProps) => {
  return (
    <>
      <div className={`InforSectionContainer ${props.className}`}>
        <div className="Icon">
          <Icon name={props.icon} />
        </div>
        <div className="Content">
          <div className="Title">
            <div className="Text">
              <h2>{props.title}</h2>
              <span>
                {props.subTitle?.map((sub, index) => (
                  <p key={index}>
                    {sub} <br />
                  </p>
                ))}
              </span>
            </div>
          </div>
          {props.children}
        </div>
      </div>
      <Divider />
    </>
  );
};

export default InforSectionContainer;
