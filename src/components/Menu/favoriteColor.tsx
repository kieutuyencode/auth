import { MdOutlineClose } from "react-icons/md";

export default function FavoriteColor() {
  return (
    <div className="shadow-lg border rounded-lg p-4 flex gap-2 items-center overflow-x-auto bg-white">
      {/* {favoriteColor.length > 0 ? (
        favoriteColor.map((item, i) => {
          return (
            <div
              className="grid place-items-center border-2 border-black hover:border-green-500 w-[72px] h-[72px] rounded-full flex-shrink-0 cursor-pointer relative"
              onClick={() => changeColorTest(item)}
              key={i}
            >
              <div
                className="w-16 h-16 rounded-full"
                style={{ background: item }}
              >
                <MdOutlineClose
                  className="absolute top-0 right-0 hover:fill-white hover:bg-red-500 w-5 h-5 bg-gray-200"
                  onClick={(event) => {
                    event.stopPropagation();
                    setFavoriteColor((prev) =>
                      prev.filter((color, index) => index !== i)
                    );
                  }}
                />
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="text-xl mx-auto font-semibold">Chưa có màu ưa thích!</h1>
      )} */}
      <h1 className="text-xl mx-auto font-semibold">Chưa có màu ưa thích!</h1>
    </div>
  );
}
