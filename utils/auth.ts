import { prisma } from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import { cache } from "react";

export const getUserByClerkId = cache(async () => {
  const { userId } = await auth();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
  });
  return user;
});
