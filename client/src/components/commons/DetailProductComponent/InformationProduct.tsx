import HeaderTitle from "@components/single/HeaderTitle";
import Paragraph from "@components/single/Paragraph";
import { formatMoney } from "@helper/functions";
import React from "react";
interface IProps {
  information: {
    address: string;
    categoryId: string;
    content: string;
    price: string;
    title: string;
  };
  loading?: boolean;
}
const InformationProduct = ({ information, loading = false }: IProps) => {
  return (
    <div className="w-full">
      <HeaderTitle loading={loading}>{information?.title}</HeaderTitle>
      <Paragraph
        loading={loading}
        classNameLoading="w-5/12"
        className="text-base font-semibold my-1"
      >
        {formatMoney(information?.price)}
      </Paragraph>
      <Paragraph loading={loading} rowsLoading={2} classNameLoading="w-10/12">
        {information?.content}
      </Paragraph>
    </div>
  );
};
export default InformationProduct;
