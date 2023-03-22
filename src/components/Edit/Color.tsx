import { HexColorPicker } from "react-colorful";
import { BsSuitHeart } from "react-icons/bs";
import FavoriteColor from "./favoriteColor";
import { useAppDispatch, useAppSelector } from "@/store";
import { changeColor, changeColorTest } from "@/store/color";
import { Color } from "../Shoe/ModelShoe";
import { changeActive } from "@/store/activeType";
import { useEffect, useState } from "react";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";

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
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  function handlerTest(cl: string): void {
    dispatch(changeColorTest({ name: activeType, color: cl }));
  }
  async function addColorServer() {
    try {
      setLoading(true);
      const { data } = (await axios.post("/api/favoriteColor", {
        color: colorTest || color,
        email: session?.user?.email,
      })) as {
        data: {
          message: string;
          data: string[];
        };
      };
      updateFavoriteColor(data.data);
      toast.success(data.message);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  async function deleteColorServer(position: number) {
    try {
      setLoading(true);
      const { data } = (await axios.delete("/api/favoriteColor", {
        data: {
          position,
          email: session?.user?.email,
        },
      })) as {
        data: {
          message: string;
          data: string[];
        };
      };
      updateFavoriteColor(data.data);
      toast.success(data.message);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
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
            loading={loading}
            favoriteColor={favoriteColor}
            handlerTest={handlerTest}
            deleteColorServer={deleteColorServer}
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
        <button
          disabled={loading}
          onClick={addColorServer}
          className="border border-black bg-white py-1 px-3 font-mono rounded flex items-center"
        >
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
