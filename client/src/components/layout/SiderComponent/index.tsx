import React, { useContext, useEffect, useMemo, useState } from "react";
import { Layout, Menu } from "antd";
import { routerSidebar } from "./_nav";
import { MenuItem } from "./interface";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  AlignRightOutlined,
  CloseOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { UserContext } from "@shared/context/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetCategoryQuery } from "@generated/graphql";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderComponent = (props) => {
  const { data, loading, error } = useGetCategoryQuery();
  const location = useLocation();
  const firstPath = useMemo(() => {
    return location.pathname.split("/")[1] || "";
  }, []);
  console.log(firstPath);

  if (error) {
    return <>Error...</>;
  }
  if (loading) {
    return <>Loading...</>;
  }
  const { getCategory } = data;
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[firstPath]}
      className="market-menu fixed w-1/5 h-full px-3"
    >
      {getCategory.map((item) => (
        <Menu.Item key={item._id} className="px-2 py-1 rounded-md h-auto">
          <Link
            to={`/${item._id}`}
            className="flex items-center w-full font-semibold"
          >
            <div className="w-7 h-7 p-2 rounded-full bg-gray-100 mr-3">
              <img src={item.icon} alt="" className="w-5" />
            </div>
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SiderComponent;
