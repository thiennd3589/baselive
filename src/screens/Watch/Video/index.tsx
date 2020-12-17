import React from "react";
import "./styles.scss";

interface VideoProps {
  videoId?: string;
}

const Video = (props: VideoProps) => {
  console.log(props.videoId);
  return (
    <div className="Video">
      <div className="Content">
        <iframe
          src={`https://www.youtube.com/embed/${
            props.videoId ? props.videoId : "5qap5aO4i9A"
          }?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
