"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../../../lib/axios/axios-client";
import { useRouter } from "next/navigation";

type LoginFormData = {
  email: string;
  password: string;
};

type LoginResponse = {
  status: string;
  message: string;
  data: {
    user: Record<string, unknown>;
  };
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post<LoginResponse>(
        "/api/auth/login",
        data
      );

      return response.data;
    },

    onSuccess: (response) => {
      console.log("Login API success:", response);

      toast.success("Login successful!");

      // No localStorage. Next.js has already set HttpOnly cookies.
      router.replace("/admin/dashboard");
    },

    onError: (error) => {
      console.error("Login API failed:", error);

      toast.error("Login failed");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="mb-4 font-bold text-5xl text-primary">
          Welcome Admin
        </h1>

        <div className="border border-secondary rounded-xl p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center h-[400px] w-[400px]"
          >
            <h5 className="text-2xl font-semibold text-primary text-center mb-4">
              Login
            </h5>

            <div className="flex flex-col mb-5 w-full">
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                id="email"
                type="email"
                className="border border-secondary rounded-lg py-1 px-3 bg-white outline-none"
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                id="password"
                type="password"
                className="border border-secondary rounded-lg py-1 px-3 bg-white outline-none"
              />
            </div>

            <div className="mt-10">
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="bg-primary text-white cursor-pointer font-semibold px-8 py-2 rounded-xl disabled:opacity-50"
              >
                {loginMutation.isPending
                  ? "Logging in..."
                  : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}