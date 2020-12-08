import Footer from "components/Footer";
import Header from "components/Header";
import { Obj } from "interfaces/common";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { querySingleEvent, queryTicket } from "redux-saga/global-actions";
import { State } from "redux-saga/reducers";
import { Icon, Modal } from "semantic-ui-react";
import Editor from "components/Editor";
import "./styles.scss";

const EventPage = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const eventInfo = useSelector((state: State) => state.event);
  const ticket = useSelector((state: State) => state.ticket);
  const [openCheckout, setOpencheckout] = useState(false);
  const ref = useRef<Obj>();
  const ticketRef = useRef<Obj[]>([]);
  const [, redraw] = useState({});
  const total = useRef(0);
  useEffect(() => {
    dispatch(querySingleEvent({ eventId: (param as Obj).id }));
    dispatch(queryTicket({ eventId: (param as Obj).id }));
  }, []);
  useEffect(() => {
    if (eventInfo && eventInfo.success) {
      console.log(eventInfo);
      ref.current = (eventInfo.response as Obj).data as Obj;
      redraw({});
    }
  }, [eventInfo]);
  useEffect(() => {
    if (ticket && ticket.success) {
      ticketRef.current = ((ticket.response as Obj).data as Obj[]).map(
        (ticket) => ({
          ...ticket,
          buyQuantity: 0,
        })
      );

      redraw({});
    }
  }, [ticket]);

  const onIncreaseTicket = (type: string, id: string | number) => {
    if (type === "add") {
      ticketRef.current = ticketRef.current.map((ticket) => {
        if (ticket.id === id) {
          total.current = total.current + parseInt(ticket.price as string);
        }
        return {
          ...ticket,
          buyQuantity:
            ticket.id === id
              ? (ticket.buyQuantity as number) + 1
              : ticket.buyQuantity,
        };
      });
    } else {
      ticketRef.current = ticketRef.current.map((ticket) => {
        if (ticket.id === id && total.current > 0) {
          total.current = total.current - parseInt(ticket.price as string);
        }
        return {
          ...ticket,
          buyQuantity:
            ticket.id === id
              ? (ticket.buyQuantity as number) > 0
                ? (ticket.buyQuantity as number) - 1
                : 0
              : ticket.buyQuantity,
        };
      });
    }
    redraw({});
  };
  return (
    <div className="EventPage">
      <Header />
      {ref.current && (
        <div className="Container">
          <div className="Background">
            <img
              src={
                ref.current.eventImage
                  ? (ref.current.eventImage as string)
                  : "https://picsum.photos/1920/1080"
              }
              alt={ref.current.title as string}
            />
          </div>
          <div className="Content">
            <div className="HeaderContent">
              <div className="Image">
                <img
                  src={
                    ref.current.eventImage
                      ? (ref.current.eventImage as string)
                      : "https://picsum.photos/1920/1080"
                    }
                  alt={ref.current.title as string}
                />
              </div>
              <div className="Info">
                <div className="Date">{ref.current.startDate}</div>
                <div className="Title">{ref.current.title}</div>
              </div>
            </div>
            <div className="Share">
              <div className="ShareButtons">
                <Icon name="share square" />
                <Icon name="heart outline" />
              </div>
              <Modal
                onClose={() => setOpencheckout(false)}
                onOpen={() => setOpencheckout(true)}
                open={openCheckout}
                trigger={<div className="TicketButton">Ticket</div>}
              >
                <div className="Left">
                  <Modal.Header>
                    <h3>{ref.current.title}</h3>
                    <span>
                      {ref.current.startDate}, {ref.current.startTime}
                    </span>
                  </Modal.Header>
                  <div className="Tickets">
                    {ticketRef.current.map((ticket, index) => (
                      <div className="Ticket" key={index}>
                        <div className="Info">
                          <div className="Title">{ticket.name}</div>
                          <div className="Price">
                            {ticket.price}
                            <sup>đ</sup>
                          </div>
                        </div>
                        <div className="Quantity">
                          {
                            <div
                              onClick={() =>
                                onIncreaseTicket(
                                  "subtract",
                                  ticket.id as number
                                )
                              }
                            >
                              <Icon name="caret left" />
                            </div>
                          }
                          <span>{ticket.buyQuantity}</span>
                          <div
                            onClick={() =>
                              onIncreaseTicket("add", ticket.id as number)
                            }
                          >
                            <Icon name="caret right" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="Checkout"
                    onClick={() => {
                      total.current = 0;
                      setOpencheckout(false);
                    }}
                  >
                    Check out
                  </div>
                </div>
                <div className="Right">
                  <div className="Image">
                    <img
                      src={ref.current.eventImage as string}
                      alt={ref.current.title as string}
                    />
                  </div>
                  <div className="BuyTickets">
                    {ticketRef.current.map(
                      (ticket, index) =>
                        (ticket.buyQuantity as number) > 0 && (
                          <div className="BuyQuantity" key={index}>
                            <div className="Info">
                              <div className="Quantity">
                                {ticket.buyQuantity}x
                              </div>
                              <div className="Title">{ticket.name}</div>
                            </div>
                            <div className="Price">
                              {ticket.price}
                              <sup>đ</sup>
                            </div>
                          </div>
                        )
                    )}
                    {total.current > 0 && (
                      <div className="Total">
                        <span>Total</span>
                        <span>
                          {total.current}
                          <sup>đ</sup>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Modal>
            </div>
            <div className="MainContent">
              <div className="Editor">
                <Editor value={ref.current.description} readonly />
                <div className="Tags">
                  <h3>Tag</h3>
                  <div>
                    {(ref.current.tags as string)
                      .split(",")
                      .map((tag, index) => (
                        <div className="Tag" key={index}>
                          {tag}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="SocialShare">
                  <h3>Share with friends</h3>
                  <div>
                    <Icon name="facebook square" />
                    <Icon name="twitter" />
                  </div>
                </div>
              </div>
              <div className="SubContent">
                <h3>Date and time</h3>
                <span>
                  {ref.current.startTime}, {ref.current.startDate}
                </span>
                <span>to</span>
                <span>
                  {ref.current.endTime}, {ref.current.endDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EventPage;
