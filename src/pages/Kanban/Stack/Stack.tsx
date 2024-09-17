import React from "react";
import { TaskStack, Ticket } from "../KanbanBoard";
import "./stack.css";
import {
  PriorityIconMap,
  PriorityMap,
  StatusIconMap,
} from "../../../constants/kanban.constant";
import AddIcon from "../../../assets/images/add.svg";
import MoreIcon from "../../../assets/images/3 dot menu.svg";

interface StackProps {
  data: TaskStack;
}

interface IconProps {
  groupingAttribute: string;
  value: string | number | boolean;
  isAvailable: boolean;
}

const getRandomHexColor = (name: string) => {
  let hash = 0;

  // Generate a simple hash from the name
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to hex color
  const hexColor =
    ((hash >> 24) & 0xff).toString(16) +
    ((hash >> 16) & 0xff).toString(16) +
    ((hash >> 8) & 0xff).toString(16);

  return `#${hexColor.padStart(6, "0")}`;
};

function Icon(props: IconProps) {
  if (props.groupingAttribute === "status") {
    return (
      <img
        alt={props.value as string}
        src={(StatusIconMap as any)[props.value as string]}
      />
    );
  } else if (props.groupingAttribute === "userId") {
    let nameInitial = "";
    if (props.value) {
      const [first, second] = (props.value as string).split(" ");
      nameInitial = `${first[0]}${second ? second[0] : ""}`;
    }
    return (
      <div
        className="avatar"
        style={{ background: getRandomHexColor(props.value as string) }}
      >
        {nameInitial}
        {props.isAvailable ? (
          <div className="online"></div>
        ) : (
          <div className="offline"></div>
        )}
      </div>
    );
  } else if (props.groupingAttribute === "priority") {
    return (
      <img
        alt={props.value as string}
        src={(PriorityIconMap as any)[props.value as string]}
      />
    );
  }

  return <></>;
}

function StackHeader({ data }: { data: TaskStack }) {
  return (
    <div className="stack-header">
      <div className="stack-left">
        <div className="stack-left__icon">
          <Icon
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

interface CardProps {
  data: Ticket;
  groupingAttribute: string;
}

function Card(props: CardProps) {
  const { data, groupingAttribute } = props;

  return (
    <div className="task-card">
      <div className="row row1">
        <div className="task-card__id">{data.id}</div>
        {groupingAttribute !== "userId" && (
          <Icon
            groupingAttribute="userId"
            value={data.userData.name}
            isAvailable={data.userData.available}
          />
        )}
      </div>
      <div className="row row2">
        {groupingAttribute !== "status" && (
          <Icon
            groupingAttribute="status"
            value={data.status}
            isAvailable={false}
          />
        )}
        {
          <div
            className="task-card__title"
            style={{
              marginLeft: groupingAttribute !== "status" ? "7px" : "0px",
            }}
          >
            {data.title}
          </div>
        }
      </div>
      <div className="row row3">
        {groupingAttribute !== "priority" && (
          <div className="task-card__border">
            <Icon
              groupingAttribute="priority"
              value={PriorityMap[data.priority]}
              isAvailable={false}
            />
          </div>
        )}
        <div className="task-card-tag-wrapper">
          {
            data.tag.map(tag => <div key={tag} className="task-card-tag">
              <div className="circle"></div>
              {tag}
            </div>)
          }
        </div>
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
