"use client";

import { queryJournals } from "@/utils/queryIngest";
import { useUser } from "@clerk/nextjs";
import React, { useState, useTransition } from "react";

const Question = () => {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const { user } = useUser();

  console.log(user);

  return (
    <div className="mt-10 mb-10 container mx-auto">
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Summary of your journal entry..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      <button
        className="btn mt-5"
        onClick={() => {
          startTransition(async () => {
            const res = await queryJournals(query, user.id, {
              userId: user.id,
            });
            console.log(res);
            setResult(res);
          });
        }}
        disabled={isPending}
      >
        {isPending ? "Searching..." : "Search"}
      </button>
      {result && (
        <div className="mt-5">
          <h3 className="text-lg font-bold">Results</h3>
          <div className="mt-2">{result}</div>
        </div>
      )}
    </div>
  );
};

export default Question;
