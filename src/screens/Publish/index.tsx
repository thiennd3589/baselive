import Header from "components/Header";
import Sidebar from "components/Sidebar";
import { Global } from "global";
import { TicketInfo } from "interfaces/common";
import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { State } from "redux-saga/reducers";
import "./styles.scss";

interface PreviewItemInterface {
  image: string;
  title: string;
  startDate: string;
  ticket?: TicketInfo;
}

const PreviewItem = (props: PreviewItemInterface) => {
  return (
    <div className="PreviewItem">
      <div className="Image">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="Info">
        <h2>{props.title}</h2>
        <p>{props.startDate}</p>
        <p>${props.ticket?.ticketPrice}</p>
      </div>
    </div>
  );
};

const Publish = () => {
  const { eventInfo } = useSelector(
    (state: State) => ({
      eventInfo: state.basicInfoLocal,
    }),
    shallowEqual
  );

  useEffect(() => {
    console.log(eventInfo);
  }, [eventInfo]);

  return (
    eventInfo && (
      <div className="Publish">
        <Sidebar menus={Global.menu} active="/publish" />
        <div className="Main">
          <Header disableLogo />
          <div className="Content">
            <h1>Publish Your Event</h1>
            <PreviewItem
              image={eventInfo.eventImage as string}
              title={eventInfo.title as string}
              startDate={eventInfo.startDate as string}
              ticket={(eventInfo.ticketList as TicketInfo[])[0]}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Publish;
