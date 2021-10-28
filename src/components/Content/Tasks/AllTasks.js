import React, { useState, createRef } from "react";
// import TaskDetail from "./TaskComponents/TaskDetail";
// import TaskTableNew from "./TaskComponents/TaskTableNew";
import TaskTableMUI from "./TaskComponents/TaskTableMUI/TaskTableMUI";
import TaskDetailMUI from "./TaskComponents/TaskTableMUI/TaskDetailMUI";

const AllTasks = () => {
  const [showTask, setShowTask] = useState(false);
  const [taskData, setTaskData] = useState({});
  const [taskToRemove, setTaskToRemove] = useState({});
  const [removeTask, setRemoveTask] = useState(false);
  const divRef = createRef();

  const onSelectionChange = (showTable, data) => {
    setTaskData(data);
    setShowTask(showTable);
    setRemoveTask(false);
  };

  const onCloseTask = (showTable, task) => {
    setShowTask(showTable);
    setTaskToRemove(task);
    setRemoveTask(true);
  };

  return (
    <div>
      <TaskDetailMUI
        showTask={showTask}
        data={taskData}
        onCloseTask={onCloseTask}
        divRef={divRef}
      />
      <TaskTableMUI
        onSelectionChange={onSelectionChange}
        taskToRemove={taskToRemove}
        removeTask={removeTask}
        divRef={divRef}
      />
      {/* OLD NOT WORKING ANYMORE. USE MUI VERSIONS. */}
      {/* <TaskDetail
        showTask={showTask}
        data={taskData}
        onCloseTask={onCloseTask}
      />
      <TaskTableNew
        onSelectionChange={onSelectionChange}
        taskToRemove={taskToRemove}
        removeTask={removeTask}
      /> */}
    </div>
  );
};

export default AllTasks;
