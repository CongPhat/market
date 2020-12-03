import ProductsComponent from "@components/commons/ProductsComponent";
import {
  useGetProductsLazyQuery,
  useGetProductsQuery,
} from "@generated/graphql";
import useScroll from "@shared/hook/useScroll";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router";

const DashBoard = (props) => {
  const { id }: any = useParams();
  const [getProductsLazy, { loading, data, error }] = useGetProductsLazyQuery();
  const [options, setOptions] = useState({
    pageSize: 24,
    pageNumber: 1,
    idCategory: id,
    reload: false,
  });
  const refWrapperProduct = useRef(null);

  const handleBottom = useCallback(() => {
    console.log("bottom");

    setOptions((pre) => ({
      ...pre,
      pageNumber: pre.pageNumber + 1,
      reload: false,
    }));
  }, []);

  useScroll(refWrapperProduct, handleBottom);

  useEffect(() => {
    getProductsLazy({ variables: options });
  }, [options]);
  useEffect(() => {
    setOptions((pre) => ({
      ...pre,
      pageNumber: 1,
      idCategory: id,
      reload: true,
    }));
  }, [id]);

  if (error) {
    return <>Error....</>;
  }
  // if (loading) {
  //   return <>Loading....</>;
  // }
  console.log("render");

  return (
    <>
      <div ref={refWrapperProduct} id="test">
        <ProductsComponent
          products={data?.getProducts}
          loading={loading}
          defaultItem={16}
          reloadData={options.reload}
        />
      </div>
    </>
  );
};
export default DashBoard;
