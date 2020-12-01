import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import "antd/dist/antd.css";
import "@styles/main.css";
import "./../styles/style.scss";

ReactDOM.render(
  <RecoilRoot>
    <HashRouter>
      <App />
    </HashRouter>
  </RecoilRoot>,
  document.getElementById("root")
);
