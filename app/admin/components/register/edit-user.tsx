"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserForm, UserSchemaWithoutPassword } from "@/app/api/interfaces/users/schema";
import { User } from "@/app/api/interfaces/users/types";
import { updateUser } from "@/app/api/interfaces/users/users.api";
import { CircularProgress, Divider, Stack, TextField, Typography } from "@mui/material";
import { CustomButton } from "../login";

interface EditUserProps {
    onSuccess?: (...args: any[]) => void;
    user: User;
    customSuccessText?: string;
}

export default function EditUser({
    customSuccessText,
    onSuccess,
    user
}: EditUserProps) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
    } = useForm<UpdateUserForm>({ defaultValues: { email: user.email, name: user.name }, resolver: zodResolver(UserSchemaWithoutPassword) });
    const onSubmit: SubmitHandler<UpdateUserForm> = async (data: UpdateUserForm) => {
        try {
            await updateUser(user.id, { name: data.name, email: data.email }).then(() => {
                onSuccess?.()
            })
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
            >
                <Stack spacing={2}>
                    <Typography variant="h5" fontWeight="bold">Update user: {user?.id} {user.name}</Typography>
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
