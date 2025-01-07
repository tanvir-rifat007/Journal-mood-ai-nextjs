import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  const href = userId ? "/journal" : "/new-user";

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-950 ">
      <div className="grid gap-6">
        <h1 className="text-slate-50 text-4xl">
          The best journal app, period.
        </h1>
        <p className="text-slate-200/90 text-xl">
          This is the best journal app you will ever use. It is simple, easy to
          use and has all the features you need.
        </p>

        <Link href={href}>
          <button
            className="bg-slate-100 px-4 py-2 rounded hover:bg-slate-200
        text-slate-950 font-semibold transition-colors duration-300 ease-in-out w-fit
        "
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
