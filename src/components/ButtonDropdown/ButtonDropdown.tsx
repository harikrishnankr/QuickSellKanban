import "./button-dropdown.css";
import CaretDown from "../../assets/images/down.svg";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks";

interface ButtonDropdownProps {
  icon?: React.ReactNode | React.ReactElement;
  name: string;
  children: React.ReactElement;
}

export const ButtonDropdown: React.FC<ButtonDropdownProps> = (props) => {
  const { icon, name, children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div className="button-dropdown-wrapper" ref={dropdownRef}>
      <button className="button-dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
        {icon && <div className="button-dropdown__icon">{icon}</div>}
        <div className="button-dropdown__name">{name}</div>
        <div className="button-dropdown-caret__icon">
          <img alt="Down Caret Icon" src={CaretDown} />
        </div>
      </button>
      {isOpen && <div className="button-dropdown">{children}</div>}
    </div>
  );
};
