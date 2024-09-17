import React, { ChangeEvent, useEffect, useState } from "react";
import ButtonDropdown from "../../../components/ButtonDropdown";
import displayIcon from "../../../assets/images/Display.svg";
import "./kanban-header.css";
import Select from "../../../components/Select";
import { GroupingList, SortingList } from "../../../constants/kanban.constant";

export interface DisplayData {
  grouping: string,
  sorting: string,
}

interface KanbanHeaderProps {
  displayData: DisplayData,
  onChange: (e: any) => any;
}

const DisplayIcon = () => (
  <img alt="Display Icon" src={displayIcon} />
);

export const KanbanHeader: React.FC<KanbanHeaderProps> = (props) => {

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    props.onChange({
      [name]: value
    });
  };

  return (
    <header className="kanban-header">
      <ButtonDropdown icon={<DisplayIcon />} name="Display">
        <>
          <div className="filter-row">
            <label>Grouping</label>
            <Select name="grouping" value={props.displayData.grouping} options={GroupingList} onChange={handleChange} />
          </div>
          <div className="filter-row">
            <label>Ordering</label>
            <Select name="sorting" value={props.displayData.sorting} options={SortingList} onChange={handleChange} />
          </div>
        </>
      </ButtonDropdown>
    </header>
  );
}
