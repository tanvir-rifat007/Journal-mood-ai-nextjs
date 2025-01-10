import { prisma } from "@/db/db";
import { memoize } from "nextjs-better-unstable-cache";

export const getAnalysis = memoize(
  async (userId: string) => {
    const analysis = await prisma.analysis.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: true,
      },
    });

    const total = analysis.reduce((acc, cur) => acc + cur.sentimentScore, 0);
    const average = total / analysis.length;

    return {
      analysis,
      average,
    };
  },
  {
    persist: true,
    revalidateTags: () => ["journal"],
    log: ["datacache", "verbose", "dedupe"],
  },
);
