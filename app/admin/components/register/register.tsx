"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserForm, UserSchema } from "@/app/api/interfaces/users/schema";
import { useRef } from "react";
import { UserFormData } from "@/app/api/interfaces/users/types";
import { registerUser } from "@/app/api/interfaces/users/users.api";
import { CircularProgress, Divider, Stack, TextField, Typography } from "@mui/material";
import { CustomButton } from "../login";

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col sm:p-4 md:p-5"
      >
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight="bold">Create New User</Typography>
          <Divider />
          <TextField
            label="Name"
            type="text"
            id="name"
            size="small"
            sx={{ width: "100%" }}
            placeholder="Johnny Cash"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            required
          />
          <TextField
            label="Email"
            size="small"
            sx={{ width: "100%" }}
            error={!!errors.email}
            helperText={errors.email?.message}
            type="email"
            id="email"
            placeholder="jonnycash@mail.com"
            {...register("email")}
            required
          />
          <TextField
            label="Password"
            size="small"
            sx={{ width: "100%" }}
            error={!!errors.password}
            helperText={errors.password?.message}
            placeholder="********"
            type="password"
            id="password"
            {...register("password")}
            required
          />
          <TextField
            inputRef={confirmPasswordRef}
            label="Confirm Password"
            size="small"
            sx={{ width: "100%" }}
            placeholder="********"
            onChange={checkPassword}
            onSubmitCapture={checkPassword}
            type="password"
            name="confirm-password"
            id="confirm-password"
            required
          />

          {errors.root && (
            <Typography color="error" role="alert">
              {errors.root.message}
            </Typography>
          )}

          {isSubmitSuccessful && (
            <>
              <Typography color="green" role="success">
                User have been successfully updated
              </Typography>
              <Typography color="green" role="success">
                {customSuccessText}
              </Typography>
            </>
          )}

          <CustomButton
            type="submit"
            disabled={!isValid}
            variant="contained"
            color="primary"
            sx={{ width: "-webkit-fit-content" }}
          >
            Update dashboard user
            {isSubmitting && (
              <span className="mr-4">
                <CircularProgress size="20px" />
              </span>
            )}
          </CustomButton>
        </Stack>
      </form>
    </>
  );
}
