"use server";
import { prisma } from "@/db/db";
import { getUserByClerkId } from "@/utils/auth";
import { revalidateTag } from "next/cache";

export const updateJournal = async (JournalId: string, content: string) => {
  const user = await getUserByClerkId();
  if (!user) {
    return;
  }

  await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: JournalId,
      },
    },
    data: {
      content: content,
    },
  });

  revalidateTag(`journal-${JournalId}`);
};
