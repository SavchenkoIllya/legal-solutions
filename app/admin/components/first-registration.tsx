"use client";
import { useRouter } from "next/navigation";
import Register from "./register/register";
import { signIn } from "next-auth/react";
import { UserFormData } from "@/app/api/interfaces/users/types";

export default function FirstRegistration() {
  const router = useRouter();
  const delayBeforeRedirect = 3000;

  const login = async (email: string, password: string) => {
    await signIn("credentials", {
      email,
      password,
    });
  };

  const handleOnSuccess = (data: UserFormData) => {
    login(data.email, data.password).then(() => {
      setTimeout(() => {
        router.replace("/admin/dashboard");
      }, delayBeforeRedirect);
    });
  };

  return (
    <>
      <div className="relative bg-white  rounded-lg shadow dark:bg-gray-700">
        <div className="relative p-4 w-full my-8 max-w-md">
          <Register
            onSuccess={handleOnSuccess}
            customSuccessText={`You would be redirected in 3 sec`}
          />
        </div>
      </div>
    </>
  );
}
