"use client";
import { Contacts as ContactsType } from "@/app/api/interfaces/contacts/types";
import { Spinner } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactsForm,
  ContactsSchema,
} from "@/app/api/interfaces/contacts/schema";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { updateContacts } from "@/app/api/interfaces/contacts/contacts.api";

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

  const onSubmit: SubmitHandler<ContactsType> = async (
    data: Partial<ContactsForm>
  ) => {
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
    <Disclosure as="div" className="space-y-0">
      <DisclosureButton className="px-2 py-4 text-white bg-blue-500 w-full text-left rounded-lg data-[open]:rounded-b-none">
        Contacts
      </DisclosureButton>
      <DisclosurePanel className="px-2 py-4 text-zinc-500 border border-zinc-300 border-t-0 rounded-b-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="sm:p-4 flex flex-col md:p-5"
        >
          <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
            >
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
          <div className="flex justify-center mb-4">
            {errors.email && (
              <p className="text-rose-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
            <label
              htmlFor="telephone"
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
            >
              Telephone
            </label>
            <input
              type="text"
              id="telephone"
              className="dashboard__input"
              placeholder="Type product name"
              {...register("telephone")}
            />
          </div>
          <div className="flex justify-center mb-4">
            {errors.telephone && (
              <p className="text-rose-500">{errors.telephone.message}</p>
            )}
          </div>
          <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
            <label
              htmlFor="work_hours"
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
            >
              Work hours
            </label>
            <input
              type="text"
              id="work_hours"
              className="dashboard__input"
              placeholder="Type product name"
              {...register("work_hours")}
            />
          </div>
          <div className="flex justify-center mb-4">
            {errors.work_hours && (
              <p className="text-rose-500">{errors.work_hours.message}</p>
            )}
          </div>
          <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
            <label
              htmlFor="telegram"
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
            >
              Telegram
            </label>
            <input
              type="text"
              id="telegram"
              className="dashboard__input"
              placeholder="Type product name"
              {...register("telegram")}
            />
          </div>
          <div className="flex justify-center mb-4">
            {errors.telegram && (
              <p className="text-rose-500">{errors.telegram.message}</p>
            )}
          </div>
          <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
            <label
              htmlFor="instagram"
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
            >
              Instagram
            </label>
            <input
              type="text"
              id="telegram"
              className="dashboard__input"
              placeholder="Type product name"
              {...register("instagram")}
            />
          </div>
          <div className="flex justify-center mb-4">
            {errors.instagram && (
              <p className="text-rose-500">{errors.instagram.message}</p>
            )}
          </div>

          <div className="grid gap-1 sm:gap-4 mb-1 sm:mb-4 sm:grid-cols-2">
            <label
              htmlFor="whatsapp"
              className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
            >
              Whatsapp
            </label>
            <input
              type="text"
              id="whatsapp"
              className="dashboard__input"
              placeholder="Type product name"
              {...register("whatsapp")}
            />
          </div>
          <div className="flex justify-center mb-4">
            {errors.whatsapp && (
              <p className="text-rose-500">{errors.whatsapp.message}</p>
            )}
          </div>
          <div className="flex justify-center mb-4">
            {isSubmitSuccessful && (
              <p className="text-green-500">Updated successfully</p>
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
            Update contacts
          </button>
        </form>
      </DisclosurePanel>
    </Disclosure>
  );
}
