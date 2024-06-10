"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MailForm,
  MailSchema,
  emailSchema,
} from "@/app/api/interfaces/mails/schema";
import { Regions } from "@/app/api/constants/Regions";
import { Spinner } from "flowbite-react";
import { createMail } from "@/app/api/interfaces/mails/mails.api";
import { PhoneInput } from "react-international-phone";
import { useEffect, useState } from "react";
import "react-international-phone/style.css";
import "./form.css";

export default function Form() {
  const {
    register,
    setError,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<MailForm>({
    resolver: zodResolver(MailSchema),
  });

  const [phone, setPhone] = useState("");

  useEffect(() => {
    setValue("phone", phone);
  }, [phone]);

  const onSubmit: SubmitHandler<MailForm> = async (data: MailForm) => {
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
          {/* <input
            id="telephone"
            className="input"
            placeholder="+48 22 1234567"
            // {...register("phone")}
          /> */}
          <PhoneInput
            defaultCountry="pl"
            value={phone}
            onChange={(phone) => setPhone(phone)}
            inputClassName="phone-input-custom"
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
