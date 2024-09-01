"use client";
import { Contacts as ContactsType } from "@/app/api/interfaces/contacts/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactsForm,
  ContactsSchema,
} from "@/app/api/interfaces/contacts/schema";
import { updateContacts } from "@/app/api/interfaces/contacts/contacts.api";
import { CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { CustomButton } from "@/app/admin/components/login";

type ContactsProps = { contacts: ContactsType[] };

export default function Contacts({ contacts }: ContactsProps) {
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<ContactsType>({
    resolver: zodResolver(ContactsSchema),
    defaultValues: {
      email: contacts[0].email,
      telephone: contacts[0].telephone,
      telegram: contacts[0].telegram,
      whatsapp: contacts[0].whatsapp,
      work_hours: contacts[0].work_hours,
      instagram: contacts[0].instagram,
    },
  });

  const onSubmit: SubmitHandler<ContactsType> = async (data: ContactsForm) => {
    try {
      await updateContacts(data);
      reset();
    } catch (error) {
      setError("root", {
        type: "server",
        message: String(error),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Stack spacing={2}>
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

        <TextField
          label="Telephone"
          size="small"
          sx={{ width: "100%" }}
          error={!!errors.telephone}
          helperText={errors.telephone?.message}
          type="text"
          id="telephone"
          placeholder="+491234567890"
          {...register("telephone")}
        />

        <TextField
          label="Work hours"
          size="small"
          sx={{ width: "100%" }}
          error={!!errors.work_hours}
          helperText={errors.work_hours?.message}
          type="text"
          placeholder="8:00 — 16:00"
          id="work_hours"
          {...register("work_hours")}
        />

        <TextField
          label="Telegram"
          size="small"
          sx={{ width: "100%" }}
          error={!!errors.telegram}
          helperText={errors.telegram?.message}
          type="text"
          placeholder="https://t.me/userName"
          id="telegram"
          {...register("telegram")}
        />

        <TextField
          label="Instagram"
          size="small"
          sx={{ width: "100%" }}
          error={!!errors.instagram}
          helperText={errors.instagram?.message}
          type="text"
          placeholder="https://www.instagram.com/Google"
          id="instagram"
          {...register("instagram")}
        />
        <TextField
          label="Instagram"
          size="small"
          sx={{ width: "100%" }}
          error={!!errors.whatsapp}
          helperText={errors.whatsapp?.message}
          type="text"
          placeholder="https://wa.me/<number>"
          id="whatsapp"
          {...register("whatsapp")}
        />

        {errors.root && (
          <Typography color="error" role="alert">
            {errors.root.message}
          </Typography>
        )}

        {isSubmitSuccessful && (
          <Typography color="green" role="success">
            User have been successfully updated
          </Typography>
        )}

        <CustomButton
          type="submit"
          disabled={!isValid}
          variant="contained"
          color="primary"
          sx={{ width: "-webkit-fit-content" }}
        >
          Update contacts
          {isSubmitting && (
            <span className="mr-4">
              <CircularProgress size="20px" />
            </span>
          )}
        </CustomButton>
      </Stack>
    </form>
  );
}
