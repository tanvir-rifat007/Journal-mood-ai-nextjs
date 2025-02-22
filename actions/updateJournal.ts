"use server";
import { prisma } from "@/db/db";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { indexJournalEntry } from "@/utils/ingest";
import { revalidateTag } from "next/cache";

export const updateJournal = async (JournalId: string, content: string) => {
  const user = await getUserByClerkId();
  if (!user) {
    return;
  }

  const updatedJournalEntry = await prisma.journalEntry.update({
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

  const analysis = await analyze(updatedJournalEntry.content);

  // then update the journal entry with the analysis

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedJournalEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updatedJournalEntry.id,
      ...analysis,
    },
    update: analysis,
  });

  await indexJournalEntry(updatedJournalEntry);

  revalidateTag(`journal-${JournalId}`);
  revalidateTag("journal");
};
