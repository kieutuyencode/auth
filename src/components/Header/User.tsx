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
      <div
        className={`hidden shadow border top-full bg-white rounded group-hover:block absolute ${
          mobile ? "left-0" : "right-0"
        } min-w-[270px]`}
      >
        <div className="flex gap-2 p-2">
          <img
            src={session?.user?.image as string}
            className="w-16 h-16 rounded-full"
          />
          <div className="flex flex-col justify-center">
            <span className="text-sm font-medium">{session?.user?.name}</span>
            <p className="text-xs">{session?.user?.email}</p>
          </div>
        </div>
        <ul className="border-t mb-2">
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
    </div>
  );
}
