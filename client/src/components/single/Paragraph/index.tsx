import React, { ReactElement, useMemo } from "react";
interface Iprops {
  loading?: boolean;
  className?: string;
  classNameLoading?: string;
  typeLoading?: "circle";
  children: string | number | ReactElement;
  rowsLoading?: number;
}
const Paragraph = ({
  loading = false,
  className = "",
  children,
  rowsLoading = 1,
  classNameLoading = "",
}: Iprops) => {
  const rowsRender = useMemo(
    () => Array.from(Array(loading ? rowsLoading : 1).keys()),
    [loading]
  );
  return (
    <>
      {rowsRender.map(() => (
        <span
          className={`${className} ${loading &&
            `loading-paragraph ${classNameLoading}`} ${!loading &&
            "w-full"} to-gray-500 text-sm font-medium break-words block`}
        >
          {!loading && children}
        </span>
      ))}
    </>
  );
};
export default React.memo(Paragraph);
