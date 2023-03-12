import Input from "@/components/Input";
import { FaRegUserCircle, FaUserAlt, FaUserPlus } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiLock } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { NextPageContext } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BeatLoader } from "react-spinners";
import Socials from "@/components/Socials";
import axios from "axios";
import Router from "next/router";

const FormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Độ dài tên ít nhất 2 ký tự.")
      .max(32, "Độ dài tên tối đa 32 ký tự."),
    email: z.string().email("Email không hợp lệ."),
    password: z
      .string()
      .min(6, "Độ dài mật khẩu ít nhất 6 ký tự.")
      .max(52, "Độ dài mật khẩu tối đa 52 ký tự."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không đúng.",
    path: ["confirmPassword"],
  });
type FormSchemaType = z.infer<typeof FormSchema>;

export default function Signup({ csrfToken }: { csrfToken: string }) {
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
    try {
      const { data } = await axios.post("/api/auth/signup", {
        ...values,
      });
      const res: any = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (res.error) {
        return toast.error(res.error);
      }
      Router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
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
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold hover:text-white hover:bg-violet-600 cursor-pointer text-violet-600 hover:shadow-lg hover:shadow-violet-400"
          >
            <FaUserAlt />
            Đăng nhập
          </Link>
          <Link
            href="/dang-ky"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-bold cursor-pointer shadow-lg hover:shadow-violet-400"
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
              icon={<FaRegUserCircle />}
              placehoder="Họ tên"
              type="text"
              name="name"
              register={register}
              error={errors?.name?.message}
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
            <Input
              icon={<FiLock />}
              placehoder="Nhập lại mật khẩu"
              type="password"
              name="confirmPassword"
              register={register}
              error={errors?.confirmPassword?.message}
              isSubmitting={isSubmitting}
            />
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="mt-6 shadow-lg hover:shadow-violet-400 px-5 py-3 rounded-xl bg-violet-600 text-white font-bold cursor-pointer w-full flex justify-center items-center gap-2 relative"
          >
            <span className={`${isSubmitting && "invisible"}`}>Đăng ký</span>
            {isSubmitting && (
              <BeatLoader
                size={12}
                color="#fff"
                className="absolute inset-0 flex justify-center items-center"
              />
            )}
          </button>
        </form>
        <Socials csrfToken={csrfToken} />
        <p className="text-slate-500 mt-4 text-center">
          Bạn đã có tài khoản?
          <Link href="/dang-nhap" className="text-violet-600 underline ml-1">
            Đăng nhập
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
