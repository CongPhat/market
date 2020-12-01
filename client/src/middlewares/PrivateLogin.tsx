import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getToken, getUserInfoToken } from "src/services/authentication";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authLogin } from "@recoil/Auth.recoil";

function PrivateLogin(Component: React.ComponentType<any | string>) {
  return withRouter(({ history }: RouteComponentProps) => {
    const [login, setLogin] = useRecoilState(authLogin);
    useEffect(() => {
      if (getToken()) {
        setLogin((pre) => ({
          ...pre,
          privateLogin: true,
          userInfo: getUserInfoToken(),
          controlLogin: true,
        }));
      } else {
        setLogin((pre) => ({ ...pre, controlLogin: true }));
      }
    }, []);
    return (
      <>
        {login.controlLogin ? (
          <Component privateLogin={login.privateLogin} />
        ) : null}
      </>
    );
  });
}

export default PrivateLogin;
