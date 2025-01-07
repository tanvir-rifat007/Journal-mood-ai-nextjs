"use server";

import { prisma } from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const createNewUser = async () => {
  const user = await currentUser();

  if (!user) {
    return;
  }

  // check if user exists in the database
  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!userAlreadyExists) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  redirect("/journal");
};
