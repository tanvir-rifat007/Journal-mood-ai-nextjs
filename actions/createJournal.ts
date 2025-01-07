"use server";

import { prisma } from "@/db/db";
import { getUserByClerkId } from "@/utils/auth";
import {  revalidateTag } from "next/cache";

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

  revalidateTag("journal");
  return data;
};
