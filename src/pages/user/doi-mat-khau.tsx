import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserNavbar from "@/components/User/UserNavbar";
import { BeatLoader } from "react-spinners";
import Input from "@/components/Input";
import { FiLock } from "react-icons/fi";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

export default function ChanPassword() {
  const { data: session } = useSession();
  const FormSchema = z
    .object({
      passwordCurrent: z
        .string()
        .min(6, "Độ dài mật khẩu hiện tại ít nhất 6 ký tự.")
        .max(52, "Độ dài mật khẩu hiện tại tối đa 52 ký tự."),
      newPassword: z
        .string()
        .min(6, "Độ dài mật khẩu mới ít nhất 6 ký tự.")
        .max(52, "Độ dài mật khẩu mới tối đa 52 ký tự."),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Mật khẩu mới nhập lại không đúng.",
      path: ["confirmPassword"],
    });

  type FormSchemaType = z.infer<typeof FormSchema>;

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
      const { data } = await axios.post("/api/auth/changePassword", {
        ...values,
        email: session?.user?.email,
      });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="px-4">
        <div className="mt-32 mb-16 container mx-auto grid grid-cols-1 md:grid-cols-3 bg-white rounded-xl border shadow max-w-3xl w-full">
          <div>
            <div className="p-8">
              <img
                src={session?.user?.image as string}
                className="w-32 h-32 rounded-full mx-auto"
              />
              <p className="font-bold mt-2 text-center">
                {session?.user?.name}
              </p>
            </div>
            <UserNavbar />
          </div>
          <div className="col-span-2">
            <div className="p-6 md:px-12">
              <h1 className="pt-8 text-3xl font-medium text-center mb-8">
                Đổi mật khẩu
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3">
                  <Input
                    icon={<FiLock />}
                    placehoder="Mật khẩu hiện tại"
                    type="password"
                    name="passwordCurrent"
                    register={register}
                    error={errors?.passwordCurrent?.message}
                    isSubmitting={isSubmitting}
                  />
                  <Input
                    icon={<FiLock />}
                    placehoder="Mật khẩu mới"
                    type="password"
                    name="newPassword"
                    register={register}
                    error={errors?.newPassword?.message}
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
                <Link
                  href="/quen-mat-khau"
                  className="text-right block mt-4 text-violet-600 text-sm font-bold"
                >
                  Bạn quên mật khẩu ?
                </Link>
                <div className="mt-6 flex items-center gap-4">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="shadow-lg hover:shadow-violet-400 px-5 py-3 rounded-xl bg-violet-600 text-white font-bold cursor-pointer w-full flex justify-center items-center gap-2 relative disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:shadow-black/0"
                  >
                    <span className={`${isSubmitting && "invisible"}`}>
                      Lưu thay đổi
                    </span>
                    {isSubmitting && (
                      <BeatLoader
                        size={12}
                        color="#fff"
                        className="absolute inset-0 flex justify-center items-center"
                      />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
