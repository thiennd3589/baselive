import { EventInfo, Obj, TicketInfo } from "interfaces/common";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  queryCategory,
  queryCategoryType,
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
  const { category, categoryType } = useSelector(
    (state: State) => ({
      category: state.category,
      categoryType: state.categoryType,
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

  const view = () => {
    history.push(`/event/${props.event.id}`);
  };

  const edit = () => {
    if (categoryType && categoryType.success && category && category.success) {
      const categoryParam = ((category!.response as Obj).data as Obj[]).find(
        (item) => item.id === event.categoryId
      );
      const categoryTypeParam = ((categoryType!.response as Obj)
        .data as Obj[]).find((item) => item.id === event.categoryTypeId);
      const param: Obj = {
        id: event.id as number,
        tags: (event.tags as string).split(","),
        title: event.title as string,
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
        eventImage: event.eventImage,
        eventStart: event.startDate as string,
        eventEnd: event.endDate as string,
        endTime: event.endTime as string,
        startTime: event.startTime as string,
        summary: event.summary as string,
        description: event.description,
        publishDate: event.publishDate as string,
        publishTime: event.publishTime as string,
        googleSlideUrl: event.googleSlideUrl as string,
        livestreamUrl: event.livestreamUrl as string,
        documentList: event.documentList as Obj[],
        adsImage: event.adsImage as string,
        adsUrl: event.adsUrl as string,
        ticketList: event.ticketList as TicketInfo[],
      };
      console.log(event);
      console.log(param);
      dispatch(saveEventBasicInfo(param));
      history.push("/basicInfo");
    }
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
            alt={event.title as string}
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
