import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
  PaginationTotalStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "./TaskTableNew.css";

import { MOCK_TASKS } from "../Data/MOCK_TASKS";
import { FaSearch } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";

const TaskTableNew = ({
  currentUser,
  onSelectionChange,
  removeTask,
  taskToRemove,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const { SearchBar } = Search;

  let tasks = [];
  if (currentUser) {
    tasks = MOCK_TASKS.filter((row) => row.assignee === currentUser);
  } else {
    tasks = MOCK_TASKS;
  }

  const taskPriorityColor = (priority) => {
    if (priority === "Low priority") {
      return "priority-low";
    } else if (priority === "Medium priority") {
      return "priority-medium";
    } else {
      return "priority-high";
    }
  };

  useEffect(() => {
    let showTasks = false;
    if (selectedRows && selectedRows.length) {
      showTasks = true;
    } else {
      showTasks = false;
    }

    if (removeTask) {
      // console.log(taskToRemove);
      setSelectedRows(
        selectedRows.filter((item) => item.Id !== taskToRemove.Id)
      );
    }

    onSelectionChange(showTasks, selectedRows);
  }, [selectedRows, onSelectionChange, removeTask, taskToRemove]);

  const priorityFormater = (cell) => {
    return (
      <span>
        <GrStatusGoodSmall className={taskPriorityColor(cell)} />
        <span className="priority-span">{cell}</span>
      </span>
    );
  };

  const onSearchClick = (index) => {
    console.log("Search clicked for column" + index);
    setShowSearch(!showSearch);
    setSelectedColumn(index);
  };

  const textSearchFormater = (column, colIndex, { filterElement }) => {
    if (selectedColumn === colIndex) {
      return (
        <div className="header-filter">
          <button
            className="search-button"
            onClick={() => onSearchClick(colIndex)}
          >
            <FaSearch />
          </button>
          {showSearch ? (
            <div className="filter-position">{filterElement}</div>
          ) : (
            <div>{column.text}</div>
          )}
        </div>
      );
    }
    return (
      <div className="header-filter">
        <button
          className="search-button"
          onClick={() => onSearchClick(colIndex)}
        >
          <FaSearch />
        </button>
        <div>{column.text}</div>
      </div>
    );
  };

  const textFormater = (column) => {
    return <div className="header-normal">{column.text}</div>;
  };

  const dateFormater = (cell) => {
    // const date = new Date(cell);
    // console.log(JSON.stringify(date));
    const dateTime = new Date(cell);

    const formatedDate = dateTime.toLocaleTimeString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatedDate;
  };

  const columns = [
    {
      dataField: "Id",
      text: "Task ID",
      filter: textFilter(),
      headerFormatter: textSearchFormater,
    },
    {
      dataField: "name",
      text: "Name",
      filter: textFilter(),
      headerFormatter: textSearchFormater,
    },
    {
      dataField: "description",
      text: "Description",
      filter: textFilter(),
      headerFormatter: textSearchFormater,
    },
    {
      dataField: "assignee",
      text: "Assignee",
      headerFormatter: textFormater,
    },
    {
      dataField: "priority",
      text: "Priority",
      formatter: priorityFormater,
      headerFormatter: textFormater,
    },
    {
      dataField: "created",
      text: "Created at",
      headerFormatter: textFormater,
      formatter: dateFormater,
    },
    {
      dataField: "due",
      text: "Due Date",
      headerFormatter: textFormater,
      formatter: dateFormater,
    },
    {
      dataField: "requestor",
      text: "Requestor",
      filter: textFilter(),
      headerFormatter: textSearchFormater,
    },
    {
      dataField: `matter.name`,
      text: "Matter Name",
      filter: textFilter(),
      headerFormatter: textSearchFormater,
    },
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from}-{to} out of {size}
    </span>
  );

  const paginationOptions = {
    custom: true,
    totalSize: tasks.length,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    disablePageTitle: true,
    paginationTotalRenderer: customTotal,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "15",
        value: 15,
      },
    ],
  };

  const handleOnSelect = (row, isSelect, rowIndex) => {
    if (isSelect) {
      setSelectedRows(() => [...selectedRows, row]);
    } else {
      setSelectedRows(selectedRows.filter((item) => item.Id !== row.Id));
    }
  };

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: handleOnSelect,
  };

  const contentTable = ({ paginationProps, paginationTableProps }) => (
    <div>
      <ToolkitProvider keyField="Id" columns={columns} data={tasks} search>
        {(toolkitprops) => (
          <div key="Id">
            <div className="all-pages-searchbar">
              <div></div>
              <div className="searchbar">
                <FaSearch className="search-svg" color="gray" />
                <SearchBar
                  {...toolkitprops.searchProps}
                  placeholder="Search tasks"
                  className="searchbar-text"
                />
              </div>
            </div>
            <div>
              <BootstrapTable
                key="Id"
                hover
                bootstrap4
                filter={filterFactory()}
                selectRow={selectRow}
                {...toolkitprops.baseProps}
                {...paginationTableProps}
                wrapperClasses="table-responsive"
                rowClasses="text-nowrap"
              />
            </div>
          </div>
        )}
      </ToolkitProvider>
      <div className="footer-pagination">
        <SizePerPageDropdownStandalone
          btnContextual="btn"
          className="dropdown-custom"
          {...paginationProps}
        />
        <PaginationTotalStandalone {...paginationProps} />
        <PaginationListStandalone {...paginationProps} />
      </div>
    </div>
  );

  return (
    <div className="shadow p-3 mb-5 bg-body rounded w-auto">
      {tasks && (
        <div>
          <div>
            <h3>All Tasks ({tasks.length})</h3>
          </div>
          <div>
            <PaginationProvider
              key="Id"
              pagination={paginationFactory(paginationOptions)}
            >
              {contentTable}
            </PaginationProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTableNew;
