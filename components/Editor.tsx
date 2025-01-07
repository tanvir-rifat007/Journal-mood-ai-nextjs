"use client";

import { updateJournal } from "@/actions/updateJournal";
import { useState, useTransition } from "react";
import { useAutosave } from "react-autosave";

type JournalProps = {
  journal: {
    content: string;
    id: string;
  };
};

const Editor = ({ journal }: JournalProps) => {
  const [content, setContent] = useState(journal.content);
  const [isPending, startTransition] = useTransition();

  useAutosave({
    data: content,
    onSave: async (_content) => {
      startTransition(async () => {
        await updateJournal(journal.id, _content);
      });
    },
  });

  return (
    <div
      className="
      h-full
    "
    >
      {isPending && (
        <span className="loading loading-ring loading-xs text-center flex items-center justify-center"></span>
      )}

      <textarea
        className="textarea textarea-bordered w-full h-96"
        placeholder="Bio"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Editor;
