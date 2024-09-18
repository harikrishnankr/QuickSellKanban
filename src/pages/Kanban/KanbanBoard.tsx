import { useEffect, useState } from "react";
import { DisplayData, KanbanHeader } from "./Header/KanbanHeader";
import {
  GroupingList,
  Priority,
  PriorityMap,
  PrioritySortOrder,
  SortingList,
  StatusMap,
} from "../../constants/kanban.constant";
import { useFetch } from "../../hooks";
import { GET_TASKS } from "../../constants/http.constant";
import "./kanban-board.css";
import { Stack } from "./Stack/Stack";

export interface Ticket {
  id: string;
  priority: Priority;
  status: string;
  tag: string[];
  title: string;
  userId: string;
  userData: User;
}

interface User {
  available: boolean;
  id: string;
  name: string;
}

interface TaskData {
  tickets: Ticket[];
  users: User[];
}

export interface TaskStack {
  title: string;
  groupingAttribute: string;
  tasks: any[];
  userAvailable: boolean;
}

export function KanbanBoard() {
  const [displayData, setDisplayData] = useState<DisplayData>({
    grouping: GroupingList[0].key,
    sorting: SortingList[0].key,
  });
  const [masterTaskData, loading, error] = useFetch<TaskData>(GET_TASKS);
  const [taskStack, setTaskStack] = useState<TaskStack[]>([]);

  useEffect(() => {
    if (!loading && !error && masterTaskData) {
      const users: any = {};
      const groupedData: any = {};
      let groupingAttribute = displayData.grouping;
      masterTaskData.users.forEach((user) => {
        users[user.id] = user;
      });
      masterTaskData.tickets.forEach((ticket: Ticket) => {
        const groupingData = (ticket as any)[groupingAttribute];
        if (!groupedData[groupingData]) {
          let title = "";
          if (groupingAttribute === "status") {
            title = ticket[groupingAttribute];
          } else if (groupingAttribute === "userId") {
            title = users[ticket[groupingAttribute]].name;
          } else if (groupingAttribute === "priority") {
            title = PriorityMap[ticket[groupingAttribute]];
          }
          groupedData[groupingData] = {
            title,
            groupingAttribute,
            tasks: [],
          };
        }
        groupedData[groupingData].tasks.push({
          ...ticket,
          userData: users[ticket.userId],
        });
      });
      let taskStack = [];
      if (groupingAttribute === "status") {
        taskStack = StatusMap.map((status) => {
          if (groupedData[status]) {
            return groupedData[status];
          }

          return {
            title: status,
            userAvailable: false,
            groupingAttribute,
            tasks: [],
          };
        });
      } else if (groupingAttribute === "userId") {
        taskStack = Object.keys(users)
          .map((userKey) => users[userKey])
          .sort((a, b) =>  a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          .map((user) => ({
            ...groupedData[user.id],
            userAvailable: user.available,
          }));
      } else if (groupingAttribute === "priority") {
        taskStack = PrioritySortOrder.map((priority) => {
          if (groupedData[priority]) {
            return groupedData[priority];
          }

          return {
            title: PriorityMap[priority],
            groupingAttribute,
            tasks: [],
          };
        });
      }
      taskStack = taskStack.map(stack => {
        return {
          ...stack,
          tasks: stack.tasks.sort((t1: Ticket, t2: Ticket) => {
            if (displayData.sorting === "priority") {
              return t2.priority - t1.priority
            } else if (displayData.sorting === "title") {
              return t1.title.toLowerCase().localeCompare(t2.title.toLowerCase());
            }
          })
        }
      })
      console.log(taskStack);
      setTaskStack(taskStack);
    }
  }, [displayData, masterTaskData, loading, error]);

  const onChange = (data: any) => {
    setDisplayData({
      ...displayData,
      ...data,
    });
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <KanbanHeader displayData={displayData} onChange={onChange} />
      <div className="kanban-scroll">
        <div className="kanban-stacks-wrapper">
          {
            taskStack.map(stack => <Stack key={stack.title} data={stack} />)
          }
        </div>
      </div>
    </>
  );
}
