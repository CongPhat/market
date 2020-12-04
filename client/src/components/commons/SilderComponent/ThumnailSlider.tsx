import React from "react";
interface Iprops {
  item: {
    link: string;
    type: number;
  };
  index: number;
  handleChangeThumnail: (index: number) => void;
  isActive: boolean;
}
const ThumnailSlider = ({
  item,
  index,
  handleChangeThumnail,
  isActive,
}: Iprops) => {
  console.log(item, isActive);

  return (
    <div
      className={`mx-2 cursor-pointer`}
      style={{
        width: "50px",
        height: "50px",
        bottom: "20px",
      }}
    >
      <img
        src={item.link}
        alt=""
        onClick={() => handleChangeThumnail(index)}
        className="object-cover w-full h-full rounded-md "
        style={{
          border: isActive ? "2px solid white" : null,
          opacity: isActive ? 1 : 0.5,
        }}
      />
    </div>
  );
};
export default React.memo(ThumnailSlider);
