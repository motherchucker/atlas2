import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarFilterButton,
  useGridSlotComponentProps,
} from "@mui/x-data-grid";
import {
  TextField,
  IconButton,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { createTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { PropTypes } from "prop-types";

import { MOCK_TASKS } from "../../Data/MOCK_TASKS.js";
import { GrStatusGoodSmall } from "react-icons/gr";
import { Search, Close } from "@material-ui/icons";

import "./TaskTableMUI.css";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: "space-between",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
      },
      textField: {
        [theme.breakpoints.down("xs")]: {
          width: "100%",
        },
        margin: theme.spacing(1, 0.5, 1.5),
        "& .MuiSvgIcon-root": {
          marginRight: theme.spacing(0.5),
        },
        "& .MuiInput-underline:before": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    }),
  { defaultTheme }
);

function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{ marginBottom: "20px", marginTop: "20px" }}
    >
      <div>
        <GridToolbarFilterButton />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <Search fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <Close fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={state.pagination.page + 1}
      count={state.pagination.pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const TaskTableMUI = ({
  currentUser,
  onSelectionChange,
  removeTask,
  taskToRemove,
  divRef,
}) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState([]);

  let tasks = MOCK_TASKS;
  if (currentUser) {
    tasks = MOCK_TASKS.filter((row) => row.assignee === currentUser);
  } else {
    tasks = MOCK_TASKS;
  }

  useEffect(() => {
    setRows(tasks);
    // console.log(selectionModel);
    let showTasks = false;
    if (selectedRows.length !== 0) {
      showTasks = true;
    } else {
      showTasks = false;
    }

    if (removeTask) {
      // console.log(taskToRemove);
      // console.log(selectedRows);
      setSelectionModel(
        selectionModel.filter((item) => item !== taskToRemove.id)
      );
      setSelectedRows([]);
    }

    onSelectionChange(showTasks, selectedRows);
  }, [
    selectedRows,
    selectionModel,
    onSelectionChange,
    removeTask,
    taskToRemove,
  ]);

  const taskPriorityColor = (priority) => {
    if (priority === "Low priority") {
      return "priority-low";
    } else if (priority === "Medium priority") {
      return "priority-medium";
    } else {
      return "priority-high";
    }
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

  const priorityFormater = (cell) => {
    return (
      <span>
        <GrStatusGoodSmall className={taskPriorityColor(cell)} />
        <span className="priority-span">{cell}</span>
      </span>
    );
  };

  const scrollTo = () => {
    window.scrollTo({
      top: divRef,
      behavior: "smooth",
    });
  };

  const handleCellClick = (params) => {
    let rowId = [];
    rowId = [`${params.id}`];
    // console.log(rowId);
    if (params.tabIndex === -1) {
      setSelectionModel(rowId);
      // setSelectionModel(params.id);
      setSelectedRows(params.row);
    } else {
      setSelectionModel([]);
      setSelectedRows([]);
    }

    scrollTo();
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      flex: 0.05,
      minWidth: 60,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.1,
      minWidth: 210,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 0.1,
      minWidth: 160,
    },
    {
      field: "assignee",
      headerName: "Assignee",
      flex: 0.1,
      minWidth: 130,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 0.1,
      minWidth: 150,
      renderCell: (params) => {
        return priorityFormater(params.value);
      },
    },
    {
      field: "created",
      headerName: "Created at",
      type: "dateTime",
      flex: 0.1,
      minWidth: 180,

      valueFormatter: (params) => {
        return dateFormater(params.value);
      },
    },
    {
      field: "due",
      headerName: "Due Date",
      type: "dateTime",
      flex: 0.1,
      minWidth: 180,

      valueFormatter: (params) => {
        return dateFormater(params.value);
      },
    },
    { field: "requestor", headerName: "Requestor", flex: 0.1 },
    {
      field: "matter",
      headerName: "Matter Name",

      valueFormatter: (params) => {
        return params.value?.name;
      },
      flex: 0.1,
    },
  ];

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);

    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = tasks.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  return (
    <div className="shadow p-3 mb-5 bg-body rounded w-auto">
      <div>
        <h3>All tasks ({tasks.length})</h3>
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          components={{
            Toolbar: QuickSearchToolbar,
            // Pagination: CustomPagination,
          }}
          rows={rows}
          columns={columns}
          autoHeight={true}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          onCellClick={(params) => handleCellClick(params)}
          disableSelectionOnClick
          selectionModel={selectionModel}
          onSelectionModelChange={(selection) => {
            // console.log(selection);
            setSelectionModel(selection);
          }}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(""),
            },
          }}
        />
      </div>
    </div>
  );
};

export default TaskTableMUI;
