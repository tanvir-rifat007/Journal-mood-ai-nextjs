import { prisma } from "@/db/db";
import { memoize } from "nextjs-better-unstable-cache";
import { indexJournalEntry } from "./ingest";

export const getAllJournalEntries = memoize(
  async (userId: string) => {
    const journals = await prisma.journalEntry.findMany({
      where: {
        userId,
      },
    });

    // then move this entries to the upstash vector index
    await indexJournalEntry(journals);

    return journals;
  },
  {
    persist: true,
    revalidateTags: () => ["journal"],
    log: ["datacache", "verbose", "dedupe"],
  },
);

export const getJournalEntryById = memoize(
  async (journalId: string, userId: string) => {
    const journal = await prisma.journalEntry.findUnique({
      where: {
        userId_id: {
          userId,
          id: journalId,
        },
      },
      include: {
        Analysis: true,
      },
    });

    return journal;
  },
  {
    persist: true,
    revalidateTags: (id) => [`journal-${id}`],
    log: ["datacache", "verbose", "dedupe"],
  },
);
