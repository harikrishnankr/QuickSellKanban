import { useEffect, useMemo, useState } from "react";
import { DisplayData, KanbanHeader } from "./Header/KanbanHeader";
import {
  GroupingList,
  KanbanFilterState,
  Priority,
  SortingList,
} from "../../constants/kanban.constant";
import "./kanban-board.css";
import { Stack } from "./Stack/Stack";
import { useKanbanStack } from "../../hooks";

export interface Ticket {
  id: string;
  priority: Priority;
  status: string;
  tag: string[];
  title: string;
  userId: string;
  userData: User;
}

export interface User {
  available: boolean;
  id: string;
  name: string;
}

export interface TaskData {
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
  const savedDisplayData = useMemo(() => {
    try {
      const filterState = localStorage.getItem(KanbanFilterState);
      const data = filterState ? JSON.parse(localStorage.getItem(KanbanFilterState) as string) : null;
      return data;
    } catch(error) {
      console.error(error);
    }
  }, []);
  const [displayData, setDisplayData] = useState<DisplayData>(savedDisplayData ? savedDisplayData : {
    grouping: GroupingList[0].key,
    sorting: SortingList[0].key,
  });
  const { taskStack, loading, error } = useKanbanStack({ displayData });

  useEffect(() => {
    try {
      const data: string = JSON.stringify(displayData);
      localStorage.setItem(KanbanFilterState, data);
    } catch(error) {
      console.error(error);
    }
  }, [displayData]);

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
