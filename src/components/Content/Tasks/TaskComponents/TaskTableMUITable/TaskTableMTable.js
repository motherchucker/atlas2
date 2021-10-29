import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  TextField,
  Paper,
  Checkbox,
  IconButton,
} from "@mui/material/";
import { visuallyHidden } from "@mui/utils";
import { createTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { Search, Close } from "@material-ui/icons";
import { GrStatusGoodSmall } from "react-icons/gr";

import { MOCK_TASKS } from "../../Data/MOCK_TASKS";
import "./TaskTableMTable.css";

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
      <div></div>
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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "assignee",
    numeric: false,
    disablePadding: false,
    label: "Assignee",
  },
  {
    id: "priority",
    numeric: false,
    disablePadding: false,
    label: "Priority",
  },
  {
    id: "created",
    numeric: false,
    disablePadding: false,
    label: "Created at",
  },
  {
    id: "due",
    numeric: false,
    disablePadding: false,
    label: "Due Date",
  },
  {
    id: "requestor",
    numeric: false,
    disablePadding: false,
    label: "Requestor",
  },
  {
    id: "matter.name",
    numeric: false,
    disablePadding: false,
    label: "Matter Name",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className="columnHeaderTitle"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const TaskTableMTable = ({
  currentUser,
  onSelectionChange,
  removeTask,
  taskToRemove,
  divRef,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]); // Saved selected rows for checkboxs
  const [selectedRow, setSelectedRow] = useState([]); // Saved selected row for task detail
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");

  let tasks = MOCK_TASKS;
  if (currentUser) {
    tasks = MOCK_TASKS.filter((row) => row.assignee === currentUser);
  } else {
    tasks = MOCK_TASKS;
  }

  useEffect(() => {
    setRows(tasks);

    let showTasks = false;
    if (selectedRow.length !== 0) {
      showTasks = true;
    } else {
      showTasks = false;
    }

    if (removeTask) {
      setSelected(selected.filter((item) => item !== taskToRemove.id));
      setSelectedRow([]);
    }

    onSelectionChange(showTasks, selectedRow);
  }, [selectedRow, onSelectionChange, removeTask, taskToRemove, selected]);

  const scrollTo = () => {
    window.scrollTo({
      top: divRef,
      behavior: "smooth",
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (event, row) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(row.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);

    if (selectedIndex >= 0) {
      console.log("Deleted row");
      if (selectedRow.id === row.id) {
        setSelectedRow([]);
      }
    }
    // console.log("Checkbox click");
  };

  const handleRowClick = (event, row) => {
    // console.log("Row click");

    let selectedRow = row;
    let rowId = [];
    rowId = [`${row.id}`];
    setSelectedRow(selectedRow);
    setSelected(rowId);

    scrollTo();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const isSelected = (name) => selected.indexOf(name) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // FORMATING
  const priorityFormater = (cell) => {
    return (
      <span>
        <GrStatusGoodSmall className={taskPriorityColor(cell)} />
        <span className="priority-span">{cell}</span>
      </span>
    );
  };

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

  return (
    <div className="shadow p-3 mb-5 bg-body rounded w-auto">
      <div>
        <h3>All tasks ({rows.length})</h3>
      </div>
      <div style={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }} className="paper-shadow">
            <Toolbar
              component={QuickSearchToolbar}
              clearSearch={() => requestSearch("")}
              onChange={(event) => requestSearch(event.target.value)}
              value={searchText}
            />
            <TableContainer className="table-shadow">
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleRowClick(event, row)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              onClick={(event) =>
                                handleCheckboxClick(event, row)
                              }
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="center"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.assignee}</TableCell>
                          <TableCell>
                            {priorityFormater(row.priority)}
                          </TableCell>
                          <TableCell>{dateFormater(row.created)}</TableCell>
                          <TableCell>{dateFormater(row.due)}</TableCell>
                          <TableCell>{row.requestor}</TableCell>
                          <TableCell>{row.matter.name}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="pagination-margin"
            />
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default TaskTableMTable;
