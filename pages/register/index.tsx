import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/useUser";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type Types = {
  name: string;
  email: string;
  password: string;
};
export default function Register() {
  const { data } = useCurrentUser();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Types>();
  const onSubmit: SubmitHandler<Types> = async (data) => {
    try {
      await axios.post("api/register", data);

      await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
    } catch (e) {
      setMessage("Cet utilisateur existe déja");
    }
  };

  return (
    <main>
      <div className="shadow-md w-1/3  p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center mb-4 font-bold text-xl">
          S'inscrire à Store
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Votre nom"
            className="mb-5"
            {...register("name", {
              required: "Le nom  est requis",
            })}
          />
          {errors.name && (
            <p className="text-red-700 text-sm mb-2">{errors.name.message}</p>
          )}
          <Input
            type="email"
            placeholder="Email"
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
            })}
          />
          {errors.password && (
            <p className="text-red-700 text-sm mb-2">
              {errors.password.message}
            </p>
          )}
          <Button className="bg-black text-white">S'inscrire</Button>
        </form>
        {message && <p className="text-red-700 text-sm mb-2 mt-2">{message}</p>}
        <p className="mt-4">
          Vous avez un compte{" "}
          <Link href="/login" className="underline">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}
