import Link from "next/link";
import { FaUserAlt, FaUserPlus } from "react-icons/fa";
import Socials from "@/components/Login_Signup/Socials";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BeatLoader } from "react-spinners";

export default function Login_Signup({
  type,
  children,
  isSubmitting,
  csrfToken,
}: {
  type: "login" | "signup";
  children: React.ReactNode;
  isSubmitting: boolean;
  csrfToken: string;
}) {
  const classTitle = [
    "flex items-center gap-2 px-5 py-3 rounded-xl font-bold hover:text-white hover:bg-violet-600 cursor-pointer text-violet-600 hover:shadow-lg hover:shadow-violet-400",
    "flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-bold cursor-pointer shadow-lg hover:shadow-violet-400",
  ];
  return (
    <div className="h-screen overflow-auto bg-gradient-to-r from-violet-500 to-fuchsia-500 grid place-items-center relative py-10 select-none">
      <div className="bg-white/90 rounded-xl py-6 px-8 shadow-lg">
        <Link
          href="/"
          className="flex shadow gap-2 items-center py-3 px-6 bg-white rounded-lg font-semibold w-fit mb-4"
        >
          <AiOutlineArrowLeft className="text-lg" /> TRANG CHỦ
        </Link>
        <div className="flex gap-1 sm:gap-4">
          <Link
            href="/dang-nhap"
            className={type === "login" ? classTitle[1] : classTitle[0]}
          >
            <FaUserAlt />
            Đăng nhập
          </Link>
          <Link
            href="/dang-ky"
            className={type === "signup" ? classTitle[1] : classTitle[0]}
          >
            <FaUserPlus />
            Đăng ký
          </Link>
        </div>
        <div className="space-y-4 mt-8">{children}</div>
        <button
          type="submit"
          className="mt-6 shadow-lg hover:shadow-violet-400 px-5 py-3 rounded-xl bg-violet-600 text-white font-bold cursor-pointer w-full flex justify-center items-center gap-2 relative"
        >
          <span className={`${isSubmitting && "invisible"}`}>
            {type === "signup" ? "Đăng ký" : "Đăng nhập"}
          </span>
          {isSubmitting && (
            <BeatLoader
              size={12}
              color="#fff"
              className="absolute inset-0 flex justify-center items-center"
            />
          )}
        </button>
        {type === "login" && (
          <p className="text-right mt-4 text-violet-600 text-sm font-bold">
            Bạn quên mật khẩu ?
          </p>
        )}
        <Socials csrfToken={csrfToken} />
        <p className="text-slate-500 mt-4 text-center">
          {type === "signup" ? (
            <>
              Bạn đã có tài khoản?
              <Link
                href="/dang-nhap"
                className="text-violet-600 underline ml-1"
              >
                Đăng nhập
              </Link>
            </>
          ) : (
            <>
              Bạn chưa có tài khoản?
              <Link href="/dang-ky" className="text-violet-600 underline ml-1">
                Đăng ký
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
