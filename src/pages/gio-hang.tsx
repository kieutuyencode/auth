import Header from "@/components/Header";
import User from "@/models/User";
import Cart from "@/models/Cart";
import connectDb from "@/utils/connectDb";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Color } from "@/components/Shoe/ModelShoe";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";
import Modal from "@/components/Modal";
import { useState } from "react";
import { ImEye } from "react-icons/im";

interface CartProp extends Color {
  _id: string;
  time: Date;
}

export default function CartPage({ data }: { data: CartProp[] }) {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const [colorShow, setColorShow] = useState<Color>(colorsTest);
  function closeModal(): void {
    setShow(false);
  }

  return (
    <>
      <Header />
      {!session ? (
        <h1 className="mt-40 text-center font-medium text-2xl">
          Bạn chưa đăng nhập.
        </h1>
      ) : data.length > 0 ? (
        <>
          {show && <Modal closeModal={closeModal} colorShow={colorShow} />}
          <div className="mt-40 mb-16 mx-5">
            <div className="overflow-x-auto w-full">
              <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden shadow border">
                <thead className="bg-gray-900">
                  <tr className="text-white text-center">
                    <th className="font-semibold text-sm uppercase px-6 py-4">
                      Mã sản phẩm
                    </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4">
                      Thời gian mua
                    </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4">
                      Thành phần màu
                    </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4">
                      Xem
                    </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => {
                    const date = new Date(item.time);
                    const days = [
                      "Chủ nhật",
                      "Thứ hai",
                      "Thứ ba",
                      "Thứ tư",
                      "Thứ năm",
                      "Thứ sáu",
                      "Thứ bảy",
                    ];
                    const dayOfWeek = days[date.getDay()];
                    const day = date.getDate().toString().padStart(2, "0");
                    const month = (date.getMonth() + 1)
                      .toString()
                      .padStart(2, "0");
                    const year = date.getFullYear();
                    const hour = date.getHours().toString().padStart(2, "0");
                    const minute = date
                      .getMinutes()
                      .toString()
                      .padStart(2, "0");
                    return (
                      <tr key={item._id}>
                        <td className="px-6 py-4 border text-center">
                          {item._id}
                        </td>
                        <td className="px-6 py-4 border text-left">
                          {`${dayOfWeek}, ngày ${day}/${month}/${year} lúc ${hour}:${minute}.`}
                        </td>
                        <td className="px-6 py-4 border">
                          <div className="flex gap-1">
                            <span
                              className="px-2 shadow flex items-center justify-center text-center rounded-xl py-1"
                              style={{
                                border: `2px solid ${item.laces}`,
                              }}
                            >
                              Dây giày
                            </span>
                            <span
                              className="px-2 shadow flex items-center justify-center text-center rounded-xl py-1"
                              style={{
                                border: `2px solid ${item.mesh}`,
                              }}
                            >
                              Thân giày
                            </span>
                            <span
                              className="px-2 shadow flex items-center justify-center text-center rounded-xl py-1"
                              style={{
                                border: `2px solid ${item.caps}`,
                              }}
                            >
                              Lỗ xỏ dây
                            </span>
                            <span
                              className="px-2 shadow flex items-center justify-center text-center rounded-xl py-1"
                              style={{
                                border: `2px solid ${item.inner}`,
                              }}
                            >
                              Bên trong giày
                            </span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            <span
                              className="px-2 shadow flex items-center justify-center text-center rounded-xl py-1"
                              style={{
                                border: `2px solid ${item.sole}`,
                              }}
                            >
                              Đế giày
                            </span>
                            <span
                              className="px-2 shadow flex items-center justify-center text-center rounded-xl py-1"
                              style={{
                                border: `2px solid ${item.stripes}`,
                              }}
                            >
                              Sọc vằn
                            </span>
                            <span
                              className="px-2 shadow flex items-center justify-center text-center rounded-xl py-1"
                              style={{
                                border: `2px solid ${item.band}`,
                              }}
                            >
                              Quai móc giày
                            </span>
                            <span
                              className="px-2 shadow flex items-center justify-center text-center rounded-xl py-1"
                              style={{
                                border: `2px solid ${item.patch}`,
                              }}
                            >
                              Đế sau
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 border text-center">
                          <ImEye
                            className="text-2xl cursor-pointer"
                            onClick={() => {
                              setShow(true);
                              setColorShow({
                                band: item.band,
                                caps: item.caps,
                                inner: item.inner,
                                laces: item.laces,
                                mesh: item.mesh,
                                patch: item.patch,
                                sole: item.sole,
                                stripes: item.stripes,
                              });
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 border">
                          <MdOutlineDeleteOutline
                            className="text-4xl cursor-pointer hover:text-red-500"
                            onClick={async () => {
                              try {
                                const { data } = await axios.delete(
                                  "/api/addToCart",
                                  {
                                    data: {
                                      id: item._id,
                                    },
                                  }
                                );
                                Router.push("/gio-hang");
                              } catch (error: any) {
                                toast.error(error.response.data.message);
                              }
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <h1 className="mt-40 text-center font-medium text-2xl">
          Bạn chưa mua sản phẩm nào hết.
        </h1>
      )}
    </>
  );
}
export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  await connectDb();
  const user = await User.findOne({ email: session?.user?.email }).lean();
  const cart = await Cart.find({ user: user?._id })
    .select("-user -__v")
    .sort("-time")
    .lean();

  return {
    props: {
      data: JSON.parse(JSON.stringify(cart)) || [],
    },
  };
}
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
