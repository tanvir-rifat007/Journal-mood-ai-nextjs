import Journal from "@/components/Journal";
import NewEntry from "@/components/NewEntry";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { getAllJournalEntries } from "@/utils/entries";
import Link from "next/link";

const JournalPage = async () => {
  const user = await getUserByClerkId();
  const journals = await getAllJournalEntries(user.id);
  await analyze(
    "Today was a great day! I date my girlfriend and we went to the beach. I love her so much.",
  );

  return (
    <div>
      <div>
        {journals.map((journal) => (
          <Link href={`journal/${journal.id}`} key={journal.id}>
            <Journal journal={journal} />
          </Link>
        ))}
      </div>
      <NewEntry />
    </div>
  );
};

export default JournalPage;
