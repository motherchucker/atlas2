import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import "./TaskDetail.css";

import { GrStatusGoodSmall } from "react-icons/gr";
import { FaTimes } from "react-icons/fa";

const TaskDetail = ({ showTask, data, onCloseTask }) => {
  const dateFormatter = (date) => {
    const newDate = new Date(date);

    const formatedDate = newDate.toLocaleTimeString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatedDate;
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

  const onCloseButtonClicked = (task) => {
    onCloseTask(showTask, task);
  };

  const renderTable = (tableData) => {
    return tableData.map((task) => {
      let taskDataMatter = task.matter;
      let taskDataRequests = [];

      if (taskDataMatter) {
        taskDataRequests = task.matter.data_request;
      } else {
        taskDataRequests = [];
      }

      return (
        <div key={task.Id} className="shadow mb-5 bg-body rounded">
          {/* Task detail header */}
          <div className="just-padding">
            <div className="info">
              <div>
                <h4 className="gray-title">
                  Task <span className="blue">{task.Id}</span>
                </h4>
              </div>
              <div className="priority">
                <FaTimes
                  onClick={() => {
                    onCloseButtonClicked(task);
                  }}
                  size="25px"
                  className="close-btn"
                />
              </div>
            </div>

            <h4 className="title">{task.name}</h4>
            <div className="info">
              <div>
                Due Date
                <span className="due-date"> {dateFormatter(task.due)}</span>
              </div>
              <div className="priority">
                <GrStatusGoodSmall
                  size="14px"
                  className={taskPriorityColor(task.priority)}
                />
                <span className="priority-span">{task.priority}</span>
              </div>
            </div>
          </div>
          {/* Matter */}
          <div className="just-padding gray">
            {taskDataMatter && (
              <div className="list-group list-group-root well">
                <div>
                  <div className="list-group-item gray">
                    <h5>
                      Matter Name:{" "}
                      <span className="black">{task.matter.name}</span>
                    </h5>
                    <div className="list-group-item-matter table-responsive">
                      <ReactBootStrap.Table borderless>
                        <thead>
                          <tr className="detail-header">
                            <th>External ID</th>
                            <th>Attorney</th>
                            <th>Paralegal</th>
                            <th>Assignees</th>
                            <th>Open Data Requests</th>
                            <th>Closed Data Requests</th>
                            <th>Draft Notices</th>
                            <th>Published Notices</th>
                            <th>Closed Notices</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            key={task.matter.external_id}
                            className="detail-row"
                          >
                            <td>{taskDataMatter.external_id}</td>
                            <td>{taskDataMatter.attorney}</td>
                            <td>{taskDataMatter.paralegal}</td>
                            <td>{taskDataMatter.assignees}</td>
                            <td>{taskDataMatter.open_requests}</td>
                            <td>{taskDataMatter.closed_requests}</td>
                            <td>{taskDataMatter.draft_notices}</td>
                            <td>{taskDataMatter.published_notices}</td>
                            <td>{taskDataMatter.closed_notices}</td>
                          </tr>
                        </tbody>
                      </ReactBootStrap.Table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Data Request */}
          <div>
            {taskDataRequests && (
              <div className="list-group list-group-root well">
                <div>{renderRequests(taskDataRequests)}</div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="buttons">
            <div>
              <button
                className="btn blue"
                type="button"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginRight: "30px",
                }}
              >
                Return Task
              </button>
              <button
                className="btn blue"
                type="button"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Subscribe
              </button>
            </div>
            <div>
              <button
                className="btn btn-outline-primary"
                type="button"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderRequests = (matterData) => {
    if (matterData.length > 1) {
      return matterData.map((request) => {
        return (
          <div key={request.id}>
            <div className="list-group-item-request">
              <h5>
                Data Request Name: <span className="black">{request.name}</span>
              </h5>
              <div className="request-table table-responsive">
                <ReactBootStrap.Table borderless>
                  <thead>
                    <tr className="detail-header">
                      <th>Template</th>
                      <th>Submission date</th>
                      <th>Phase</th>
                      <th>Due Date</th>
                      <th>Priority</th>
                      <th>Period of interest</th>
                      <th>Custodians</th>
                      <th>Client</th>
                      <th>Shared data</th>
                      <th>Workpackage</th>
                      <th>Fulfillment items</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={request.id} className="detail-row">
                      <td>{request.template}</td>
                      <td>{request.submission_date}</td>
                      <td>{request.phase}</td>
                      <td>{request.due_date}</td>
                      <td>{request.priority}</td>
                      <td>{request.period_of_interest}</td>
                      <td>{request.custodians}</td>
                      <td>{request.client}</td>
                      <td>{request.shared_data}</td>
                      <td>
                        {request.workpackage.map((res) => {
                          return res.name;
                        })}
                      </td>
                      <td>{request.fulfillment_items}</td>
                    </tr>
                  </tbody>
                </ReactBootStrap.Table>
              </div>
            </div>
            <div className="gray">
              {request && (
                <div className="list-group list-group-root well">
                  <div className="list-group-item-workpackage">
                    {request.workpackage.map((res) => {
                      return (
                        <div key={res.id}>
                          <h5>
                            Workpackage ID:{" "}
                            <span className="black">{res.id}</span>
                          </h5>
                          <div className="workpackage-table table-responsive">
                            <ReactBootStrap.Table borderless>
                              <thead>
                                <tr className="detail-header">
                                  <th>Scope Type</th>
                                  <th>Data Source</th>
                                  <th>Priority</th>
                                  <th>Due Date</th>
                                  <th>Fulfillment items</th>
                                  <th>Completion %</th>
                                  <th>Submitted</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr key={res.id} className="detail-row">
                                  <td>{res.score_type}</td>
                                  <td>{res.data_source}</td>
                                  <td>{res.priority}</td>
                                  <td>{res.due_date}</td>
                                  <td>{res.fulfillment_items}</td>
                                  <td>{res.completion}</td>
                                  <td>{res.submited}</td>
                                </tr>
                              </tbody>
                            </ReactBootStrap.Table>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      });
    }
    return;
  };

  return (
    <div className="w-auto">{showTask && <div>{renderTable(data)}</div>}</div>
  );
};

export default TaskDetail;
