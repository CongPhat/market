import React, { useState } from "react";
import SiderComponent from "@components/layout/SiderComponent";
import { Layout } from "antd";
import HeaderComponent from "./Header";

const { Content, Footer } = Layout;

const DefaultLayout = (props) => {
  return (
    <section className="default-layout flex px-16 bg-gray-200">
      {/* <SiderComponent /> */}
      <div className="site-layout content-area ml-auto">
        {/* <HeaderComponent /> */}
        <div className={`main-content-wrapper `}>
          <div className={`wrap-content `}>{props.children}</div>
        </div>
        {/* <Footer style={{ textAlign: "center" }}>
          © Copyrights <span style={{ color: "#000" }}>Alta Media</span> 2020.
          All rights reserved.
        </Footer> */}
      </div>
    </section>
  );
};
export default DefaultLayout;
