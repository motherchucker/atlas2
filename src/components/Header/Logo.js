import React from "react";
import { MdBrokenImage } from "react-icons/md";

import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={classes.div}>
      <div className={classes["div-logo"]}>
        <label>Atlas</label> <span>2</span> <MdBrokenImage />
      </div>
      <div className={classes["div-label"]}>
        <label className={classes.label}>DEV Instance</label>
      </div>
    </div>
  );
};

export default Logo;
