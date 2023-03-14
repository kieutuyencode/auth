import { HTMLInputTypeAttribute, useState } from "react";
import { ImEye, ImEyeBlocked } from "react-icons/im";

export default function Input({
  icon,
  placehoder,
  type,
  name,
  register,
  error,
  isSubmitting,
}: {
  icon: JSX.Element;
  placehoder: string;
  type: HTMLInputTypeAttribute;
  name: string;
  register: any;
  error: any;
  isSubmitting: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
          {icon}
        </span>
        <input
          {...register(name)}
          type={type === "password" ? (showPassword ? "text" : type) : type}
          placeholder={placehoder}
          className={`focus:outline-none w-full py-2 px-9 shadow border rounded-xl overflow-hidden ${
            error
              ? "focus:shadow-[0_0_0_2px] focus:shadow-red-500 border-red-500"
              : "focus:shadow-[0_0_0_2px] focus:shadow-violet-600"
          }`}
          disabled={isSubmitting}
        />
        {type === "password" && (
          <span
            className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-500 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <ImEye /> : <ImEyeBlocked />}
          </span>
        )}
      </div>
      {error && <span className="text-red-500 ml-3">{error}</span>}
    </>
  );
}
