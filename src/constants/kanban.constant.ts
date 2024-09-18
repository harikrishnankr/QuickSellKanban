import NoPriorityIcon from "../assets/images/No-priority.svg";
import LowIcon from "../assets/images/Img - Low Priority.svg";
import MediumIcon from "../assets/images/Img - Medium Priority.svg";
import HighIcon from "../assets/images/Img - High Priority.svg";
import UrgentIcon from "../assets/images/SVG - Urgent Priority colour.svg";
import BacklogIcon from "../assets/images/Backlog.svg";
import TodoIcon from "../assets/images/To-do.svg";
import InProgressIcon from "../assets/images/in-progress.svg";
import DoneIcon from "../assets/images/Done.svg";
import CancelledIcon from "../assets/images/Cancelled.svg";

export enum Priority {
  NoPriority,
  Low,
  Medium,
  High,
  Urgent,
}

/**
 * Eg: lowPriorityText = PriorityMap[Priority.Low]
 */
export const PriorityMap = ["No priority", "Low", "Medium", "High", "Urgent"];

export const PrioritySortOrder = [Priority.NoPriority, Priority.Urgent, Priority.High, Priority.Medium, Priority.Low];

export const PriorityIconMap = {
  "No priority": NoPriorityIcon,
  "Low": LowIcon,
  "Medium": MediumIcon,
  "High": HighIcon,
  "Urgent": UrgentIcon,
};

export const StatusMap = [
  "Backlog",
  "Todo",
  "In progress",
  "Done",
  "Cancelled",
];

export const StatusIconMap = {
  "Backlog": BacklogIcon,
  "Todo": TodoIcon,
  "In progress": InProgressIcon,
  "Done": DoneIcon,
  "Cancelled": CancelledIcon,
};

export const GroupingList = [
  {
    key: "status",
    label: "Status",
  },
  {
    key: "userId",
    label: "User",
  },
  {
    key: "priority",
    label: "Priority",
  },
];

export const SortingList = [
  {
    key: "priority",
    label: "Priority",
  },
  {
    key: "title",
    label: "Title",
  },
];

export const KanbanFilterState = "KanbanFilterState";
