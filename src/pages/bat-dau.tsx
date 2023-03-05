import Header from "@/components/Header";
import BeatLoaderSpinner from "@/components/Loader/BeatLoader";
import MenuType from "@/components/Menu";
import { Suspense, lazy, useState } from "react";
const Shoe = lazy(() => import("@/components/Shoe"));

export default function GetStart() {
  const [color, setColor] = useState(colorsShoe);
  const [colorTest, setColorTest] = useState(colorsTest);
  return (
    <>
      <Header />
      <MenuType
        color={color}
        setColor={setColor}
        colorTest={colorTest}
        setColorTest={setColorTest}
      />
      <Suspense fallback={<BeatLoaderSpinner />}>
        <div className="absolute inset-0 -z-50">
          <Shoe edit={true} colors={color} colorsTest={colorTest} />
        </div>
      </Suspense>
      <div
        id="edit"
        className="-z-10 absolute bottom-2 w-[75vw] left-1/2 -translate-x-1/2"
      >
        <button className="block w-fit mx-auto mb-10 select-none border bg-black text-white rounded-2xl px-4 py-3 hover:bg-white hover:text-black hover:border hover:border-black duration-200 tracking-wider font-semibold">
          XÁC NHẬN MUA GIÀY
        </button>
      </div>
    </>
  );
}
const colorsShoe = {
  laces: "#fff",
  mesh: "#fff",
  caps: "#fff",
  inner: "#fff",
  sole: "#fff",
  stripes: "#fff",
  band: "#fff",
  patch: "#fff",
};
const colorsTest = {
  laces: "",
  mesh: "",
  caps: "",
  inner: "",
  sole: "",
  stripes: "",
  band: "",
  patch: "",
};
