import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { BeatLoader } from "react-spinners";

export default function FavoriteColor({
  loading,
  favoriteColor,
  handlerTest,
  deleteColorServer,
}: {
  loading: boolean;
  favoriteColor: string[];
  handlerTest: (color: string) => void;
  deleteColorServer: (position: number) => void;
}) {
  const { data: session } = useSession();
  const ref = useRef<HTMLDivElement>(null);

  function handleScroll() {
    if (ref.current) ref.current.scrollLeft = 0;
  }

  useEffect(() => {
    handleScroll();
  }, [loading]);

  return (
    <div
      ref={ref}
      className={`shadow border rounded-lg p-4 flex gap-2 items-center ${
        loading ? "overflow-hidden" : "overflow-x-auto"
      } bg-white relative`}
    >
      {loading && (
        <div className="absolute bg-white/50 flex justify-center items-center inset-0 z-[1]">
          <BeatLoader color="#000" loading={true} />
        </div>
      )}
      {!session ? (
        <h1 className="text-center mx-auto font-semibold">
          Bạn chưa đăng nhập.
        </h1>
      ) : favoriteColor.length > 0 ? (
        favoriteColor.map((item, i) => {
          return (
            <div
              className="grid place-items-center border-2 border-black hover:border-green-500 w-[72px] h-[72px] rounded-full flex-shrink-0 cursor-pointer relative"
              key={i}
              onClick={() => handlerTest(item)}
            >
              <div
                className="w-16 h-16 rounded-full"
                style={{ background: item }}
              >
                <MdOutlineClose
                  className="absolute top-0 right-0 hover:fill-white hover:bg-red-500 w-5 h-5 bg-gray-200"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteColorServer(i);
                  }}
                />
                <span className="absolute inset-0 flex justify-center items-center text-xs pointer-events-none">
                  <span className="bg-white p-1 rounded-lg shadow border">
                    {item}
                  </span>
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="text-center mx-auto font-semibold">
          Chưa có màu ưa thích.
        </h1>
      )}
    </div>
  );
}
