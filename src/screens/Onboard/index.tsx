import EventCategory from "components/EventCategory";
import EventPicker from "components/EventPicker";
import Footer from "components/Footer";
import Header from "components/Header";
import { Obj } from "interfaces/common";
import React, { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  queryEventInHanoi,
  queryExperienceEvent,
  queryTrendingEvent,
} from "redux-saga/global-actions";
import { State } from "redux-saga/reducers";
import { Rating } from "semantic-ui-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./styles.scss";
import { useHistory } from "react-router-dom";

interface EventItemProps {
  id: string | number;
  image?: string;
  title: string;
  category: Obj;
}

const EventItem = (props: EventItemProps) => {
  const history = useHistory();
  const redirect = () => {
    history.push(`/event/${props.id}`);
  };

  return (
    <div className="EventItem" onClick={redirect}>
      <div className="Image">
        <img
          src={props.image ? props.image : "https://picsum.photos/1920/1080"}
          alt={props.title}
        />
      </div>
      <div className="Info">
        {props.category && (
          <div className="Category">{props.category.name}</div>
        )}
        <div className="Title">{props.title}</div>
        <Rating icon="star" defaultRating={3} maxRating={4} />
      </div>
    </div>
  );
};

const Onboard = () => {
  const dispatch = useDispatch();
  const {
    trendingEvent,
    category,
    experienceEvent,
    eventInHanoi,
  } = useSelector(
    (state: State) => ({
      trendingEvent: state.trendingEvent,
      experienceEvent: state.experieneEvent,
      eventInHanoi: state.eventInHanoi,
      category: state.category,
    }),
    shallowEqual
  );
  const [, redraw] = useState({});
  const ref = useRef<{
    trendingEvent: Obj[];
    experienceEvent: Obj[];
    eventInHanoi: Obj[];
  }>({ trendingEvent: [], experienceEvent: [], eventInHanoi: [] });

  useEffect(() => {
    dispatch(queryTrendingEvent());
    dispatch(queryEventInHanoi());
    dispatch(queryExperienceEvent());
  }, []);

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

  useEffect(() => {
    if (experienceEvent && experienceEvent.success) {
      ref.current.experienceEvent = (((experienceEvent.response as Obj)
        .data as Obj).content as Obj[]).map((event) => {
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
  }, [experienceEvent]);

  useEffect(() => {
    if (eventInHanoi && eventInHanoi.success) {
      ref.current.eventInHanoi = (((eventInHanoi.response as Obj).data as Obj)
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
  }, [eventInHanoi]);

  useEffect(() => {
    console.log(category);
  }, [category]);

  const renderEvents = (name: string, events: Obj[]) => {
    return (
      <div className="Events">
        <div className="Title">{name}</div>
        <div className="EventsContainer">
          <Carousel
            responsive={{
              extraLarge: {
                breakpoint: { max: 3000, min: 1500 },
                items: 5,
                paritialVisibilityGutter: 60,
              },
              desktop: {
                breakpoint: { max: 1500, min: 1024 },
                items: 4,
                paritialVisibilityGutter: 60,
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                paritialVisibilityGutter: 50,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                paritialVisibilityGutter: 30,
              },
            }}
          >
            {events.map((event, index) => (
              <EventItem
                id={event.id as number}
                title={event.title as string}
                image={event.image as string}
                category={event.category as Obj}
                key={index}
              />
            ))}
          </Carousel>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="Onboard">
        <div className="Title">
          <h1 className="Text">
            <p>Baselive</p>
            <p>A unique virual online video streaming platform </p>
          </h1>
          <EventPicker />
        </div>
        <div className="Content">
          <EventCategory />
          {ref.current.trendingEvent.length > 0 &&
            renderEvents("Trending event", ref.current.trendingEvent)}
          {ref.current.experienceEvent.length > 0 &&
            renderEvents("Experiences for you", ref.current.experienceEvent)}
          {ref.current.eventInHanoi.length > 0 &&
            renderEvents("Explore in Hanoi city", ref.current.eventInHanoi)}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Onboard;
