import React, { useState, createRef } from "react";
import TaskDetail from "./TaskComponents/TaskDetail";
import TaskTableNew from "./TaskComponents/TaskTableNew";
import TaskDetailMUI from "./TaskComponents/TaskTableMUI/TaskDetailMUI";
import TaskTableMUI from "./TaskComponents/TaskTableMUI/TaskTableMUI";

const MyTasks = () => {
  const [showTask, setShowTask] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [taskToRemove, setTaskToRemove] = useState({});
  const [removeTask, setRemoveTask] = useState(false);
  const divRef = createRef();
  const currentUser = "harish harish";

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
        currentUser={currentUser}
        onSelectionChange={onSelectionChange}
        taskToRemove={taskToRemove}
        removeTask={removeTask}
        divRef={divRef}
      />
      {/* <TaskDetail showTask={showTask} data={taskData} /> */}
      {/* <TaskTableNew
        currentUser={currentUser}
        onSelectionChange={onSelectionChange}
      /> */}
    </div>
  );
};

export default MyTasks;
