import {
  useGetProductsLazyQuery,
  useGetProductsQuery,
} from "@generated/graphql";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router";

const DashBoard = (props) => {
  const { id }: any = useParams();

  const [getProductsLazy, { loading, data, error }] = useGetProductsLazyQuery();
  console.log(data, loading, error, "datadatadatadata");
  useEffect(() => {
    const options: any = {
      pageSize: 10,
      pageNumber: 1,
      idCategory: "1234",
    };
    getProductsLazy(options);
  }, [id]);
  if (error) {
    console.log(error, "errorerrorerror");

    return <>Error....</>;
  }
  if (loading) {
    return <>Loading....</>;
  }

  return <div></div>;
};
export default DashBoard;
