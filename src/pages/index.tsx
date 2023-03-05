import Header from "@/components/Header";
import Link from "next/link";
import { lazy, Suspense } from "react";
const Shoe = lazy(() => import("@/components/Shoe"));

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen text-center">
        <section>
          <h1 className="text-4xl font-black">
            <span>MÀU SẮC GIÀY</span> <br />
            <span className="title">DO BẠN CHỌN</span>
          </h1>
          <Link
            href="/bat-dau"
            className="block w-fit mx-auto mt-7 border bg-black text-white rounded-2xl px-4 py-3 hover:bg-white hover:text-black hover:border hover:border-black duration-200 tracking-wider font-semibold"
          >
            BẮT ĐẦU
          </Link>
        </section>
      </div>
      <div className="absolute inset-0 -z-50">
        <Suspense fallback={null}>
          <Shoe colors={colorsShoe} colorsTest={colorsTest} />
        </Suspense>
      </div>
    </>
  );
}
const colorsShoe = {
  laces: "#fff",
  mesh: "#fff",
  caps: "#fff",
  inner: "#fff",
  sole: "#fff",
  stripes: "#fff",
  band: "#fff",
  patch: "#fff",
};
const colorsTest = {
  laces: "#fff",
  mesh: "#fff",
  caps: "#fff",
  inner: "#fff",
  sole: "#fff",
  stripes: "#fff",
  band: "#fff",
  patch: "#fff",
};
