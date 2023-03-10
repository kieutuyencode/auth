import Input from "@/components/Input";
import { HiOutlineMail } from "react-icons/hi";
import { FiLock } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getCsrfToken } from "next-auth/react";
import { NextPageContext } from "next";
import Link from "next/link";
import Socials from "@/components/Socials";
import { BeatLoader } from "react-spinners";
import { FaUserAlt, FaUserPlus } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";

const FormSchema = z.object({
  email: z.string().email("Email không hợp lệ."),
  password: z
    .string()
    .min(6, "Độ dài mật khẩu ít nhất 6 ký tự.")
    .max(52, "Độ dài mật khẩu tối đa 52 ký tự."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function Login({ csrfToken }: { csrfToken: string }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    // try {
    //   const { data } = await axios.post("/api/auth/signup", {
    //     ...values,
    //   });
    //   reset();
    //   toast.success(data.message);
    // } catch (error: any) {
    //   toast.error(error.response.data.message);
    // }
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 5000);
    });
    toast.success("abc");
  };
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
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-bold cursor-pointer shadow-lg hover:shadow-violet-400"
          >
            <FaUserAlt />
            Đăng nhập
          </Link>
          <Link
            href="/dang-ky"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold hover:text-white hover:bg-violet-600 cursor-pointer text-violet-600 hover:shadow-lg hover:shadow-violet-400"
          >
            <FaUserPlus />
            Đăng ký
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 mt-8">
            <Input
              icon={<HiOutlineMail />}
              placehoder="Email"
              type="text"
              name="email"
              register={register}
              error={errors?.email?.message}
              isSubmitting={isSubmitting}
            />
            <Input
              icon={<FiLock />}
              placehoder="Mật khẩu"
              type="password"
              name="password"
              register={register}
              error={errors?.password?.message}
              isSubmitting={isSubmitting}
            />
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="mt-6 shadow-lg hover:shadow-violet-400 px-5 py-3 rounded-xl bg-violet-600 text-white font-bold cursor-pointer w-full flex justify-center items-center gap-2 relative"
          >
            <span className={`${isSubmitting && "invisible"}`}>Đăng nhập</span>
            {isSubmitting && (
              <BeatLoader
                size={12}
                color="#fff"
                className="absolute inset-0 flex justify-center items-center"
              />
            )}
          </button>
        </form>
        <p className="text-right mt-4 text-violet-600 text-sm font-bold">
          Bạn quên mật khẩu ?
        </p>
        <Socials csrfToken={csrfToken} />
        <p className="text-slate-500 mt-4 text-center">
          Bạn chưa có tài khoản?
          <Link href="/dang-ky" className="text-violet-600 underline ml-1">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx: NextPageContext) {
  const csrfToken = await getCsrfToken(ctx);

  return {
    props: {
      csrfToken,
    },
  };
}
