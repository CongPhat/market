import { formatMoney } from "@helper/functions";
import React from "react";
import { Link } from "react-router-dom";
import { Iproducts } from "./index";
interface IProps {
  product: Iproducts;
}
const ItemProduct = ({ product }: IProps) => {
  return (
    <Link
      key={product._id}
      to={{ search: `?filter=${product._id}` }}
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
  );
};
export default React.memo(ItemProduct);
