import { BeatLoader } from "react-spinners";
import React from "react";

export default function BeatLoaderSpinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/50 z-40">
      <BeatLoader color="#000" loading={true} />
    </div>
  );
}
