import Journal from "@/components/Journal";
import NewEntry from "@/components/NewEntry";
import { getUserByClerkId } from "@/utils/auth";
import { getAllJournalEntries } from "@/utils/entries";
import Link from "next/link";

const JournalPage = async () => {
  const user = await getUserByClerkId();
  const journals = await getAllJournalEntries(user.id);

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
