import Header from "@/components/Header";
import { getSession, useSession } from "next-auth/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserInput from "@/components/User/UserInput";
import { NextPageContext } from "next";
import connectDb from "@/utils/connectDb";
import User from "@/models/User";
import UserNavbar from "@/components/User/UserNavbar";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function UserPage({
  info,
}: {
  info: {
    name: string;
    phone: string;
    address: string;
  };
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const [submit, setSubmit] = useState(false);
  const FormSchema = z.object({
    phone: z
      .string()
      .regex(
        /^(0[2|3|5|7|8|9])([0-9]{8}|[0-9]{9})$/,
        "Số điện thoại không hợp lệ"
      ),
    address: z
      .string()
      .min(5, "Mô tả địa chỉ chi tiết hơn, ít nhất 5 ký tự.")
      .max(100, "Độ dài địa chỉ tối đa 100 ký tự."),
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
      const { data } = await axios.post("/api/updateInfo", {
        ...values,
        email: session?.user?.email,
      });
      router.reload();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (watch().phone !== info.phone || watch().address !== info.address) {
      return setSubmit(true);
    }
    setSubmit(false);
  }, [watch("phone"), watch("address")]);

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
                Thông tin cá nhân
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3">
                  <UserInput
                    label="Số điện thoại"
                    placehoder="Nhập số điện thoại"
                    type="text"
                    value={info.phone}
                    name="phone"
                    register={register}
                    error={errors?.phone?.message}
                    isSubmitting={isSubmitting}
                  />
                  <UserInput
                    label="Địa chỉ"
                    placehoder="Nhập địa chỉ"
                    type="text"
                    value={info.address}
                    name="address"
                    register={register}
                    error={errors?.address?.message}
                    isSubmitting={isSubmitting}
                  />
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <button
                    disabled={!submit || isSubmitting}
                    type="submit"
                    className="shadow-lg hover:shadow-violet-400 px-5 py-3 rounded-xl bg-violet-600 text-white font-bold cursor-pointer w-full md:w-fit flex justify-center items-center gap-2 relative disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:shadow-black/0"
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
                  {submit && (
                    <button
                      type="button"
                      className="px-5 py-3 font-medium"
                      onClick={() => reset()}
                    >
                      HỦY
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  await connectDb();
  const user = await User.findOne({ email: session?.user?.email }).lean();

  return {
    props: {
      info: {
        name: user.name as string,
        phone: user?.phone || ("" as string),
        address: user?.address || ("" as string),
      },
    },
  };
}
