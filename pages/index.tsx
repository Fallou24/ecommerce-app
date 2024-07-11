import ProductList from "@/components/home/ProductList";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="max-w-screen-2xl p-4">
    
    <ProductList />
    </main>
  );
}
