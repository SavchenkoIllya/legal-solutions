"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserForm, UserSchema } from "@/app/api/interfaces/users/schema";
import { useRef } from "react";
import { UserFormData } from "@/app/api/interfaces/users/types";
import { registerUser } from "@/app/api/interfaces/users/users.api";
import { SpinnerDiamond } from "spinners-react";

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
      <div className="flex items-center justify-between p-4 md:p-5 border-b dark:border-zinc-300 rounded-t">
        <h3 className="dashboard__label text-lg font-semibold">
          Create New User
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col sm:p-4 md:p-5"
      >
        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label htmlFor="name" className="dashboard__label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="dashboard__input"
            placeholder="Type product name"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p role="alert" className="text-rose-500 text-center">
            {errors.name?.message}
          </p>
        )}
        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label htmlFor="name" className="dashboard__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="dashboard__input"
            placeholder="Type product name"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p role="alert" className="text-rose-500 text-center">
            {errors.email?.message}
          </p>
        )}
        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label htmlFor="name" className="dashboard__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="dashboard__input"
            placeholder="Type product name"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p role="alert" className="text-rose-500 text-center">
            {errors.password?.message}
          </p>
        )}
        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label htmlFor="name" className="dashboard__label">
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
        <button
          type="submit"
          disabled={!isValid}
          className="self-center dashboard__button"
        >
          {isSubmitting && (
            <span className="mr-4">
              <SpinnerDiamond color="white" />
            </span>
          )}
          Create dashboard user
        </button>
      </form>
    </>
  );
}
