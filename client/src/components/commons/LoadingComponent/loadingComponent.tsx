import * as React from "react";
const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 z-60 bg-gray-600 w-full h-full">
      <div className="relative inline-block w-120 h-120 rounded-full">
        <div className="absolute left-0 top-0 w-120 h-120 rounded-full border-t-2 border-l-2 border-white animate-spin" />
        <span className="icon-Unilever-Converted icon-loading-font" />
      </div>
    </div>
  );
};
export default React.memo(LoadingComponent);
