import React from "react";

import DataGrid, {
  Column,
  Selection,
  FilterRow,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import { MOCK_TASKS } from "../Data/MOCK_TASKS";
import "./TaskTable.css";

const TaskTable = ({ currentUser, onSelectionChange }) => {
  let tasks = [];
  if (currentUser) {
    tasks = MOCK_TASKS.filter((row) => row.assignee === currentUser);
  } else {
    tasks = MOCK_TASKS;
  }

  const onSelectionChanged = ({ selectedRowsData }) => {
    const data = selectedRowsData[0];
    onSelectionChangeAllTasks(data);
  };

  const onSelectionChangeAllTasks = (data) => {
    const showTable = !!data;
    onSelectionChange(showTable, data);
  };

  return (
    <div className="shadow p-3 mb-5 bg-body rounded w-auto">
      <h3>All Tasks ({tasks.length})</h3>
      <DataGrid
        dataSource={tasks}
        showBorders={true}
        keyExpr="Id"
        onSelectionChanged={onSelectionChanged}
      >
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Selection
          mode="multiple"
          selectAllMode="allPages"
          showCheckBoxesMode="onClick"
        />
        <FilterRow visible={true} />
        <Paging defaultPageSize={5} />

        <Column dataField="Id" caption="Task ID" width={90} />
        <Column dataField="name" />
        <Column dataField="description" width={180} />
        <Column dataField="assignee" groupCellComponent={currentUser} />
        <Column dataField="priority" />
        <Column dataField="created" dataType="date" />
        <Column dataField="due" dataType="date" />
        <Column dataField="requestor" />
        <Column dataField="matter.name" />
      </DataGrid>
    </div>
  );
};

export default TaskTable;
