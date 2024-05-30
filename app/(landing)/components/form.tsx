"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailForm, MailSchema } from "@/app/api/interfaces/mails/schema";
import { Regions } from "@/app/api/constants/Regions";
import { Spinner } from "flowbite-react";
import { createMail } from "@/app/api/interfaces/mails/mails.api";

export default function Form() {
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<MailForm>({
    resolver: zodResolver(MailSchema),
  });

  const onSubmit: SubmitHandler<MailForm> = async (data: MailForm) => {
    console.log(isValid);
    try {
      await createMail(data).then(() => {
        reset();
      });
    } catch (error) {
      setError("root", {
        type: "server",
        message: String(error),
      });
    }
  };

  return (
    <section className="py-16 flex-center flex-col">
      <h1 className="accent-font text-center mb-[40px]">Contact us</h1>
      <form className="flex gap-4 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="plain-font asterisk">
            Name
          </label>
          <input
            id="name"
            className="input"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red descriptor-font text-center mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="telephone" className="plain-font asterisk">
            Phone number
          </label>
          <input
            id="telephone"
            className="input"
            placeholder="+48 22 1234567"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red descriptor-font text-center mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="plain-font">
            Email
          </label>
          <input
            id="email"
            className="input"
            placeholder="example@mail.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red descriptor-font text-center mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="region" className="plain-font">
            Region
          </label>
          <select id="region" className="input" {...register("region")}>
            {Regions.map((region) => (
              <option key={region}>{region}</option>
            ))}
          </select>
          {errors.region && (
            <p className="text-red descriptor-font text-center mt-1">
              {errors.region.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="comment" className="plain-font">
            Your text
          </label>
          <textarea
            id="comment"
            className="input resize-none"
            placeholder="Any text that you would like to share"
            {...register("comment")}
          />
          {errors.comment && (
            <p className="text-red descriptor-font text-center mt-1">
              {errors.comment.message}
            </p>
          )}
          {errors.root && (
            <p className="text-red descriptor-font text-center mt-1">
              {errors.root.message}
            </p>
          )}
          {isSubmitSuccessful && (
            <p className="text-green-500 descriptor-font text-center mt-1">
              Your post was successful delivered
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="button w-fit self-center"
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? (
            <>
              <Spinner /> <span className="ml-2">Submitting</span>
            </>
          ) : (
            "Send me"
          )}
        </button>
      </form>
    </section>
  );
}
