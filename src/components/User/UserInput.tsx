import { HTMLInputTypeAttribute, useState } from "react";

export default function UserInput({
  label,
  placehoder,
  type,
  value,
  name,
  register,
  error,
  isSubmitting,
}: {
  label: string;
  placehoder: string;
  type: HTMLInputTypeAttribute;
  value: string;
  name: string;
  register: any;
  error: any;
  isSubmitting: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div>
        <label className="mb-1 block text-lg" htmlFor={name}>
          {label}
        </label>
        <input
          {...register(name)}
          id={name}
          type={type}
          defaultValue={value}
          placeholder={placehoder}
          className={`focus:outline-none w-full p-2 px-3 shadow border rounded-lg overflow-hidden ${
            error
              ? "focus:shadow-[0_0_0_2px] focus:shadow-red-500 border-red-500"
              : "focus:shadow-[0_0_0_2px] focus:shadow-violet-600"
          }`}
          disabled={isSubmitting || name === "name"}
        />
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </>
  );
}
