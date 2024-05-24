"use client";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserLoginForm,
  UserLoginSchema,
} from "@/app/api/interfaces/users/schema";
import { Spinner } from "flowbite-react";
import { useState } from "react";

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginForm>({ resolver: zodResolver(UserLoginSchema) });

  const [isVisible, setIsVisible] = useState(false);

  const onSubmit: SubmitHandler<UserLoginForm> = async (
    data: UserLoginForm
  ) => {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
      }).then(() => {
        window.location.replace("/admin/dashboard");
      });
    } catch (error) {
      setError("root", {
        type: "server",
        message: String(error),
      });
    }
  };

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      {/* <!-- Modal content --> */}
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        {/* <!-- Modal header --> */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Login
          </h3>
        </div>
        {/* <!-- Modal body --> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="p-4 flex flex-col md:p-5"
        >
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p role="alert" className="text-rose-500 text-center">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  placeholder="********"
                  type={isVisible ? "text" : "password"}
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setIsVisible((prev) => !prev)}
                  className="absolute top-0 end-0 p-3.5 rounded-e-md"
                >
                  <svg
                    className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      className="hs-password-active:hidden"
                      d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                    ></path>
                    <path
                      className="hs-password-active:hidden"
                      d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                    ></path>
                    <path
                      className="hs-password-active:hidden"
                      d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                    ></path>
                    <line
                      className="hs-password-active:hidden"
                      x1="2"
                      x2="22"
                      y1="2"
                      y2="22"
                    ></line>
                    <path
                      className="hidden hs-password-active:block"
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    ></path>
                    <circle
                      className="hidden hs-password-active:block"
                      cx="12"
                      cy="12"
                      r="3"
                    ></circle>
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-span-2">
              {errors.root && (
                <p role="alert" className="text-rose-500 text-center">
                  {errors.root.message}
                </p>
              )}
            </div>
          </div>
          <button type="submit" className="self-center dashboard__button">
            {isSubmitting && (
              <span className="mr-4">
                <Spinner />
              </span>
            )}
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
