import { useState } from "react";
import Type from "./Type";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function MenuType({ setColor, color, setColorTest, colorTest }) {
  const [active, setActive] = useState("");
  const [activeType, setActiveType] = useState(true);
  return (
    <div className="absolute flex flex-col select-none top-1/2 -translate-y-1/2 left-0 space-y-2 bg-white shadow-lg border py-2 rounded-tr rounded-br">
      <div
        className="flex justify-end p-2 cursor-pointer text-slate-500 hover:text-black"
        onClick={() => setActiveType((prev) => !prev)}
      >
        {activeType ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />}
      </div>
      <div className={`space-y-2 ${!activeType && "hidden"}`}>
        {nameColorsShoe.map((item) => (
          <Type
            text={item.text}
            changeColor={(color) => {
              setColor((prev) => ({ ...prev, [item.name]: color }));
            }}
            changeColorTest={(color) => {
              setColorTest((prev) => ({ ...prev, [item.name]: color }));
            }}
            color={color[item.name]}
            colorTest={colorTest[item.name]}
            key={item.name}
            name={item.name}
            currentActive={active}
            setCurrentActive={setActive}
          />
        ))}
      </div>
    </div>
  );
}
const nameColorsShoe = [
  {
    name: "laces",
    text: "Dây giày",
  },
  {
    name: "mesh",
    text: "Thân giày",
  },
  {
    name: "caps",
    text: "Lỗ xỏ dây",
  },
  {
    name: "inner",
    text: "Bên trong giày",
  },
  {
    name: "sole",
    text: "Đế giày",
  },
  {
    name: "stripes",
    text: "Sọc vằn",
  },
  {
    name: "band",
    text: "Quai móc giày",
  },
  {
    name: "patch",
    text: "Đế sau",
  },
];
