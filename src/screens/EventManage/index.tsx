import Header from "components/Header";
import Button from "elements/Button";
import { Obj } from "interfaces/common";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { queryUserEvent } from "redux-saga/global-actions";
import { State } from "redux-saga/reducers";
import { Icon } from "semantic-ui-react";
import EventItem from "./EventItem";
import "./styles.scss";

const EventManage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userEvent = useSelector((state: State) => state.userEvent);
  const events = useRef<Obj[]>([]);
  const [, redraw] = useState({});
  useEffect(() => {
    dispatch(queryUserEvent());
  }, []);
  useEffect(() => {
    if (userEvent && userEvent.success) {
      events.current = ((userEvent.response as Obj).data as Obj)
        .content as Obj[];
      redraw({});
    }
  }, [userEvent]);

  const createEvent = () => {
    history.push("/createEvent");
  };

  return (
    <div className="EventManage">
      <Header />
      <div className="Content">
        {events.current.length > 0 ? (
          <>
            <div className="AllEvent">
              <div className="Title">
                <h3>All tickets</h3>
                <Button
                  text="Create event"
                  onClick={createEvent}
                  className="ToggleCreateTicket"
                />
              </div>
              <div className="TableHeader EventItem">
                <div className="Detail">
                  <span>Event Information</span>
                </div>
                <div className="Info">
                  <div className="Quantity">Available</div>
                  <div className="Price">Price</div>
                  <div className="Status">Status</div>
                  <div className="More">More</div>
                </div>
              </div>
              {events.current.map((event, index) => (
                <EventItem
                  key={index}
                  event={event}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="Empty">
            <Icon name="credit card outline" />
            <h3>Let’s created events</h3>
            <Button
              text="Create event"
              onClick={createEvent}
              className="ToggleCreateTicket"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManage;
