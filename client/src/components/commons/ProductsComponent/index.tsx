import { convertQuerySearch } from "@helper/functions";
import { Skeleton } from "antd";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import ItemProduct from "./ItemProduct";
const DetailProductComponent = React.lazy(() =>
  import("@components/commons/DetailProductComponent")
);
export interface Iproducts {
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
export interface Iprops {
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
  const location = useLocation();
  const search = useMemo(() => convertQuerySearch(location.search), [location]);
  const [test, setTest] = useState(false);
  console.log("render products");

  const refTopProducts = useRef(null);
  const memoProducts = useRef({
    dataMemo: [],
  });
  const handleProducts = (reload: boolean) => {
    const dataRender = reload
      ? products
      : [...memoProducts.current.dataMemo, ...products];
    return dataRender;
  };
  const handleClickItem = useCallback(() => {
    setTest(true);
  }, []);
  useEffect(() => {
    if (reloadData) {
      refTopProducts.current.scrollIntoView({ block: "end" });
    }
  }, [reloadData]);
  useEffect(() => {
    memoProducts.current.dataMemo = handleProducts(reloadData);
  }, [products, reloadData]);

  const productsLoading = useMemo(
    () => Array.from(Array(defaultItem).keys()),
    []
  );

  return (
    <>
      <div ref={refTopProducts} />
      {(!search.filter || test) && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {handleProducts(reloadData).map((product, index) => (
            <ItemProduct
              key={index}
              product={product}
              clickItemProduct={handleClickItem}
            />
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
      )}
      <Suspense fallback={<div></div>}>
        {search.filter && <DetailProductComponent idProduct={search?.filter} />}
      </Suspense>
    </>
  );
};
export default React.memo(ProductsComponent);
