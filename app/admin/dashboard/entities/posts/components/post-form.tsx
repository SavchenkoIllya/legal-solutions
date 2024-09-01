"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { useReducer, useEffect } from "react";
import {
  initialFormState,
  formReducer,
  FormActionsTypes,
} from "./utils/formReducer";
import { PostsForm, PostsSchema } from "@/app/api/interfaces/posts/schema";
import { createPost, updatePost } from "@/app/api/interfaces/posts/posts.api";
import { Post } from "@/app/api/interfaces/posts/types";
import { Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { CustomButton } from "@/app/admin/components/login";
import { green, red } from "@mui/material/colors";

type PostsFormViewProps = {
  postData?: Post | undefined;
  onSuccess?: (...args: any[]) => void;
};

export default function PostsFormView({ postData, onSuccess }: PostsFormViewProps) {
  const {
    register,
    setError,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<PostsForm>({
    resolver: zodResolver(PostsSchema),
    defaultValues: postData
      ? { ...postData }
      : {},
  });
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const onSubmit: SubmitHandler<PostsForm> = async (formData: PostsForm) => {
    try {
      if (postData?.id) {
        await updatePost(formData, postData.id);
      } else {
        await createPost(formData);
      }
      onSuccess?.();
      reset();
    } catch (error) {
      setError("root", {
        type: "server",
        message: String(error),
      });
    }
  };

  useEffect(() => {
    if (postData) {
      dispatch({
        type: FormActionsTypes.SET_INITIAL,
        payload: postData,
      });
    }
  }, []);

  useEffect(() => {
    setValue("description_ru", state.description_ru);
    setValue("description_ua", state.description_ua);
    setValue("description_en", state.description_en);
    setValue("description_pl", state.description_pl);
    setValue("seo_ru", state.seo_ru);
    setValue("seo_en", state.seo_en);
    setValue("seo_ua", state.seo_ua);
    setValue("seo_pl", state.seo_pl);
    setValue("is_published", state.is_published);
    setValue("is_published", state.is_published);
  }, [
    state.description_ru,
    state.description_en,
    state.description_ua,
    state.description_pl,
    state.seo_ru,
    state.seo_ua,
    state.seo_en,
    state.seo_pl,
    state.is_published,
  ]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight="bold">{postData?.id ? `Update post: ${postData.id} ${postData.title_ru}` : "Create post"}</Typography>
        <Divider />
        <TextField
          label="Title in russian"
          type="text"
          size="small"
          sx={{ width: "100%" }}
          placeholder="Title in russian"
          error={!!errors.title_ru}
          helperText={errors.title_ru?.message}
          id="title_ru"
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

        <FormControl fullWidth>
          <InputLabel id="category_select">Category</InputLabel>
          <Select
            labelId="category_select"
            id="category_select"
            defaultValue={"private"}
            label="Age"
            {...register("category")}
          >
            <MenuItem value={"private"}>Private</MenuItem>
            <MenuItem value={"business"}>Business</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Price range"
          type="text"
          size="small"
          sx={{ width: "100%" }}
          error={!!errors.price_range}
          helperText={errors.price_range?.message}
          id="price_range"
          placeholder="Type Price range here"
          {...register("price_range")}
        />


        <div data-color-mode="light">
          <Typography>Description ru</Typography>
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

        <div data-color-mode="light">
          <Typography>Description ua</Typography>
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

        <div data-color-mode="light">
          <Typography>Description en</Typography>
          <MDEditor
            id="description_en"
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

        <div data-color-mode="light">
          <Typography>Description pl</Typography>
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

        <div data-color-mode="light">
          <Typography>SEO ru</Typography>
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


        <div data-color-mode="light">
          <Typography>SEO ua</Typography>
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

        <div data-color-mode="light">
          <Typography>SEO en</Typography>
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

        <div data-color-mode="light">
          <Typography>SEO pl</Typography>
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

        <FormControlLabel
          label="Is published"
          control={
            <Checkbox
              checked={state.is_published}
              onChange={() =>
                dispatch({
                  type: FormActionsTypes.SET_IS_PUBLISHED,
                })
              }
            />
          }
        />
        {isSubmitSuccessful && (
          <Typography color={green[500]}>
            {postData?.id ? "Updated" : "Created"} successfully
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
          {postData?.id ? "Update" : "Create"}
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
