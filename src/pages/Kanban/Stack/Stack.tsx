import React from "react";
import { TaskStack } from "../KanbanBoard";
import "./stack.css";
import AddIcon from "../../../assets/images/add.svg";
import MoreIcon from "../../../assets/images/3 dot menu.svg";
import { Card } from "./Card";
import { AvatarAndIcon } from "../../../components/AvatarAndIcon/AvatarAndIcon";

interface StackProps {
  data: TaskStack;
}

function StackHeader({ data }: { data: TaskStack }) {
  return (
    <div className="stack-header">
      <div className="stack-left">
        <div className="stack-left__icon">
          <AvatarAndIcon
            groupingAttribute={data.groupingAttribute}
            value={data.title}
            isAvailable={data.userAvailable}
          />
        </div>
        <div className="stack-left__title">{data.title}</div>
        <div className="stack-left__count">{data.tasks?.length}</div>
      </div>
      <div className="stack-right">
        <button className="stack-right__icon">
          <img alt="Add Icon" src={AddIcon} />
        </button>
        <button className="stack-right__icon">
          <img alt="More Icon" src={MoreIcon} />
        </button>
      </div>
    </div>
  );
}

export const Stack: React.FC<StackProps> = (props) => {
  const { data } = props;

  return (
    <div className="stack">
      <StackHeader data={data} />
      <div className="stack-list">
        {data?.tasks?.map((task) => (
          <Card
            key={task.id}
            data={task}
            groupingAttribute={data.groupingAttribute}
          />
        ))}
      </div>
    </div>
  );
};
