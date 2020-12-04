import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useGetDetailProductLazyQuery } from "@generated/graphql";
import SliderComponent from "@components/commons/SilderComponent";
interface Iprops {
  idProduct: string;
}
const DetailProductComponent = ({ idProduct }: Iprops) => {
  const [
    getDetailProductLazy,
    { loading, data, error },
  ] = useGetDetailProductLazyQuery();
  console.log(data, "render DetailProductComponent");
  useEffect(() => {
    getDetailProductLazy({ variables: { idProduct } });
  }, [idProduct]);
  return (
    <>
      {ReactDOM.createPortal(
        <div className="w-screen h-screen fixed z-60 top-0 bg-white">
          <div className="absolute text-4xl">
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="w-3/4 h-screen">
            <SliderComponent media={data?.getDetailProduct.media} />
          </div>
        </div>,
        document.getElementById("root")
      )}
    </>
  );
};
export default React.memo(DetailProductComponent);
