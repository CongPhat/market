import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useGetDetailProductLazyQuery } from "@generated/graphql";
import SliderComponent from "@components/commons/SilderComponent";
import { Link } from "react-router-dom";
import InformationProduct from "./InformationProduct";
interface Iprops {
  idProduct: string;
}
const DetailProductComponent = ({ idProduct }: Iprops) => {
  const [
    getDetailProductLazy,
    { loading, data, error },
  ] = useGetDetailProductLazyQuery();

  useEffect(() => {
    getDetailProductLazy({ variables: { idProduct } });
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
  }, [idProduct]);
  const handleCloseDetail = () => {
    document.body.style.height = "auto";
    document.body.style.overflow = "scroll";
  };
  return (
    <>
      {ReactDOM.createPortal(
        <div className="w-screen h-screen fixed z-60 top-0 bg-white flex">
          <Link
            to={{ search: "" }}
            className="absolute text-4xl z-30 cursor-pointer group hover:text-teal-900"
            style={{ left: "20px", top: "20px" }}
            onClick={handleCloseDetail}
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="group-hover:text-teal-900 w-12 h-12 bg-white rounded-full p-3"
            />
          </Link>
          <div className="w-3/4 h-screen">
            <SliderComponent media={data?.getDetailProduct.media} />
          </div>
          <div className="w-1/4 h-screen px-4 py-2">
            <InformationProduct
              information={data?.getDetailProduct}
              loading={loading}
            />
          </div>
        </div>,
        document.getElementById("root")
      )}
    </>
  );
};
export default React.memo(DetailProductComponent);
