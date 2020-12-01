import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center w-100">
      <Spin />
    </div>
  );
};
export default React.memo(Loading);
