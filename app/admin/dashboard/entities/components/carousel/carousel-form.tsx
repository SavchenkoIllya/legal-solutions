"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "flowbite-react";

import {
  CarouselForm,
  CarouselSchema,
} from "@/app/api/interfaces/carousel/schema";
import { Carousel } from "@/app/api/interfaces/carousel/types";
import {
  createCarousel,
  updateCarousel
} from "@/app/api/interfaces/carousel/carousel.api";

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
        // do update
        await updateCarousel(data, carouselData.id);
        console.log("updated");
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
      className="sm:p-4 flex flex-col md:p-5"
    >
      <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
        <label
          htmlFor="dev_name"
          className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white asterisk"
        >
          Name for dashboard
        </label>
        <input
          type="text"
          id="dev_name"
          className="dashboard__input"
          placeholder="Example name"
          {...register("dev_name")}
        />
      </div>
      <div className="flex justify-center mb-4">
        {errors.dev_name && (
          <p className="text-rose-500">{errors.dev_name.message}</p>
        )}
      </div>
      <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
        <label
          htmlFor="image_src"
          className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white asterisk"
        >
          Image source
        </label>
        <input
          type="text"
          id="image_src"
          className="dashboard__input"
          placeholder="Past path here"
          {...register("image_src")}
        />
      </div>
      <div className="flex justify-center mb-4">
        {errors.image_src && (
          <p className="text-rose-500">{errors.image_src.message}</p>
        )}
      </div>
      <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
        <label
          htmlFor="title_ru"
          className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
        >
          Title ru
        </label>
        <input
          type="text"
          id="title_ru"
          className="dashboard__input"
          placeholder="Type title here"
          {...register("title_ru")}
        />
      </div>
      <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
        <label
          htmlFor="title_ua"
          className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
        >
          Title ua
        </label>
        <input
          type="text"
          id="title_ua"
          className="dashboard__input"
          placeholder="Type title here"
          {...register("title_ua")}
        />
      </div>
      <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
        <label
          htmlFor="title_pl"
          className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
        >
          Title pl
        </label>
        <input
          type="text"
          id="title_pl"
          className="dashboard__input"
          placeholder="Type title here"
          {...register("title_pl")}
        />
      </div>
      <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
        <label
          htmlFor="title_en"
          className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
        >
          Title en
        </label>
        <input
          type="text"
          id="title_en"
          className="dashboard__input"
          placeholder="Type title here"
          {...register("title_en")}
        />
      </div>

      <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
        <label
          htmlFor="description_ru"
          className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
        >
          Description ru
        </label>
        <input
          type="text"
          id="description_ru"
          className="dashboard__input"
          placeholder="Type description here"
          {...register("description_ru")}
        />
      </div>
      <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
        <label
          htmlFor="description_ua"
          className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
        >
          Description ua
        </label>
        <input
          type="text"
          id="description_ua"
          className="dashboard__input"
          placeholder="Type description here"
          {...register("description_ua")}
        />
      </div>

      <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
        <label
          htmlFor="description_pl"
          className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
        >
          Description pl
        </label>
        <input
          type="text"
          id="description_pl"
          className="dashboard__input"
          placeholder="Type description here"
          {...register("description_pl")}
        />
      </div>

      <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
        <label
          htmlFor="description_en"
          className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
        >
          Description en
        </label>
        <input
          type="text"
          id="description_en"
          className="dashboard__input"
          placeholder="Type description here"
          {...register("description_en")}
        />
      </div>

      <div className="flex justify-center mb-4">
        {isSubmitSuccessful && (
          <p className="text-green-500">Created successfully</p>
        )}
        {errors.root && <p className="text-rose-500">{errors.root.message}</p>}
      </div>
      <button
        type="submit"
        className="self-center dashboard__button"
        disabled={!isValid}
      >
        {isSubmitting && (
          <span className="mr-4">
            <Spinner />
          </span>
        )}
        Create
      </button>
    </form>
  );
}
