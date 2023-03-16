import { lazy, Suspense } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import BeatLoaderSpinner from "../Loader/BeatLoader";
import { Color } from "../Shoe/ModelShoe";
const Shoe = lazy(() => import("@/components/Shoe"));

export default function Modal({
  closeModal,
  colorShow,
}: {
  closeModal: () => void;
  colorShow: Color;
}) {
  return (
    <div className="absolute inset-0 z-30 grid items-center">
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-white z-0">
            <BeatLoaderSpinner />
          </div>
        }
      >
        <Shoe edit colors={colorsShoe} colorsTest={colorShow} modal />
      </Suspense>
      <span className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <AiOutlineCloseCircle
          className="w-14 h-14 hover:text-red-500 cursor-pointer"
          onClick={closeModal}
        />
      </span>
    </div>
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
  laces: "#fff",
  mesh: "#fff",
  caps: "#fff",
  inner: "#fff",
  sole: "#fff",
  stripes: "#fff",
  band: "#fff",
  patch: "#fff",
};
