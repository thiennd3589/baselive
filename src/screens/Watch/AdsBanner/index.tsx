import React from "react";
import "./styles.scss";
import { Button, Icon } from "semantic-ui-react";

interface AdsBannerProps {
  adsImage?: string;
  adsUrl?: string;
}

const AdsBanner = (props: AdsBannerProps) => {
  return (
    <div className={`${props.adsImage ? "AdsBanner HasImage" : "AdsBanner"}`}>
      {props.adsImage ? (
        <img src={props.adsImage} alt="banner" />
      ) : (
        <Icon name="images" />
      )}
    </div>
  );
};

export default AdsBanner;
