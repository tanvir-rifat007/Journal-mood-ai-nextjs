"use client";

import { createNewEntry } from "@/actions/createJournal";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const NewEntry = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <>
      <button
        className="btn btn-primary fixed bottom-4 right-4 z-10 tooltip"
        data-tip="New Entry"
        onClick={() => {
          startTransition(async () => {
            const entry = await createNewEntry();
            if (entry) {
              router.push(`/journal/${entry.id}`);
            }
          });
        }}
      >
        <PlusCircle size={24} />
      </button>

      {isPending && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 flex justify-center items-center">
          <div className="spinner" />
        </div>
      )}
    </>
  );
};

export default NewEntry;
