import React from "react";
import { Icon } from "semantic-ui-react";
import "./styles.scss";

interface DropZoneProps {
  id: string;
  children: JSX.Element;
  title?: string;
  onItemDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onItemDrop?: (
    event: React.DragEvent<HTMLDivElement>,
    targetId: string
  ) => void;
  onItemDrag?: (
    event: React.DragEvent<HTMLDivElement>,
    sourceId: string
  ) => void;
}

const DropZone = (props: DropZoneProps) => {
  const onItemDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    props.onItemDragOver && props.onItemDragOver(event);
  };

  const onItemDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    props.onItemDrop && props.onItemDrop(event, props.id);
  };

  const onItemDrag = (event: React.DragEvent<HTMLDivElement>) => {
    props.onItemDrag && props.onItemDrag(event, props.id);
  };
  return (
    <div className="DropZone" onDragOver={onItemDragOver} onDrop={onItemDrop}>
      <div
        className="DragZone"
        id={props.id}
        draggable
        onDragStart={onItemDrag}
      >
        <div className="Move">
          <div className="Title">{props.title}</div>
          <Icon name='move' />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default DropZone;
