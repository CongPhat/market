import PrivateLogin from "@middlewares/PrivateLogin";
import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
const PrivatePage = React.lazy(() => import("./PrivatePage"));
const PublicPage = React.lazy(() => import("./PublicPage"));
interface Iprops {
  privateLogin: boolean;
}

const App = ({ privateLogin }: Iprops) => {
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
