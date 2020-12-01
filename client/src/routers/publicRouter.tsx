import React from "react";
import LoginRouter from "@modules/Auth/Login/router";
import Login from "@modules/Auth/Login";
import { Redirect } from "react-router";

export const publicRouter: Array<object> = [
  LoginRouter,
  {
    path: "/test",
    exact: true,
    main: () => <Login />,
  },
  {
    path: "",
    exact: true,
    main: () => <Redirect to={"/login"} />,
  },
];
