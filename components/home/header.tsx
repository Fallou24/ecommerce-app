import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="max-w-screen-xl mx-auto flex flex-row justify-between items-center bg-white p-4 sticky top-0 z-20">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-bold text-2xl">
          Store
        </Link>
        <button>All</button>
        <button>Acessoires</button>
      </div>
      <div className="flex items-center gap-8">
        <form className="border  border-gray-300 flex flex-row items-center p-2 rounded-md">
          <input
            type="search"
            placeholder="Rechechez des produits"
            className="text-sm w-64"
          />
          <Search size={20} color="#979797" />
        </form>
        <Link href="/login">
          <User />
        </Link>
        <Link href="/cart">
          <ShoppingBag />
        </Link>
      </div>
    </header>
  );
}
