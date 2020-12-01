import React, { useContext, useEffect } from "react";
import { Layout, Dropdown, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import { withRouter } from "react-router-dom";

import {
  faKey,
  faLanguage,
  faUserCircle,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { clearToken } from "src/services/authentication";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authLogin } from "@recoil/Auth.recoil";
import { CURRENT_LANGUAGE } from "@config/index";
import { language } from "@recoil/Language.recoil";
import { useTranslate } from "@shared/hook/useTranslate";
import { HeaderTranslateKey } from "@shared/translateKey/ImportTranslateKey";

const { Header } = Layout;

const HeaderComponent = (props) => {
  const setLogin = useSetRecoilState(authLogin);
  const [valueLang, setLanguage] = useRecoilState(language);
  const { HEADER } = useTranslate(HeaderTranslateKey);
  useEffect(() => {}, []);

  const OnChangePass = () => {
    props.history.push("/change-password");
  };

  const Logout = () => {
    setLogin((pre) => ({
      ...pre,
      privateLogin: false,
      userInfo: null,
    }));
    clearToken();
    props.history.push("/login");
  };

  const changLang = (lang) => {
    localStorage.setItem(CURRENT_LANGUAGE, lang);
    setLanguage(lang);
  };

  const menuLang = (
    <Menu>
      <Menu.Item>
        <a
          className={valueLang == "USA" && "active"}
          onClick={() => changLang("USA")}
        >
          English
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          className={valueLang == "VNM" && "active"}
          onClick={() => changLang("VNM")}
        >
          Việt Nam
        </a>
      </Menu.Item>
    </Menu>
  );
  const profileUser = { res: { fisrtName: "fisrtName", lastName: "lastName" } };
  const name =
    (profileUser.res?.fisrtName || "fisrtName") +
    " " +
    (profileUser.res?.lastName || "lastName");
  const menu = (
    <Menu>
      <Menu.Item>
        <div style={{ fontWeight: "bold" }}>{name}</div>
      </Menu.Item>
      <Menu.Item onClick={OnChangePass}>
        <div>
          <FontAwesomeIcon icon={faKey} /> {"TITLE"}
        </div>
      </Menu.Item>
      <Menu.Item onClick={Logout}>
        <div>
          <FontAwesomeIcon icon={faSignInAlt} />
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="flex justify-between bg-transparent mt-6">
      <h6 className="text-red-1000 text-xl font-semibold">{HEADER}</h6>
      <div className="flex mr-4">
        <Dropdown
          trigger={["click"]}
          overlay={menuLang}
          placement="bottomCenter"
          arrow
        >
          <a>
            <FontAwesomeIcon
              color="#fff"
              icon={faLanguage}
              className="text-3xl cursor-pointer text-black"
            />
          </a>
        </Dropdown>
        <div className="mr-6"></div>
        <Dropdown
          trigger={["click"]}
          overlay={menu}
          placement="bottomCenter"
          arrow
        >
          <a>
            <FontAwesomeIcon
              color="#fff"
              className="text-3xl cursor-pointer text-black"
              icon={faUserCircle}
            />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default withRouter(HeaderComponent);
