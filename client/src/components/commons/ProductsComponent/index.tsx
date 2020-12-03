import { formatMoney } from "@helper/functions";
import { Skeleton } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
interface Iproducts {
  _id: string;
  content: string;
  price: string;
  address: string;
  userId: string;
  categoryId: string;
  title: string;
  media: Array<{
    link: string;
    type: number;
  }>;
  trending: boolean;
}
interface Iprops {
  products: Array<Iproducts>;
  loading: boolean;
  defaultItem?: number;
  reloadData?: boolean;
}
const ProductsComponent = ({
  products = [],
  loading,
  defaultItem = 20,
  reloadData,
}: Iprops) => {
  const memoProducts = useRef({
    dataMemo: [],
  });
  useEffect(() => {
    memoProducts.current.dataMemo.push(...products);
  }, [products]);
  let productsLoading = Array.from(Array(defaultItem).keys());
  const dataRender = reloadData
    ? products
    : [...memoProducts.current.dataMemo, ...products];

  return (
    <div className="grid grid-cols-6">
      {dataRender.map((product, index) => (
        <Link
          key={index}
          to={`/item/${product._id}`}
          className="hover:shadow-product p-4 group"
        >
          <div className="h-200 m-auto">
            <img
              src={product.media[0].link}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="font-display">
            <h6 className="product-title max-line max-line-2 text-sm">
              {product.title}
            </h6>
            <span className=" text-grey-900 group-hover:text-grey-900 text-base font-medium">
              {formatMoney(product.price)}
            </span>
          </div>
        </Link>
      ))}
      {loading &&
        productsLoading.map((item: any) => (
          <div className="hover:shadow-product p-4 group">
            <div className="h-200 m-auto">
              <Skeleton.Image className="w-full h-full" />
            </div>
            <div className="font-display">
              <Skeleton active />
            </div>
          </div>
        ))}
    </div>
  );
};
export default React.memo(ProductsComponent);
