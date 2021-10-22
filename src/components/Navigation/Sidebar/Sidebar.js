import React, { Fragment, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import "./SidebarNew.css";
import "./SidebarScroll.css";

import { TasksData } from "../../Content/Tasks/NavigationData/TasksData";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const navStyle = { color: "#1a83ff" };
  const location = useLocation();

  return (
    <Fragment>
      <div className="sidebar">
        <div className={sidebar ? "sidebar-nav active" : "sidebar-nav"}>
          <NavLink
            to={`${location.pathname}`}
            className={sidebar ? "menu-arrow-open active" : "menu-arrow-open"}
          >
            <IoIosArrowForward onClick={showSidebar} />
          </NavLink>
        </div>

        <div className={sidebar ? "navbar active" : "navbar"}>
          <div className="sidebar-menu">
            <nav id="sidebar">
              <ul className="sidebar-menu-items">
                <li className="sidebar-toggle">
                  <NavLink
                    to={window.location.pathname}
                    className="menu-arrow-close"
                  >
                    <IoIosArrowBack onClick={showSidebar} />
                  </NavLink>
                </li>
                <li>
                  <h3 className="sidebar-header">Tasks</h3>
                </li>
                {TasksData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <NavLink activeStyle={navStyle} to={item.path}>
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Fragment>
  );

  // return (
  //   <Fragment>
  //     <div className="sidebar">
  //       <div className="sidebar-nav">
  //         <NavLink to={`${location.pathname}`} className="menu-arrow-open">
  //           <IoIosArrowForward onClick={showSidebar} />
  //         </NavLink>
  //       </div>
  //       <div>
  //         <nav className={sidebar ? "sidebar-menu active" : "sidebar-menu"}>
  //           <ul className="sidebar-menu-items">
  //             <li className="sidebar-toggle">
  //               <NavLink
  //                 to={window.location.pathname}
  //                 className="menu-arrow-close"
  //               >
  //                 <IoIosArrowBack onClick={showSidebar} />
  //               </NavLink>
  //             </li>
  //             <li>
  //               <h3>Tasks</h3>
  //             </li>
  //             {TasksData.map((item, index) => {
  //               return (
  //                 <li key={index} className={item.cName}>
  //                   <NavLink activeStyle={navStyle} to={item.path}>
  //                     <span>{item.title}</span>
  //                   </NavLink>
  //                 </li>
  //               );
  //             })}
  //           </ul>
  //         </nav>
  //       </div>
  //     </div>
  //   </Fragment>
  // );
};

export default Sidebar;
