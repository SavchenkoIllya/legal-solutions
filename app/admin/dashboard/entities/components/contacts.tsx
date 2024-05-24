"use client";
import { Contacts as ContactsType } from "@/app/api/interfaces/contacts.ts/types";
import { Accordion, Spinner } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactsSchema } from "@/app/api/interfaces/contacts.ts/schema";

type ContactsProps = { contacts: ContactsType[] };

export default function Contacts({ contacts }: ContactsProps) {
  //   const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
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

  //   const handleNew = (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     var entityName = "Users";
  //     router.push(`/admin/dashboard/entities/new/${entityName}`, {
  //       scroll: false,
  //     });
  //   };

  const onSubmit: SubmitHandler<ContactsType> = async (data: any) => {
    try {
    } catch (error) {
      setError("root", {
        type: "server",
        message: String(error),
      });
    }
  };

  return (
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title>
          <div className="flex justify-between">
            <div className="flex gap-4 mr-4">
              {/* <button onClick={handleNew}>
                <HiOutlinePlusCircle />
              </button> */}

              {/* TODO:
                    -at this moment ability to remove or edit tables is unavailable */}
            </div>
            <h1>Contacts</h1>
          </div>
        </Accordion.Title>
        <Accordion.Content>
          <form
            // onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="p-4 flex flex-col md:p-5"
          >
            {/* TODO: Recreate this mechanism */}
            {contacts.map((contact) => {
              return (
                <>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      {...register("email")}
                    />
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <label
                      htmlFor="telephone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Telephone
                    </label>
                    <input
                      type="text"
                      id="telephone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      {...register("telephone")}
                    />
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <label
                      htmlFor="work_hours"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Work hours
                    </label>
                    <input
                      type="text"
                      id="work_hours"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      {...register("work_hours")}
                    />
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <label
                      htmlFor="telegram"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Telegram
                    </label>
                    <input
                      type="text"
                      id="telegram"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      {...register("telegram")}
                    />
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <label
                      htmlFor="instagram"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Instagram
                    </label>
                    <input
                      type="text"
                      id="telegram"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      {...register("instagram")}
                    />
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <label
                      htmlFor="whatsapp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Whatsapp
                    </label>
                    <input
                      type="text"
                      id="whatsapp"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      {...register("whatsapp")}
                    />
                  </div>
                  <div className="col-span-2">
                    {errors.root && (
                      <p role="alert" className="text-rose-500 text-center">
                        {errors.root.message}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="self-center dashboard__button"
                    >
                      {isSubmitting && (
                        <span className="mr-4">
                          <Spinner />
                        </span>
                      )}
                      Update contacts
                    </button>
                  </div>
                </>
              );
            })}
          </form>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}

// <form
// onSubmit={handleSubmit(onSubmit)}
// noValidate
// className="p-4 flex flex-col md:p-5"
// >
// <div className="grid gap-4 mb-4 grid-cols-2">
//   <div className="col-span-2">
// <label
//   htmlFor="name"
//   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
// >
//   Name
// </label>
// <input
//   type="text"
//   id="name"
//   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//   placeholder="Type product name"
//   {...register("name")}
// />
//     {errors.name && (
//       <p role="alert" className="text-rose-500 text-center">
//         {errors.name?.message}
//       </p>
//     )}
//   </div>
//   <div className="col-span-2">
//     <label
//       htmlFor="name"
//       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//     >
//       Email
//     </label>
//     <input
//       type="email"
//       id="email"
//       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//       placeholder="Type product name"
//       {...register("email")}
//     />
//     {errors.email && (
//       <p role="alert" className="text-rose-500 text-center">
//         {errors.email?.message}
//       </p>
//     )}
//   </div>
//   <div className="col-span-2">
//     <label
//       htmlFor="name"
//       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//     >
//       Password
//     </label>
//     <input
//       type="password"
//       id="password"
//       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//       placeholder="Type product name"
//       {...register("password")}
//     />
//     {errors.password && (
//       <p role="alert" className="text-rose-500 text-center">
//         {errors.password?.message}
//       </p>
//     )}
//   </div>
//   <div className="col-span-2">
//     <label
//       htmlFor="name"
//       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//     >
//       Confirm Password
//     </label>
//     <input
//       ref={confirmPasswordRef}
//       onChange={checkPassword}
//       onSubmitCapture={checkPassword}
//       type="password"
//       name="confirm-password"
//       id="confirm-password"
//       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//       placeholder="Type product name"
//       required
//     />
//   </div>
//   <div className="col-span-2">
//     {errors.root && (
//       <p role="alert" className="text-rose-500 text-center">
//         {errors.root.message}
//       </p>
//     )}
//     {isSubmitSuccessful && (
//       <>
//         <p role="success" className="text-green-500 text-center">
//           User have been successfully created
//         </p>
//         <p role="success" className="text-green-500 text-center">
//           {customSuccessText}
//         </p>
//       </>
//     )}
//   </div>
// </div>
// <button type="submit" className="self-center dashboard__button">
//   {isSubmitting && (
//     <span className="mr-4">
//       <Spinner />
//     </span>
//   )}
//   Create dashboard user
// </button>
// </form>
