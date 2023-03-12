import { useSession } from "next-auth/react";
import { MdOutlineClose } from "react-icons/md";

export default function FavoriteColor({
  favoriteColor,
  handlerTest,
}: {
  favoriteColor: string[];
  handlerTest: (color: string) => void;
}) {
  const { data: session } = useSession();

  return (
    <div className="shadow border rounded-lg p-4 flex gap-2 items-center overflow-x-auto bg-white">
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
                <MdOutlineClose className="absolute top-0 right-0 hover:fill-white hover:bg-red-500 w-5 h-5 bg-gray-200" />
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
