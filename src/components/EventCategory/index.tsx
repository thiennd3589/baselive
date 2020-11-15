import { Obj } from "interfaces/common";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "redux-saga/reducers";
import { queryCategory } from "redux-saga/global-actions";
import "./styles.scss";

interface CategoryItemProps {
  image?: string;
  name: string;
}

const CategoryItem = (props: CategoryItemProps) => {
  return (
    <div className="CategoryItem">
      <div className="Image">
        <img
          src={`${props.image ? props.image : `https://picsum.photos/300/200`}`}
          alt={props.name}
        />
      </div>
      <div className="Title">{props.name}</div>
    </div>
  );
};

const EventCategory = () => {
  const dispatch = useDispatch();
  const category = useSelector((state: State) => state.category);

  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    console.log(category);
  }, [category]);

  const requestData = () => {
    dispatch(queryCategory({ type: 1 }));
  };

  return (
    <div className="EventCategory">
      <div className="Title">
        <span>Explore Online event</span>
      </div>
      <div className="Category">
        {category &&
          category.success &&
          (category.response as Obj[])
            .slice(0, 3)
            .map((item) => (
              <CategoryItem
                name={item.name as string}
                image={item.image as string}
                key={item.id as number}
              />
            ))}
      </div>
    </div>
  );
};

export default EventCategory;
