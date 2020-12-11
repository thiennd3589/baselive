import { Obj } from "interfaces/common";
import React, { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { State } from "redux-saga/reducers";
import { queryTrendingEvent } from "redux-saga/global-actions";
import { EventItem } from "screens/Onboard";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const Discover = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { trendingEvent, category } = useSelector(
    (state: State) => ({
      trendingEvent: state.trendingEvent,
      category: state.category,
    }),
    shallowEqual
  );
  const ref = useRef<{
    trendingEvent: Obj[];
  }>({ trendingEvent: [] });

  const [, redraw] = useState({});

  useEffect(() => {
    dispatch(queryTrendingEvent());
  }, []);

  const onClick = () => {
    history.push("/onboard");
  };

  useEffect(() => {
    if (trendingEvent && trendingEvent.success) {
      ref.current.trendingEvent = (((trendingEvent.response as Obj).data as Obj)
        .content as Obj[]).map((event) => {
        return {
          title: event.title,
          category: ((category!.response as Obj).data as Obj[]).find(
            (item) => item.id === event.categoryId
          ),
          image: event.eventImage,
          id: event.id,
        };
      });
      redraw({});
    }
  }, [trendingEvent]);
  return (
    <div className="Discover">
      <div className="Title" data-aos="zoom-in" >
        <h2>{t("K_26")}</h2>
      </div>
      <div className="EventNav">
        <h3 data-aos="fade-right">Most common</h3>
        <div className="NavButton" onClick={onClick} data-aos="fade-left">
          <span>See all</span>
          <Icon name="angle right" />
        </div>
      </div>
      <div className="EventsLanding" data-aos="fade-up">
        {ref.current.trendingEvent.slice(0, 8).map((event, index) => (
          <div className="Item" key={index}>
            <EventItem
              id={event.id as number}
              title={event.title as string}
              image={event.image as string}
              category={event.category as Obj}
              onClick={onClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
