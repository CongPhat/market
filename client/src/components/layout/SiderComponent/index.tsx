import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { routerSidebar } from "./_nav";
import { MenuItem } from "./interface";
import { Link, useLocation } from "react-router-dom";
import {
  AlignRightOutlined,
  CloseOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { UserContext } from "@shared/context/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderComponent = (props) => {
  const location = useLocation();
  const [toogleSider, setToogleSider] = useState(false);

  const [openKeys, setOpenKeys] = useState(null);
  const firstPath = location.pathname.split("/")[1] || "";
  const currentLang = "USA";
  const toggle = () => {
    setToogleSider(!toogleSider);
  };

  useEffect(() => {
    setOpenKeys(dequy(routerSidebar, []));
  }, [firstPath]);

  const dequy = (router, open) => {
    let _open = [...open];
    for (let index = 0; index < router.length; index++) {
      const item = router[index];
      const activePath = "/" + firstPath;
      const isActive = item.activePath.indexOf(activePath) != -1;
      if (isActive) {
        if (item.children.length > 0) {
          _open = dequy(item.children, [...open, item.path]);
        } else {
          _open = [...open, item.path];
        }
      }
    }
    return _open;
  };

  const renderMenu = (routers: Array<MenuItem>) => {
    const result = routers.map((item: MenuItem, index) => {
      const _icon = item.flgAwesome ? (
        <FontAwesomeIcon
          className={"icon-label fa-lg mr-2 text-gray-700"}
          icon={item.icon}
        />
      ) : (
        React.createElement(item.icon, {
          className: "icon-label",
        })
      );
      //   console.log(_icon);
      if (item.children.length > 0) {
        return (
          <SubMenu
            key={item.path}
            icon={<FontAwesomeIcon icon={item.icon} />}
            title={
              <span className="label-menu-item">{item.name[currentLang]}</span>
            }
          >
            {renderMenu(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item icon={_icon} key={item.path}>
            <Link to={item.path} className="item-label text-gray-700">
              {item.name[currentLang]}
            </Link>
          </Menu.Item>
        );
      }
    });
    return result;
  };

  return (
    <Sider
      className={`siderComponent fixed h-screen-95 top-1/2 transform -translate-y-1/2 rounded-md shadow-xl bg-white`}
      trigger={null}
      collapsed={toogleSider}
      width={275}
    >
      <div
        className={`logo w-100  ${
          toogleSider && "collapsed"
        } rounded-t-md bg-opacity-25 bg-white border-b border-gray-400 border-solid `}
      >
        <img className="ml-2 mt-2" src={""} alt="" />
        {React.createElement(toogleSider ? CloseOutlined : AlignRightOutlined, {
          className: "trigger icon-custom text-red-700 text-2xl",
          onClick: toggle,
        })}
      </div>
      {openKeys && (
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={openKeys}
        >
          {renderMenu(routerSidebar)}
        </Menu>
      )}
    </Sider>
  );
};

export default SiderComponent;
