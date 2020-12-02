import { HOME } from "@config/index";
import React from "react";
import Loadable from "react-loadable";
import LoadingComponent from "../components/commons/LoadingComponent/loadingComponent";

const Dashboard = Loadable({
  loader: () => import("@modules/Dashboard"),
  loading: LoadingComponent,
});

const PageNotFound = Loadable({
  loader: () => import("@modules/PageNotFound"),
  loading: LoadingComponent,
});
const Recoil = Loadable({
  loader: () => import("@modules/Recoil"),
  loading: LoadingComponent,
});

export const privateRouter: Array<object> = [
  {
    path: HOME,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <Dashboard />,
  },
  {
    path: "/recoil",
    exact: true,
    permissionCode: "ALLOW",
    main: () => <Recoil />,
  },
  {
    path: "",
    exact: true,
    permissionCode: "ALLOW",
    main: () => <PageNotFound />,
  },
];
