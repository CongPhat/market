import PrivateLogin from "@middlewares/PrivateLogin";
import React, { Suspense, useEffect } from "react";
import { Switch } from "react-router-dom";
const PrivatePage = React.lazy(() => import("./PrivatePage"));
const PublicPage = React.lazy(() => import("./PublicPage"));
interface Iprops {
  privateLogin: boolean;
}

const App = ({ privateLogin }: Iprops) => {
  function clickEffect(e) {
    var d = document.createElement("div");
    d.className = "clickEffect";
    d.style.top = e.clientY + "px";
    d.style.left = e.clientX + "px";
    document.body.appendChild(d);
    d.addEventListener(
      "animationend",
      function() {
        d.parentElement.removeChild(d);
      }.bind(this)
    );
  }
  useEffect(() => {
    // document.addEventListener("click", clickEffect);
  }, []);

  return (
    <Switch>
      {privateLogin ? (
        <Suspense fallback={<div></div>}>
          <PrivatePage />
        </Suspense>
      ) : (
        <Suspense fallback={<div></div>}>
          <PublicPage />
        </Suspense>
      )}
    </Switch>
  );
};

export default PrivateLogin(App);
