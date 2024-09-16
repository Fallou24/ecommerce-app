import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProductsStore } from "@/stores/productsStore";
import { Menu, Search } from "lucide-react";
import { useState } from "react";

export function MobileMenu() {
  const selectCategory = useProductsStore((state) => state.selectedACategory);
  const [open,setOpen] = useState(false)
  const setSearchTerm = useProductsStore((state) => state.setSearchTerm);
  const categories = [
    "All",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="lg:hidden cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <form className="border mt-8  border-gray-300 flex flex-row items-center px-2 rounded-md">
          <input
            type="search"
            placeholder="Search ..."
            className="text-sm py-2 grow"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={20} color="#979797" />
        </form>
        <div className="flex flex-col gap-4 mt-6">
          {categories?.map((category: string, index: any) => (
            <button
              key={index}
              className=""
              
              onClick={() => {
                selectCategory(category === "All" ? "" : category);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
