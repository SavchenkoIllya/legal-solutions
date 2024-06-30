"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MailForm,
  MailSchema,
  emailSchema,
} from "@/app/api/interfaces/mails/schema";
import { SpinnerDiamond } from "spinners-react";
import { createMail } from "@/app/api/interfaces/mails/mails.api";
import { PhoneInput } from "react-international-phone";
import { cn } from "@/app/utils/cn";
import "react-international-phone/style.css";
import "./form.css";
import CustomSelect from "./select";

export default function Form() {
  const {
    register,
    setError,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<MailForm>({
    resolver: zodResolver(MailSchema),
  });

  const handleTelephone = (phone: string) =>
    setValue("phone", phone, { shouldValidate: true });

  const handleRegion = (value: string) => setValue("region", value)

  const onSubmit: SubmitHandler<MailForm> = async (data: MailForm) => {
    const expirationTimeStr = localStorage.getItem("expirationTime");

    /* Logic for prevention extra sends */

    if (expirationTimeStr) {
      const expirationTime = JSON.parse(expirationTimeStr);
      const currentTime = new Date();
      if (currentTime < expirationTime) {
        setError("root", {
          type: "disabled",
          message: String("You cannot send us emails so often"),
        });
        return 0;
      }
    }

    if (data.email) {
      try {
        emailSchema.parse(data.email);
      } catch (error) {
        setError("email", {
          type: "pattern",
          message: String("That's not valid email"),
        });
        return 0;
      }
    }

    try {
      await createMail(data).then((_) => {
        localStorage.setItem(
          "expirationTime",
          JSON.stringify(Date.now() + 3 * 60 * 1000)
        );
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
    <section className="py-16 flex-center flex-col" id="form">
      <h1 className="accent-font text-center mb-[40px]">Contact us</h1>
      <form className="flex gap-4 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="plain-font asterisk">
            Name
          </label>
          <input
            id="name"
            className={cn("input", errors.name ? "border-red" : "")}
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
          <PhoneInput
            defaultCountry="pl"
            value={getValues("phone")}
            onChange={handleTelephone}
            inputClassName={
              errors.phone
                ? "phone-input-custom phone-input-error"
                : "phone-input-custom"
            }
            countrySelectorStyleProps={{ className: "custom" }}
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
            className={cn("input", errors.email ? "border-red" : "")}
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
          <CustomSelect callback={handleRegion} />
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
          className="button disabled:bg-dark w-fit self-center"
        >
          {isSubmitting ? (
            <>
              <SpinnerDiamond className="w-6 h-6" color="white" />
              <span className="ml-2">Submitting</span>
            </>
          ) : (
            "Send me"
          )}
        </button>
      </form>
    </section>
  );
}
