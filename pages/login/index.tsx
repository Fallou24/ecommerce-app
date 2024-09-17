import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Types = {
  email: string;
  password: string;
};

export default function Login() {
  const {data} = useCurrentUser()
  const router = useRouter()
  if (data) {
    router.push("/")
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Types>();

  const onSubmit: SubmitHandler<Types> = async (data) => {
    await signIn("credentials", data);
  };

  return (
    <main className="mx-4">
      <div className="shadow-md w-full md:w-1/3  p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center mb-4 font-bold text-xl">
          Se connecter à Store
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Nom d'utilisateur"
            className="mb-5"
            {...register("email", {
              required: "L'email est requis",
            })}
          />
          {errors.email && (
            <p className="text-red-700 text-sm mb-2">{errors.email.message}</p>
          )}

          <Input
            type="password"
            placeholder="Mot de passe"
            className="mb-5"
            {...register("password", {
              required: "Le mot de passe est requis",
              minLength: {
                value: 4,
                message: "Min length is 4",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-700 text-sm mb-2">
              {errors.password.message}
            </p>
          )}
          <Button className="bg-black text-white">Se connecter</Button>
        </form>
        <p className="mt-4">
          Vous n'avez pas de compte{" "}
          <Link href="/register" className="underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </main>
  );
}
