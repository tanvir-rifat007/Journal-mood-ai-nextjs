"use server";

import { generateImage } from "@/utils/tools/generateImage";

export default async function createImageForReddit(queryResult: string) {
  return await generateImage({
    toolArgs: {
      prompt: queryResult,
    },
  });
}
