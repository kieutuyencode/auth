import Login_Signup from "@/components/Login_Signup";
import Input from "@/components/Input";
import { HiOutlineMail } from "react-icons/hi";
import { FiLock } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getCsrfToken } from "next-auth/react";
import { NextPageContext } from "next";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Login_Signup
        type="login"
        isSubmitting={isSubmitting}
        csrfToken={csrfToken}
      >
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
      </Login_Signup>
    </form>
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
