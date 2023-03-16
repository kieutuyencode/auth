import { GrMenu, GrClose } from "react-icons/gr";
import Link from "next/link";
import { useState } from "react";
import User from "./User";
import { useSession } from "next-auth/react";
export default function Header() {
  const [active, setActive] = useState(false);
  const { data: session } = useSession();
  return (
    <>
      <nav className="select-none bg-white flex flex-col md:flex-row md:justify-between shadow-lg py-2 absolute z-50 top-0 left-0 right-0 md:px-12">
        <div className="flex justify-between items-center px-4">
          <Link href="/">
            <img
              src="/images/logo.png"
              className="w-14 h-w-14 md:w-20 md:h-20"
            />
          </Link>
          <button
            className="md:hidden"
            onClick={() => {
              setActive((prev) => !prev);
            }}
          >
            {active ? (
              <GrClose className="w-8 h-8" />
            ) : (
              <GrMenu className="w-8 h-8" />
            )}
          </button>
        </div>
        <ul
          className={`md:hidden divide-y divide-gray-300 mt-3 ${
            !active && "hidden"
          }`}
        >
          <li className="hover:bg-gray-200">
            <Link href="/" className="py-1 pl-6 block">
              Trang chủ
            </Link>
          </li>
          <li className="hover:bg-gray-200">
            <Link href="/bat-dau" className="py-1 pl-6 block">
              Bắt đầu
            </Link>
          </li>
          <li className="hover:bg-gray-200">
            <Link href="/gio-hang" className="py-1 pl-6 block">
              Giỏ hàng
            </Link>
          </li>
          {!session ? (
            <>
              <li className="hover:bg-gray-200">
                <Link href="/dang-nhap" className="py-1 pl-6 block">
                  Đăng nhập
                </Link>
              </li>
              <li className="hover:bg-gray-200">
                <Link href="/dang-ky" className="py-1 pl-6 block">
                  Đăng ký
                </Link>
              </li>
            </>
          ) : (
            <li className="hover:bg-gray-200 py-1 pl-6">
              <User mobile />
            </li>
          )}
        </ul>
        <ul className="hidden md:flex items-center">
          <li className="hover:underline">
            <Link href="/" className="block px-2">
              Trang chủ
            </Link>
          </li>
          <li className="hover:underline">
            <Link href="/bat-dau" className="block px-2">
              Bắt đầu
            </Link>
          </li>
          <li className="hover:underline">
            <Link href="/gio-hang" className="block px-2">
              Giỏ hàng
            </Link>
          </li>
        </ul>
        <ul className="hidden md:flex items-center">
          {session ? (
            <User />
          ) : (
            <>
              <li className="hover:underline">
                <Link href="/dang-nhap" className="block px-2">
                  Đăng nhập
                </Link>
              </li>
              <li className="">
                <Link href="/dang-ky" className="block px-2">
                  <span className="bg-violet-600 text-white rounded py-2 px-4 hover:bg-violet-500">
                    Đăng ký
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
