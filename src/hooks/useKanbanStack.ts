import { DisplayData } from '../pages/Kanban/Header/KanbanHeader';
import { useEffect, useState } from "react";
import { TaskData, TaskStack, Ticket } from "../pages/Kanban/KanbanBoard";
import { GET_TASKS } from "../constants/http.constant";
import { PriorityMap, PrioritySortOrder, StatusMap } from '../constants/kanban.constant';
import useFetch from './useFetch';

interface KanbanStackHook {
  displayData: DisplayData
}

export function useKanbanStack({ displayData }: KanbanStackHook) {
  const [masterTaskData, loading, error] = useFetch<TaskData>(GET_TASKS);
  const [taskStack, setTaskStack] = useState<TaskStack[]>([]);

  useEffect(() => {
    if (!loading && !error && masterTaskData) {
      const users: any = {};
      const groupedData: any = {};
      let groupingAttribute = displayData.grouping;

      /**
       * Creating User Map for ease of access
       */
      masterTaskData.users.forEach((user) => {
        users[user.id] = user;
      });

      /**
       * Grouping the task based Status, User and Priority
       */
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
        /**
         * For Maintaining the correct status order and filing the status that are not present in API response
         */
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
        /**
         * Sorting by Username
         */
        taskStack = Object.keys(users)
          .map((userKey) => users[userKey])
          .sort((a, b) =>  a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          .map((user) => ({
            ...groupedData[user.id],
            userAvailable: user.available,
          }));
      } else if (groupingAttribute === "priority") {
        /**
         * For maintaining the priority order and filing the priority that are not present in API response
         */
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
      /**
       * For Sorting base on Priority or Title
       */
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
      setTaskStack(taskStack);
    }
  }, [displayData, masterTaskData, loading, error]);

  return { taskStack, loading, error};
}
