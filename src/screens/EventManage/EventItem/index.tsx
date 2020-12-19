import { EventInfo, Obj, TicketInfo } from "interfaces/common";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  queryCategory,
  queryCategoryType,
  querySingleEvent,
  saveEventBasicInfo,
} from "redux-saga/global-actions";
import { State } from "redux-saga/reducers";
import { Icon, Popup } from "semantic-ui-react";
import "./styles.scss";

interface EventItemProps {
  event: Obj;
}

const EventItem = (props: EventItemProps) => {
  const { event } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const { category, categoryType, eventInfo } = useSelector(
    (state: State) => ({
      category: state.category,
      categoryType: state.categoryType,
      eventInfo: state.event,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(
      queryCategory({ type: "category", referTableId: "", referTableName: "" })
    );
    dispatch(
      queryCategoryType({
        type: "categoryType",
        referTableId: "",
        referTableName: "",
      })
    );
  }, []);

  useEffect(() => {
    if (eventInfo && eventInfo.success && redirect) {
      if (
        categoryType &&
        categoryType.success &&
        category &&
        category.success
      ) {
        const eventData = (eventInfo.response as Obj).data as Obj;
        const categoryParam = ((category!.response as Obj).data as Obj[]).find(
          (item) => item.id === eventData.categoryId
        );
        const categoryTypeParam = ((categoryType!.response as Obj)
          .data as Obj[]).find((item) => item.id === eventData.categoryTypeId);
        const param: Obj = {
          id: eventData.id as number,
          tags: (eventData.tags as string).split(","),
          title: eventData.title as string,
          category: {
            key: categoryParam!.id,
            text: categoryParam!.name,
            value: categoryParam!.name,
            id: categoryParam!.id,
          },
          categoryType: {
            key: categoryTypeParam!.id,
            text: categoryTypeParam!.name,
            value: categoryTypeParam!.name,
            id: categoryTypeParam!.id,
          },
          eventImage: eventData.eventImage,
          eventStart: eventData.startDate as string,
          eventEnd: eventData.endDate as string,
          endTime: eventData.endTime as string,
          startTime: eventData.startTime as string,
          summary: eventData.summary as string,
          description: eventData.description,
          publishDate: eventData.publishDate as string,
          publishTime: eventData.publishTime as string,
          googleSlideUrl: eventData.googleSlideUrl as string,
          livestreamUrl: eventData.livestreamUrl as string,
          documentList: eventData.documentList as Obj[],
          adsImage: eventData.adsImage as string,
          adsUrl: eventData.adsUrl as string,
          ticketList: eventData.ticketList as TicketInfo[],
          questionList: eventData.questionList,
        };
        dispatch(saveEventBasicInfo(param));
        history.push("/basicInfo");
      }
    }
  }, [eventInfo]);

  const view = () => {
    history.push(`/event/${props.event.id}`);
  };

  const edit = () => {
    dispatch(querySingleEvent({ eventId: props.event.id }));
    setRedirect(true);
  };
  return (
    <div className="EventItem">
      <div className="Information">
        <div className="Image">
          <img
            src={
              event.eventImage
                ? (event.eventImage as string)
                : "https://picsum.photos/300/200"
            }
            alt={event.eventId as string}
          />
        </div>
        <div className="EventDetail">
          <h3>{event.title}</h3>
          <span>{event.startDate}</span>
          <span>{event.endDate}</span>
        </div>
      </div>
      <div className="Stats">
        <div className="TicketRemain">
          {`${
            (event.ticketList as Obj[]).length > 0
              ? (event.ticketList as Obj[]).reduce((prev, current) => {
                  return {
                    available:
                      (prev.available as number) +
                      (current.available as number),
                  };
                }).available
              : 0
          }/${
            (event.ticketList as Obj[]).length > 0
              ? (event.ticketList as Obj[]).reduce((prev, current) => {
                  return {
                    quantity:
                      (prev.quantity as number) + (current.quantity as number),
                  };
                }).quantity
              : 0
          }`}
        </div>
        <div className="Price">
          {(event.ticketList as Obj[])[0]
            ? ((event.ticketList as Obj[])[0].price as string)
            : 0}
          <sup>vnđ</sup>
        </div>
        <div className="Status">
          {event.status === 0 ? "Unrealease" : "Public"}
        </div>
        <div className="More">
          <Popup trigger={<Icon name="ellipsis vertical" />} on="click">
            <Popup.Content className="EventItemPopup">
              <div onClick={view}>View</div>
              <div onClick={edit}>Edit</div>
            </Popup.Content>
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
