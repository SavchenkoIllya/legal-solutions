"use client";
import { SpinnerDiamond } from "spinners-react";
import { SubmitHandler, useForm } from "react-hook-form";
import PostsSelect from "./posts-selector";
import {
  GroupsForm as GroupsFormType,
  GroupsSchema,
} from "@/app/api/interfaces/groups/schema";
import { useEffect, useState } from "react";
import { Post } from "@/app/api/interfaces/posts/types";
import {
  createGroup,
  updateGroup,
} from "@/app/api/interfaces/groups/groups.api";
import { Groups } from "@/app/api/interfaces/groups/types";
import { zodResolver } from "@hookform/resolvers/zod";

type GroupsFormProps = { posts: Post[]; groupData?: Groups | undefined };

export default function GroupsForm({ posts, groupData }: GroupsFormProps) {
  const {
    register,
    setError,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<GroupsFormType>({
    resolver: zodResolver(GroupsSchema),
    defaultValues: groupData ? { ...groupData } : {},
  });

  const mapDefaultSelected = () =>
    posts.filter((item) => groupData?.posts_id.includes(item.id));

  const [selected, setIsSelected] = useState<Post[]>([]);

  useEffect(() => {
    if (groupData?.posts_id) setValue("posts_id", groupData?.posts_id);
    setIsSelected(mapDefaultSelected());
  }, []);

  useEffect(() => {
    const postsToId = selected.reduce((acc: number[], el: Post): number[] => {
      acc.push(el.id);
      return acc;
    }, []);
    setValue("posts_id", postsToId);
  }, [selected]);

  const onSubmit: SubmitHandler<GroupsFormType> = async (
    formData: GroupsFormType
  ) => {
    try {
      if (groupData?.id) {
        await updateGroup(formData, groupData.id);
      } else {
        await createGroup(formData);
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
    <>
      <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-zinc-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-200">
          Create New Group
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col sm:p-4 md:p-5"
      >
        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label
            htmlFor="title_ru"
            className="dashboard__label"
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
        {errors.title_ru && (
          <div className="flex justify-center mb-4">
            <p className="text-rose-500">{errors.title_ru.message}</p>
          </div>
        )}
        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label
            htmlFor="title_ua"
            className="dashboard__label"
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

        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label
            htmlFor="title_pl"
            className="dashboard__label"
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

        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label
            htmlFor="title_en"
            className="dashboard__label"
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
        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label
            htmlFor="category"
            className="dashboard__label"
          >
            Choose category
          </label>
          <select
            id="category"
            className="capitalize dashboard__input"
            {...register("category")}
          >
            <option>private</option>
            <option>business</option>
          </select>
        </div>

        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label
            htmlFor="description_ru"
            className="dashboard__label"
          >
            Description ru
          </label>
          <textarea
            id="description_ru"
            className="dashboard__input"
            placeholder="Type title here"
            {...register("description_ru")}
          />
        </div>

        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label
            htmlFor="description_ua"
            className="dashboard__label"
          >
            Description ua
          </label>
          <textarea
            id="description_ua"
            className="dashboard__input"
            placeholder="Type title here"
            {...register("description_ua")}
          />
        </div>

        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label
            htmlFor="description_pl"
            className="dashboard__label"
          >
            Description pl
          </label>
          <textarea
            id="description_pl"
            className="dashboard__input"
            placeholder="Type title here"
            {...register("description_pl")}
          />
        </div>

        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label
            htmlFor="description_en"
            className="dashboard__label"
          >
            Description en
          </label>
          <textarea
            id="description_en"
            className="dashboard__input"
            placeholder="Type title here"
            {...register("description_en")}
          />
        </div>

        <div className="grid gap-1 mb-1 sm:gap-4 sm:mb-4 sm:grid-cols-2">
          <label
            htmlFor="price_range"
            className="dashboard__label"
          >
            Price range
          </label>
          <input
            type="text"
            id="price_range"
            className="dashboard__input"
            placeholder="Type title here"
            pattern="[0-9+\-*/.]*"
            {...register("price_range")}
          />
        </div>

        <PostsSelect
          selected={selected}
          setIsSelected={setIsSelected}
          posts={posts}
        />

        <div className="flex justify-center mb-4">
          {isSubmitSuccessful && (
            <p className="text-green-500">Created successfully</p>
          )}
          {errors.title_ru && (
            <p className="text-rose-500">{errors.title_ru.message}</p>
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
              <SpinnerDiamond color="white" />
            </span>
          )}
          {groupData?.id ? "Update" : "Create"} group
        </button>
      </form>
    </>
  );
}
