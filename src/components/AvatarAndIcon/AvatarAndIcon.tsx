import { PriorityIconMap, StatusIconMap } from "../../constants/kanban.constant";
import "./avatar-and-icon.css";

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

export function AvatarAndIcon(props: IconProps) {
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