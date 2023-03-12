import { HexColorPicker } from "react-colorful";
import { BsSuitHeart } from "react-icons/bs";
import FavoriteColor from "./favoriteColor";
import { useAppDispatch, useAppSelector } from "@/store";
import { changeColor, changeColorTest } from "@/store/color";
import { Color } from "../Shoe/ModelShoe";
import { changeActive } from "@/store/activeType";
import { useEffect, useState } from "react";
import { ImEye, ImEyeBlocked } from "react-icons/im";

export default function ColorMenu({
  favoriteColor,
  updateFavoriteColor,
}: {
  favoriteColor: string[];
  updateFavoriteColor: (data: string[]) => void;
}) {
  const activeType = useAppSelector(
    (state) => state.activeType.value
  ) as keyof Color;
  const color = useAppSelector((state) => state.color.colors[activeType]);
  const colorTest = useAppSelector(
    (state) => state.color.colorsTest[activeType]
  );
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(true);

  function handlerTest(cl: string): void {
    dispatch(changeColorTest({ name: activeType, color: cl }));
  }

  useEffect(() => {
    setShow(true);
  }, [activeType]);
  return (
    <>
      {show && (
        <div className="grid grid-cols-2 gap-2">
          <div className="h-32 shadow rounded-lg">
            <HexColorPicker
              color={colorTest || color}
              onChange={(cl) => {
                handlerTest(cl);
              }}
            />
          </div>
          <FavoriteColor
            favoriteColor={favoriteColor}
            handlerTest={handlerTest}
          />
        </div>
      )}
      <div className="flex justify-center mt-2 gap-2 select-none">
        <button
          className="border border-black bg-white py-1 px-3 font-mono rounded"
          onClick={() => {
            dispatch(changeColor({ name: activeType, color: colorTest }));
            dispatch(changeActive(""));
          }}
        >
          OK
        </button>
        <button className="border border-black bg-white py-1 px-3 font-mono rounded flex items-center">
          <span className="hidden md:flex">MÀU ƯU THÍCH</span>
          <BsSuitHeart className="inline md:ml-2" />
        </button>
        <button
          className="border border-black bg-white py-1 px-3 font-mono rounded flex items-center"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? <ImEye /> : <ImEyeBlocked />}
        </button>
        <button
          className="border border-black bg-white py-1 px-3 font-mono rounded"
          onClick={() => {
            handlerTest("");
            dispatch(changeActive(""));
          }}
        >
          HỦY
        </button>
      </div>
    </>
  );
}
