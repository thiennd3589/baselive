import React from "react";
import { Icon, SemanticICONS } from "semantic-ui-react";
import "./styles.scss";

interface ResourcesProps {
  resources: { url: string; icon: SemanticICONS }[];
}

const Resources = (props: ResourcesProps) => {
  return (
    <div className="Resources">
      {props.resources.map((res, index) => (
        <div className="ResourceItem" key={index}>
          <Icon name={res.icon} />
          <span>{res.url}</span>
        </div>
      ))}
    </div>
  );
};

export default Resources;
