import { HexColorPicker } from "react-colorful";
import { BsSuitHeart } from "react-icons/bs";
import { useEffect } from "react";
import FavoriteColor from "./favoriteColor";

export default function Color({
  colorTest,
  color,
  changeColorTest,
  changeColor,
  setCurrentActive,
  favoriteColor,
  setFavoriteColor,
}) {
  useEffect(() => {
    return () => {
      changeColorTest("");
    };
  }, []);
  return (
    <>
      <div className="h-32 grid grid-cols-2 gap-2 ">
        <HexColorPicker
          color={colorTest || color}
          onChange={(cl) => {
            changeColorTest(cl);
          }}
        />
        <FavoriteColor
          changeColorTest={changeColorTest}
          favoriteColor={favoriteColor}
          setFavoriteColor={setFavoriteColor}
        />
      </div>
      <div className="flex justify-center mt-2 gap-2 select-none">
        <button
          className="border border-black bg-white py-1 px-3 font-mono rounded"
          onClick={() => {
            changeColor(colorTest);
            setCurrentActive("");
          }}
        >
          OK
        </button>
        <button
          className="border border-black bg-white py-1 px-3 font-mono rounded flex items-center"
          onClick={() => {
            setFavoriteColor((prev) => [colorTest || color, ...prev]);
          }}
        >
          <span className="hidden md:flex">MÀU ƯU THÍCH</span>
          <BsSuitHeart className="inline md:ml-2" />
        </button>
        <button
          className="border border-black bg-white py-1 px-3 font-mono rounded"
          onClick={() => {
            changeColorTest("");
            setCurrentActive("");
          }}
        >
          HỦY
        </button>
      </div>
    </>
  );
}
