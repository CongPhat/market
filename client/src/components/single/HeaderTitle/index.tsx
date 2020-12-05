import React, { ReactElement } from "react";
interface Iprops {
  loading?: boolean;
  className?: string;
  typeLoading?: "circle";
  children: string | number | ReactElement;
}
const HeaderTitle = ({ loading = false, className = "", children }: Iprops) => {
  return (
    <h1
      className={`${className} ${loading &&
        "loading-header-title w-8/12"} ${!loading &&
        "w-full"}  to-black text-2xl font-bold break-words `}
    >
      {!loading && children}
    </h1>
  );
};
export default React.memo(HeaderTitle);
