"use server";

import { prisma } from "@/db/db";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { revalidateTag } from "next/cache";

export const createNewEntry = async () => {
  const user = await getUserByClerkId();

  if (!user) {
    return;
  }

  const data = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "Write About Your Day!",
    },
  });

  const analysis = await analyze(data.content);
  await prisma.analysis.create({
    data: {
      entryId: data.id,
      ...analysis,
    },
  });

  revalidateTag("journal");
  return data;
};
