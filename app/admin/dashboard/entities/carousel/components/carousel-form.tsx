"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerDiamond } from "spinners-react";

import {
  CarouselForm,
  CarouselSchema,
} from "@/app/api/interfaces/carousel/schema";
import { Carousel } from "@/app/api/interfaces/carousel/types";
import {
  createCarousel,
  updateCarousel,
} from "@/app/api/interfaces/carousel/carousel.api";
import { CircularProgress, Divider, Stack, TextField, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { CustomButton } from "@/app/admin/components/login";

type CarouselFormViewProps = {
  carouselData?: Carousel | undefined;
};

export default function CarouselFormView({
  carouselData,
}: CarouselFormViewProps) {
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<CarouselForm>({
    resolver: zodResolver(CarouselSchema),
    defaultValues: {
      dev_name: carouselData?.dev_name || "",
      image_src: carouselData?.image_src || "",
      title_ru: carouselData?.title_ru || "",
      title_en: carouselData?.title_en || "",
      title_pl: carouselData?.title_pl || "",
      title_ua: carouselData?.title_ua || "",
      description_ru: carouselData?.description_ru || "",
      description_en: carouselData?.description_en || "",
      description_pl: carouselData?.description_pl || "",
      description_ua: carouselData?.description_ua || "",
    },
  });

  const onSubmit: SubmitHandler<Omit<Carousel, "id">> = async (
    data: CarouselForm
  ) => {
    try {
      if (carouselData?.id) {
        await updateCarousel(data, carouselData.id);
      } else {
        await createCarousel(data);
      }
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
        <Typography variant="h5" fontWeight="bold">{carouselData?.id ? `Update carousel: ${carouselData.id} ${carouselData.title_ru}` : "Create carousel"}</Typography>
        <Divider />

        <TextField
          label="Name for dashboard"
          type="text"
          size="small"
          sx={{ width: "100%" }}
          placeholder="Name for dashboard"
          error={!!errors.dev_name}
          helperText={errors.dev_name?.message}
          id="dev_name"
          required
          {...register("dev_name")}
        />

        <TextField
          label="Image source"
          type="text"
          size="small"
          sx={{ width: "100%" }}
          placeholder="Image source"
          error={!!errors.image_src}
          helperText={errors.image_src?.message}
          id="image_src"
          required
          {...register("image_src")}
        />

        <TextField
          label="Title in russian"
          type="text"
          size="small"
          sx={{ width: "100%" }}
          placeholder="Title in russian"
          error={!!errors.title_ru}
          helperText={errors.title_ru?.message}
          id="title_ru"
          required
          {...register("title_ru")}
        />
        <TextField
          label="Title in ukrainian"
          type="text"
          size="small"
          sx={{ width: "100%" }}
          placeholder="Title in ukrainian"
          error={!!errors.title_ua}
          helperText={errors.title_ua?.message}
          id="title_ua"
          {...register("title_ua")}
        />
        <TextField
          label="Title in polish"
          type="text"
          size="small"
          sx={{ width: "100%" }}
          placeholder="Title in polish"
          error={!!errors.title_pl}
          helperText={errors.title_pl?.message}
          id="title_pl"
          required
          {...register("title_pl")}
        />
        <TextField
          label="Title in english"
          type="text"
          size="small"
          sx={{ width: "100%" }}
          placeholder="Title in english"
          error={!!errors.title_en}
          helperText={errors.title_en?.message}
          id="title_en"
          {...register("title_en")}
        />
        <TextField
          label="Description in russian"
          type="text"
          size="small"
          sx={{ width: "100%" }}
          placeholder="Description in russian"
          error={!!errors.description_ru}
          helperText={errors.description_ru?.message}
          id="description_ru"
          {...register("description_ru")}
        />
        <TextField
          label="Description in ukrainian"
          type="text"
          size="small"
          sx={{ width: "100%" }}
          placeholder="Description in ukrainian"
          error={!!errors.description_ua}
          helperText={errors.description_ua?.message}
          id="description_ua"
          {...register("description_ua")}
        />
        <TextField
          label="Description in polish"
          type="text"
          size="small"
          sx={{ width: "100%" }}
          placeholder="Description in polish"
          error={!!errors.description_pl}
          helperText={errors.description_pl?.message}
          id="description_pl"
          {...register("description_pl")}
        />
        <TextField
          label="Description in english"
          type="text"
          size="small"
          sx={{ width: "100%" }}
          placeholder="Description in english"
          error={!!errors.description_en}
          helperText={errors.description_en?.message}
          id="description_en"
          {...register("description_en")}
        />
        
        {isSubmitSuccessful && (
          <Typography color={green[500]}>
            {carouselData?.id ? "Updated" : "Created"} successfully
          </Typography>
        )}
        {errors.root && <Typography color={red[500]}>{errors.root.message}</Typography>}

        <CustomButton
          type="submit"
          disabled={!isValid}
          variant="contained"
          color="primary"
          sx={{ width: "-webkit-fit-content" }}
        >
          {carouselData?.id ? "Update" : "Create"}
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
