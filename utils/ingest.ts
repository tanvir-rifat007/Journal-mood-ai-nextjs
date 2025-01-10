import { Index as UpstashIndex } from "@upstash/vector";

const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

export async function indexJournalEntry(journals) {
  if (journals.length > 0) {
    for (const entry of journals) {
      const { id, content, createdAt, user } = entry;

      try {
        await index.upsert({
          id,
          data: content,
          metadata: {
            createdAt,
            id,
            content,
            userId: user.clerkId,
          },
        });
        console.log(`Indexed journal entry: ${id}`);
      } catch (error) {
        console.error(`Error indexing entry ${id}:`, error);
      }
    }
  }
}
