import React from "react";
import { Link } from "react-router-dom";

import css from "./Appbar.module.css";

const AppBar = (): JSX.Element => {
  return (
    <div className={css.wrapper}>
      <h3 className={css.appbarTitle} >This is an AppBar</h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/form">Form</Link>
        </li>
      </ul>
    </div>
  );
};

export default AppBar;
