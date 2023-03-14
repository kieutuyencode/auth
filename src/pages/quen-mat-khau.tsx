import Input from "@/components/Input";
import { HiOutlineMail } from "react-icons/hi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";

const FormSchema = z.object({
  email: z.string().email("Email không hợp lệ."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function ForgotPassword() {
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
      const { data } = await axios.post("/api/auth/forgotPassword", {
        ...values,
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
        <h1 className="text-2xl text-center font-semibold">Quên mật khẩu?</h1>
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
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="mt-6 shadow-lg hover:shadow-violet-400 px-5 py-3 rounded-xl bg-violet-600 text-white font-bold cursor-pointer w-full flex justify-center items-center gap-2 relative"
          >
            <span className={`${isSubmitting && "invisible"}`}>
              Gửi yêu cầu
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
