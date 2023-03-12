import { useAppDispatch, useAppSelector } from "@/store";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { changeActive } from "@/store/activeType";
import { changeColorTest } from "@/store/color";
import { Color } from "../Shoe/ModelShoe";

export default function MenuType() {
  const [active, setActive] = useState(true);
  const activeType = useAppSelector(
    (state) => state.activeType.value
  ) as keyof Color;
  const dispatch = useAppDispatch();
  return (
    <div className="absolute flex flex-col select-none top-1/2 -translate-y-1/2 left-0 space-y-2 bg-white shadow border py-2 rounded-tr rounded-br">
      <div
        className="flex justify-end p-2 cursor-pointer text-slate-500 hover:text-black"
        onClick={() => setActive((prev) => !prev)}
      >
        {active ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />}
      </div>
      <div className={`space-y-2 ${!active && "hidden"}`}>
        {nameColorsShoe.map((item) => (
          <div
            className={`m-2 px-2 text-slate-500 hover:text-black hover:border-black hover:border-l-2 cursor-pointer ${
              activeType === item.name && "border-l-2 border-black text-black"
            }`}
            key={item.name}
            onClick={(): void => {
              dispatch(changeColorTest({ name: activeType, color: "" }));
              dispatch(changeActive(item.name));
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
const nameColorsShoe: { name: keyof Color; text: String }[] = [
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
