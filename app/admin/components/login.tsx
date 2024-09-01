"use client";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserLoginForm,
  UserLoginSchema,
} from "@/app/api/interfaces/users/schema";
import { useState } from "react";
import { Box, Button, ButtonProps, CircularProgress, Divider, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled, css } from '@mui/material/styles';

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
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
    <CustomCard sx={{ padding: "2rem" }}>
      <Typography variant="h5" fontWeight="bold">
        Login
      </Typography>
      <Divider />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-[260px] sm:w-[400px]"
      >
        <Box marginY={2}>
          <CustomTextField
            fullWidth
            sx={{ border: 'none', "& fieldset": { border: 'none' }, }}
            type="email"
            id="email"
            placeholder="Email"
            {...register("email")}
            size="small"
            error={Boolean(errors.email)}
            helperText={errors.email?.message || errors.root?.message}
            InputProps={{ disableUnderline: true }}
          />
        </Box>
        <Box marginY={2}>
          <CustomTextField
            sx={{ border: 'none', "& fieldset": { border: 'none' }, }}
            fullWidth
            id="password"
            type={isVisible ? "text" : "password"}
            {...register("password")}
            size="small"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setIsVisible((prev) => !prev)}
                  >
                    {isVisible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              disableUnderline: true
            }}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <CustomButton
            disabled={!isValid}
            variant="contained"
            type="submit"
            sx={{ textAlign: "center" }}>Submit
            {isSubmitting && (
              <span className="mr-4">
                <CircularProgress size="20px" />
              </span>
            )}
          </CustomButton>
        </Box>
      </form>
    </CustomCard>
  );
}
export const CustomCard = styled(Paper)(() => css`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 25px;
`)
export const CustomButton = styled((props: ButtonProps) => (
  <Button {...props} />
))(() => `
  && {
    background-color: #EFEEFE;
    color: #5152F4;
    box-shadow: none;
    font-weight: bold;
    text-transform: none;
    
    &:hover {
      background-color: #D7D4FF;
      box-shadow: none;
    }

    &.Mui-disabled {
      background-color: #E0E0E0;
      color: #B0B0B0;
      box-shadow: none;
      cursor: not-allowed;
    }
  }
`);

const CustomTextField = styled(TextField)(({ }) => css`
    background-color: #EDEEF2;
    border-radius: 10px;
`)