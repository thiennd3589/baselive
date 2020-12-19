import React from "react";
import "./styles.scss";
import { Icon } from "semantic-ui-react";

interface AdsBannerProps {
  adsImage?: string;
  adsUrl?: string;
}

const AdsBanner = (props: AdsBannerProps) => {
  return (
    <div className={`${props.adsImage ? "AdsBanner HasImage" : "AdsBanner"}`}>
      <a href={props.adsUrl ? props.adsUrl : "#"}>
        {props.adsImage ? (
          <img src={props.adsImage} alt="banner" />
        ) : (
          <Icon name="images" />
        )}
      </a>
    </div>
  );
};

export default AdsBanner;
