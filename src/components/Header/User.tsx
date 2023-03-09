import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";

export default function User({ mobile }: { mobile?: boolean }) {
  const { data: session } = useSession();
  return (
    <div className="cursor-pointer relative group">
      <div className="flex items-center">
        <img
          src={session?.user?.image as string}
          className="w-10 h-10 rounded-full"
        />
        <AiFillCaretDown />
      </div>
      <ul
        className={`hidden group-hover:block divide-y divide-gray-300 shadow border absolute ${
          mobile ? "left-0" : "right-0"
        } top-full bg-white min-w-[150px] rounded`}
      >
        <li className="hover:bg-gray-200">
          <Link href="/user" className="py-1 px-4 block">
            Trang cá nhân
          </Link>
        </li>
        <li className="hover:bg-gray-200">
          <Link href="/bat-dau" className="py-1 px-4 block">
            Bắt đầu
          </Link>
        </li>
        <li className="hover:bg-gray-200">
          <Link href="/tuy-chinh-giay" className="py-1 px-4 block">
            Tùy chỉnh giày
          </Link>
        </li>
        <li className="hover:bg-gray-200">
          <button onClick={() => signOut()} className="py-1 px-4 block">
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
}
