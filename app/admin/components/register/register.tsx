"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserForm, UserSchema } from "@/app/api/interfaces/users/schema";
import { useRef } from "react";
import { UserFormData } from "@/app/api/interfaces/users/types";
import { registerUser } from "@/app/api/interfaces/users/users.api";
import { Spinner } from "flowbite-react";

interface RegisterProps {
  onSuccess?: (...args: any[]) => void;
  customSuccessText?: string;
}

export default function Register({
  onSuccess,
  customSuccessText,
}: RegisterProps) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<UserForm>({ resolver: zodResolver(UserSchema) });
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const password = watch("password");

  const checkPassword = () => {
    if (confirmPasswordRef?.current?.value !== password) {
      setError("root", {
        type: "confirmPassword",
        message: "Passwords should match",
      });
    } else {
      clearErrors("root");
    }
  };

  const onSubmit: SubmitHandler<UserForm> = async (data: UserFormData) => {
    try {
      await registerUser(data).then(() => {
        reset();
        onSuccess?.(data);
      });
    } catch (error) {
      setError("root", {
        type: "server",
        message: String(error),
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Create New User
        </h3>
      </div>
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
              Name
            </label>
            <input
              type="text"
              id="name"
              className="dashboard__input"
              placeholder="Type product name"
              {...register("name")}
            />
            {errors.name && (
              <p role="alert" className="text-rose-500 text-center">
                {errors.name?.message}
              </p>
            )}
          </div>
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
              className="dashboard__input"
              placeholder="Type product name"
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
            <input
              type="password"
              id="password"
              className="dashboard__input"
              placeholder="Type product name"
              {...register("password")}
            />
            {errors.password && (
              <p role="alert" className="text-rose-500 text-center">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              ref={confirmPasswordRef}
              onChange={checkPassword}
              onSubmitCapture={checkPassword}
              type="password"
              name="confirm-password"
              id="confirm-password"
              className="dashboard__input"
              placeholder="Type product name"
              required
            />
          </div>
          <div className="col-span-2">
            {errors.root && (
              <p role="alert" className="text-rose-500 text-center">
                {errors.root.message}
              </p>
            )}
            {isSubmitSuccessful && (
              <>
                <p role="success" className="text-green-500 text-center">
                  User have been successfully created
                </p>
                <p role="success" className="text-green-500 text-center">
                  {customSuccessText}
                </p>
              </>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isValid}
          className="self-center dashboard__button"
        >
          {isSubmitting && (
            <span className="mr-4">
              <Spinner />
            </span>
          )}
          Create dashboard user
        </button>
      </form>
    </>
  );
}
