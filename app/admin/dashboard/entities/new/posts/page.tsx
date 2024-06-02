"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "flowbite-react";
import MDEditor from "@uiw/react-md-editor";
import { useReducer, useEffect } from "react";
import {
  initialFormState,
  formReducer,
  FormActionsTypes,
} from "./utils/formReducer";
import { Checkbox } from "@headlessui/react";
import { PostsForm, PostsSchema } from "@/app/api/interfaces/posts/schema";

// type PostsFormViewProps = {
//   carouselData?: Posts | undefined;
// };

export default function NewPostView() {
  const {
    register,
    setError,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<PostsForm>({ resolver: zodResolver(PostsSchema) });
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const onSubmit: SubmitHandler<PostsForm> = async () => {
    try {
      reset();
    } catch (error) {
      setError("root", {
        type: "server",
        message: String(error),
      });
    }
  };

  useEffect(() => {
    setValue("description_ru", state.description_ru);
    setValue("description_ua", state.description_ua);
    setValue("description_en", state.description_en);
    setValue("description_pl", state.description_pl);
    setValue("seo_ru", state.seo_ru);
    setValue("seo_en", state.seo_en);
    setValue("seo_ua", state.seo_ua);
    setValue("seo_pl", state.seo_pl);
  }, [
    state.description_ru,
    state.description_en,
    state.description_ua,
    state.description_pl,
    state.seo_ru,
    state.seo_ua,
    state.seo_en,
    state.seo_pl,
  ]);

  const handleRuDescriptor = (text: string | undefined) => {};

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="sm:p-4 flex flex-col md:p-5"
      >
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

        <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4">
          <div data-color-mode="light">
            <label
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="description_ru"
            >
              Description ru
            </label>
            <MDEditor
              id="description_ru"
              value={state.description_ru}
              visibleDragbar={false}
              onChange={(value) => {
                dispatch({
                  type: FormActionsTypes.SET_DESCRIPTION_RU,
                  payload: value,
                });
              }}
            />
          </div>
        </div>

        <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4">
          <div data-color-mode="light">
            <label
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="description_ua"
            >
              Description ua
            </label>
            <MDEditor
              id="description_ua"
              value={state.description_ua}
              visibleDragbar={false}
              onChange={(value) => {
                dispatch({
                  type: FormActionsTypes.SET_DESCRIPTION_UA,
                  payload: value,
                });
              }}
            />
          </div>
        </div>

        <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4">
          <div data-color-mode="light">
            <label
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="description_en"
            >
              Description en
            </label>
            <MDEditor
              id="description_ru"
              value={state.description_en}
              visibleDragbar={false}
              onChange={(value) => {
                dispatch({
                  type: FormActionsTypes.SET_DESCRIPTION_EN,
                  payload: value,
                });
              }}
            />
          </div>
        </div>

        <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4">
          <div data-color-mode="light">
            <label
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="description_ru"
            >
              Description ru
            </label>
            <MDEditor
              id="description_pl"
              value={state.description_pl}
              visibleDragbar={false}
              onChange={(value) => {
                dispatch({
                  type: FormActionsTypes.SET_DESCRIPTION_PL,
                  payload: value,
                });
              }}
            />
          </div>
        </div>

        <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4">
          <div data-color-mode="light">
            <label
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="seo_ru"
            >
              SEO text ru
            </label>
            <MDEditor
              id="seo_ru"
              value={state.seo_ru}
              visibleDragbar={false}
              onChange={(value) => {
                dispatch({
                  type: FormActionsTypes.SET_SEO_RU,
                  payload: value,
                });
              }}
            />
          </div>
        </div>

        <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4">
          <div data-color-mode="light">
            <label
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="seo_ua"
            >
              SEO text ua
            </label>
            <MDEditor
              id="seo_ua"
              value={state.seo_ua}
              visibleDragbar={false}
              onChange={(value) => {
                dispatch({
                  type: FormActionsTypes.SET_SEO_UA,
                  payload: value,
                });
              }}
            />
          </div>
        </div>

        <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4">
          <div data-color-mode="light">
            <label
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="seo-en"
            >
              SEO text en
            </label>
            <MDEditor
              id="seo_en"
              value={state.seo_en}
              visibleDragbar={false}
              onChange={(value) => {
                dispatch({
                  type: FormActionsTypes.SET_SEO_EN,
                  payload: value,
                });
              }}
            />
          </div>
        </div>

        <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4">
          <div data-color-mode="light">
            <label
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="seo_pl"
            >
              SEO text pl
            </label>
            <MDEditor
              id="description_pl"
              value={state.seo_pl}
              visibleDragbar={false}
              onChange={(value) => {
                dispatch({
                  type: FormActionsTypes.SET_SEO_PL,
                  payload: value,
                });
              }}
            />
          </div>
        </div>

        <div>
          <div data-color-mode="light" className="flex gap-2 mb-1">
            <label
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              htmlFor="description_ru"
            >
              Is published
            </label>
            <Checkbox
              checked={state.is_published}
              onChange={() =>
                dispatch({
                  type: FormActionsTypes.SET_IS_PUBLISHED,
                })
              }
              className="group block w-4 h-4 rounded border bg-white data-[checked]:bg-blue-500"
            >
              <svg
                className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          {isSubmitSuccessful && (
            <p className="text-green-500">Created successfully</p>
          )}
          {errors.root && (
            <p className="text-rose-500">{errors.root.message}</p>
          )}
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
    </>
  );
}
