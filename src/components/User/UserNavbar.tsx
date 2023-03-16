import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function UserNavbar() {
  const router = useRouter();

  return (
    <ul className="m-4 font-semibold text-violet-700 flex md:flex-col gap-2 justify-between overflow-x-auto md:overflow-hidden text-center md:text-left items-center">
      <li className="flex-shrink-0">
        <Link
          href="/user"
          className={`w-[150px] py-2 px-4 ${
            router.pathname === "/user"
              ? "rounded-lg bg-violet-100 block"
              : "rounded-lg text-black hover:text-violet-700 hover:bg-violet-100 block"
          }`}
        >
          Trang cá nhân
        </Link>
      </li>
      <li className="flex-shrink-0">
        <Link
          href="/user/doi-mat-khau"
          className={`w-[150px] py-2 px-4 ${
            router.pathname === "/user/doi-mat-khau"
              ? "rounded-lg bg-violet-100 block"
              : "rounded-lg text-black hover:text-violet-700 hover:bg-violet-100 block"
          }`}
        >
          Đổi mật khẩu
        </Link>
      </li>
      <li className="flex-shrink-0">
        <button
          onClick={() => signOut()}
          className="w-[150px] py-2 px-4 rounded-lg text-black hover:text-violet-700 hover:bg-violet-100 md:text-left"
        >
          Đăng xuất
        </button>
      </li>
    </ul>
  );
}
