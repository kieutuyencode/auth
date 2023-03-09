import { HexColorPicker } from "react-colorful";
import { BsSuitHeart } from "react-icons/bs";
import FavoriteColor from "./favoriteColor";
import { useAppDispatch, useAppSelector } from "@/store";
import { changeColor, changeColorTest } from "@/store/color";
import { Color } from "../Shoe/ModelShoe";
import { changeActive } from "@/store/activeType";

export default function ColorMenu() {
  const activeType = useAppSelector(
    (state) => state.activeType.value
  ) as keyof Color;
  const color = useAppSelector((state) => state.color.colors[activeType]);
  const colorTest = useAppSelector(
    (state) => state.color.colorsTest[activeType]
  );
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="h-32 grid grid-cols-2 gap-2 ">
        <HexColorPicker
          color={colorTest || color}
          onChange={(cl) => {
            dispatch(changeColorTest({ name: activeType, color: cl }));
          }}
        />
        {/* <FavoriteColor
          changeColorTest={changeColorTest}
          favoriteColor={favoriteColor}
          setFavoriteColor={setFavoriteColor}
        /> */}
      </div>
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
        {/* <button
          className="border border-black bg-white py-1 px-3 font-mono rounded flex items-center"
          onClick={() => {
            setFavoriteColor((prev) => [colorTest || color, ...prev]);
          }}
        >
          <span className="hidden md:flex">MÀU ƯU THÍCH</span>
          <BsSuitHeart className="inline md:ml-2" />
        </button> */}
        <button
          className="border border-black bg-white py-1 px-3 font-mono rounded"
          onClick={() => {
            dispatch(changeColorTest({ name: activeType, color: "" }));
            dispatch(changeActive(""));
          }}
        >
          HỦY
        </button>
      </div>
    </>
  );
}
