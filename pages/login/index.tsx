import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <main>
      <div className="shadow-md w-1/3  p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center mb-4 font-bold text-xl">
          Se connecter à Store
        </h1>
        <form>
          <Input type="email" placeholder="Email" className="mb-5" />
          <Input type="password" placeholder="Mot de passe" className="mb-5" />
          <Button className="bg-black text-white">Login</Button>
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
