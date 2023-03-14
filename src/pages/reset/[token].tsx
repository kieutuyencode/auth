import Input from "@/components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
import { FiLock } from "react-icons/fi";
import { NextPageContext } from "next";
import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import bcrypt from "bcryptjs";

const FormSchema = z
  .object({
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

export default function ForgotPassword({
  showPage,
  email,
  token,
}: {
  showPage: string;
  email: string;
  token: string;
}) {
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
      const { data } = await axios.post("/api/auth/resetPassword", {
        ...values,
        email,
        token,
      });
      toast.success(data.message);
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
        {showPage ? (
          <h1 className="text-xl font-medium">{showPage}</h1>
        ) : (
          <>
            <h1 className="text-2xl text-center font-semibold">
              Đặt lại mật khẩu
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 mt-8">
                <Input
                  icon={<FiLock />}
                  placehoder="Mật khẩu mới"
                  type="password"
                  name="password"
                  register={register}
                  error={errors?.password?.message}
                  isSubmitting={isSubmitting}
                />
                <Input
                  icon={<FiLock />}
                  placehoder="Nhập lại mật khẩu mới"
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
                <span className={`${isSubmitting && "invisible"}`}>
                  Đặt lại mật khẩu
                </span>
                {isSubmitting && (
                  <BeatLoader
                    size={12}
                    color="#fff"
                    className="absolute inset-0 flex justify-center items-center"
                  />
                )}
              </button>
            </form>
          </>
        )}

        <p className="text-slate-500 mt-4 text-center">
          Quay về trang
          <Link href="/dang-nhap" className="text-violet-600 underline ml-1">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx: NextPageContext) {
  const { query } = ctx;
  const { token, q: email } = query as { token: string; q: string };

  await connectDb();
  const user = await User.findOne({ email }).lean();

  let showPage = "";

  if (
    !user ||
    !user?.passwordResetExpires ||
    !user?.passwordResetToken ||
    user?.passwordResetExpires < Date.now() ||
    !(await bcrypt.compare(token, user?.passwordResetToken))
  ) {
    showPage =
      "Đường link đặt lại mật khẩu này không tồn tại hoặc đã hết hiệu lực.";
  }

  return {
    props: {
      showPage,
      email,
      token,
    },
  };
}
