import React, { useState } from "react";
import AdsBanner from "./AdsBanner";
import QaA from "./QaA";
import Resources from "./Resource";
import Slide from "./Slide";
import SpeakerBio from "./SpeakerBio";
import Survey from "./Survey";
import Video from "./Video";
import "./styles.scss";
import DropZone from "./DropZone";
import Header from "components/Header";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

// enum COMPONENT {
//   ADS_BANNER = "ADS_BANNER",
//   QA = "QA",
//   RESOURCES = "RESOURCES",
//   SLIDE = "SLIDE",
//   SPEAKER_BIO = "SPEAKER_BIO",
//   SURVEY = "SURVEY",
//   VIDEO = "VIDEO",
// }

// const mapStateToComponent = (comp: string) => {
//   switch (comp) {
//     case COMPONENT.ADS_BANNER:
//       return <AdsBanner />;
//     case COMPONENT.QA:
//       return <QaA />;
//     case COMPONENT.RESOURCES:
//       return <Resources />;
//     case COMPONENT.SLIDE:
//       return <Slide />;
//     case COMPONENT.SPEAKER_BIO:
//       return <SpeakerBio />;
//     case COMPONENT.SURVEY:
//       return <Survey />;
//     case COMPONENT.VIDEO:
//       return <Video />;
//     default:
//       return <Video />;
//   }
// };

const resourceList = [
  { url: "Branding strategy.docx", icon: "file word" as SemanticICONS },
  { url: "Branding strategy.docx", icon: "file word" as SemanticICONS },
  { url: "Branding strategy.docx", icon: "file word" as SemanticICONS },
  { url: "Branding strategy.docx", icon: "file word" as SemanticICONS },
  { url: "Branding strategy.docx", icon: "file word" as SemanticICONS },
];

const Watch = () => {
  const onDrag = (event: React.DragEvent<HTMLDivElement>, sourceId: string) => {
    event.dataTransfer.setData("id", sourceId);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, targetId: string) => {
    const sourceId = event.dataTransfer.getData("id");
    let source = document.getElementById(sourceId);
    let target = document.getElementById(targetId);
    let temp = target!.innerHTML;
    console.log(typeof temp);
    target!.innerHTML = source!.innerHTML;
    source!.innerHTML = temp;
  };

  return (
    <div className="Watch">
      <Header />
      <div className="View">
        <div className="LeftSection">
          <DropZone
            id={"top-left"}
            onItemDrag={onDrag}
            onItemDrop={onDrop}
            title="Livestream media"
          >
            <Video />
          </DropZone>
          <DropZone
            id={"bottom-left"}
            onItemDrag={onDrag}
            onItemDrop={onDrop}
            title="Survey"
          >
            <Survey />
          </DropZone>
        </div>
        <div className="CenterSection">
          <div className="TopCenter">
            <DropZone
              id={"top-center"}
              onItemDrag={onDrag}
              onItemDrop={onDrop}
              title="Slide"
            >
              <Slide />
            </DropZone>
          </div>
          <div className="BottomCenter">
            <DropZone
              id={"bottom-left-center"}
              onItemDrag={onDrag}
              onItemDrop={onDrop}
              title="Resources list"
            >
              <Resources resources={resourceList} />
            </DropZone>
            <DropZone
              id={"bottom-right-center"}
              onItemDrag={onDrag}
              onItemDrop={onDrop}
              title={`Q&A`}
            >
              <QaA />
            </DropZone>
          </div>
        </div>
        <div className="RightSection">
          <DropZone
            id={"top-right"}
            onItemDrag={onDrag}
            onItemDrop={onDrop}
            title="Speaker Bio"
          >
            <SpeakerBio />
          </DropZone>
          <DropZone
            id={"bottom-right"}
            onItemDrag={onDrag}
            onItemDrop={onDrop}
            title="Action to call"
          >
            <AdsBanner />
          </DropZone>
        </div>
      </div>
    </div>
  );
};

export default Watch;
