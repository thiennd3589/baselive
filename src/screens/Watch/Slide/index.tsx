import React from "react";
import "./styles.scss";

interface SlideProps {
  slideUrl?: string;
}

const Slide = (props: SlideProps) => {
  return (
    <div className="Slide">
      <div className="Content">
        <iframe
          src={
            props.slideUrl
              ? props.slideUrl.replace('pub','embed')
              : "https://docs.google.com/presentation/d/e/2PACX-1vQVBICFYFy2AEOAc1uBH2hcgAPHc5vFBnahyUR0p2NtrWZ7h8Izf9kVKD3AUVUlvXArRX9V9Y6WpEvW/embed?start=true&loop=true&delayms=10000"
          }
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Slide;
