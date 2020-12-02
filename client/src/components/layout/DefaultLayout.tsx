import React, { useState } from "react";
import SiderComponent from "@components/layout/SiderComponent";
import { Layout } from "antd";
import HeaderComponent from "./Header";

const { Content, Footer } = Layout;

const DefaultLayout = (props) => {
  return (
    <section className="default-layout flex bg-gray-200 h-full">
      <SiderComponent />
      <div className="site-layout content-area ml-auto">
        {/* <HeaderComponent /> */}
        <div className={`main-content-wrapper p-60`}>
          <div className={`wrap-content `}>{props.children}</div>
        </div>
      </div>
    </section>
  );
};
export default DefaultLayout;
