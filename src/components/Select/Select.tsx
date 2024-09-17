import React, { ChangeEvent, Key, useRef, useState } from "react";
import "./select.css";
import CaretDown from "../../assets/images/down.svg";
import { useClickOutside } from "../../hooks";

export interface Option {
  key: string | number | boolean;
  label: string;
}

interface SelectProps {
  name: string;
  value: any;
  options: Option[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => any;
}

export const Select: React.FC<SelectProps> = (props) => {
  const { value, options, onChange, name } = props;
  const selectRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const onButtonClick = () => {
    (selectRef.current as HTMLButtonElement | null)?.click();
  };

  const onOptionSelect = (value: any) => {
    setIsOpen(false);
    onChange({
      target: {
        name,
        value,
      },
    } as ChangeEvent<HTMLSelectElement>);
  };

  const selectedValue = options.find((item) => item.key === value)?.label;

  return (
    <div className="select-wrapper" onClick={onButtonClick} ref={dropdownRef}>
      <button className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
        {selectedValue}
        <img alt="Down Caret Icon" src={CaretDown} />
      </button>
      {isOpen && (
        <div className="select-dropdown">
          <ul>
            {options.map((item) => (
              <li key={item.key as Key} onClick={() => onOptionSelect(item.key)}>{item.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
