import React, { useCallback } from "react";
import { Col, Row, Input, Form, Checkbox } from "antd";
import { Link, withRouter } from "react-router-dom";
import ButtonComponent from "@components/commons/ButtonComponent/Button.Component";
import "./styles.scss";
import { useSetRecoilState } from "recoil";
import { useAsync } from "src/services/hook";
import { getUserInfoToken, login, setToken } from "src/services/authentication";
import { authLogin } from "@recoil/Auth.recoil";

const Login = (props) => {
  const { execute } = useAsync(login);
  const setLogin = useSetRecoilState(authLogin);
  const onFinish = useCallback((values) => {
    // call API
    execute(values).then((res) => {
      setToken(res.data);
      setLogin((pre) => ({
        ...pre,
        privateLogin: true,
        userInfo: getUserInfoToken(),
        controlLogin: true,
      }));
      props.history.push("/");
    });
  }, []);
  return (
    <Row className="login w-full h-full min-h-screen flex justify-center items-center relative bg-cover">
      <div className="w-full h-full absolute bg-black bg-opacity-50"></div>
      <Col className="form-login text-center bg-white rounded-2xl py-4 px-12 relative z-50 shadow-2xl">
        <div className="logo my-3 text-center color-theme">
          <span className="w-full"></span>
        </div>
        <div className={"custom-title"}>
          <label className="text-2xl font-bold block">{"TITLE LOG"}</label>
          <span className="text-base">{"DESCRIPTION"}</span>
        </div>
        <div className={"form-input-login my-3 text-left"}>
          <Form name="basic" onFinish={onFinish} className="form-basic">
            <Form.Item
              label={"USER_NAME"}
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập tên tài khoản" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"PASSWORD"}
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item name="isTea" valuePropName="checked">
              <Checkbox>{"TYPE_LOGIN"}</Checkbox>
            </Form.Item>

            <div className="d-flex justify-content-center mt-4">
              <Form.Item>
                <ButtonComponent
                  text={"TITLE"}
                  type="primary"
                  loading={status == "loading"}
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default withRouter(Login);
