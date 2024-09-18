import { PriorityMap } from "../../../constants/kanban.constant";
import { Ticket } from "../KanbanBoard";
import { AvatarAndIcon } from "../../../components/AvatarAndIcon/AvatarAndIcon";
import "./card.css";

interface CardProps {
  data: Ticket;
  groupingAttribute: string;
}

export function Card(props: CardProps) {
  const { data, groupingAttribute } = props;

  return (
    <div className="task-card">
      <div className="row row1">
        <div className="task-card__id">{data.id}</div>
        {groupingAttribute !== "userId" && (
          <AvatarAndIcon
            groupingAttribute="userId"
            value={data.userData.name}
            isAvailable={data.userData.available}
          />
        )}
      </div>
      <div className="row row2">
        {groupingAttribute !== "status" && (
          <AvatarAndIcon
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
            <AvatarAndIcon
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
