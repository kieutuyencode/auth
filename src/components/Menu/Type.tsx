import { useState } from "react";
import { createPortal } from "react-dom";
import Color from "./Color";
export default function Type({
  name,
  text,
  changeColor,
  color,
  changeColorTest,
  colorTest,
  currentActive,
  setCurrentActive,
}) {
  const [favoriteColor, setFavoriteColor] = useState([]);
  return (
    <>
      <div
        className={`m-2 px-2 text-slate-500 hover:text-black hover:border-black hover:border-l-2 cursor-pointer ${
          currentActive === name && "border-l-2 border-black text-black"
        }`}
        onClick={() => setCurrentActive(name)}
      >
        {text}
      </div>
      {currentActive === name &&
        createPortal(
          <Color
            color={color}
            colorTest={colorTest}
            changeColor={changeColor}
            changeColorTest={changeColorTest}
            setCurrentActive={setCurrentActive}
            favoriteColor={favoriteColor}
            setFavoriteColor={setFavoriteColor}
          />,
          document.getElementById("edit")
        )}
    </>
  );
}
