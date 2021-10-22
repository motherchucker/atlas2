import React from "react";
import { Route, Switch } from "react-router-dom";

import classes from "./Content.module.css";
import "./Content.css";
import Matters from "./Matters";
import CustodianPortal from "./CustodianPortal";
import Admin from "./Admin";
import Reports from "./Reports";
import Catalog from "./Catalog";
import MyTasks from "./Tasks/MyTasks";
import SentTasks from "./Tasks/SentTasks";
import AllTasks from "./Tasks/AllTasks";
import WelcomePageAtlas from "./WelcomePageAtlas";

const Content = () => {
  return (
    <div className={classes.content}>
      {/* <div className="w-100 p-3"> */}
      <div className="w-100 p-3 smallscreen">
        <Switch>
          <Route path="/atlas/" exact component={WelcomePageAtlas} />
          <Route
            path="/custodianportal"
            exact
            component={CustodianPortal}
          ></Route>
          <Route path="/matters" exact>
            <Matters />
          </Route>
          <Route path="/catalog" exact component={Catalog} />
          <Route path="/tasks/my" component={MyTasks} />
          <Route path="/tasks/sent" exact component={SentTasks} />
          <Route path="/tasks" component={AllTasks} />
          <Route path="/reports" exact component={Reports} />
          <Route path="/admin" exact component={Admin} />
        </Switch>
      </div>
    </div>
  );
};

export default Content;
