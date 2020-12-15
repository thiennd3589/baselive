import Loader from "components/Loader";
import { Obj } from "interfaces/common";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryCategory } from "redux-saga/global-actions";
import { State } from "redux-saga/reducers";
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

  useEffect(() => {}, [category]);

  const requestData = () => {
    dispatch(
      queryCategory({ type: "category", referTableId: "", referTableName: "" })
    );
  };

  return category && category.success ? (
    <div className="EventCategory">
      <div className="Title">
        <span>Explore Online event</span>
      </div>
      <div className="Category">
        {category &&
          category.success &&
          ((category.response as Obj).data as Obj[])
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
  ) : (
    <Loader />
  );
};

export default EventCategory;
