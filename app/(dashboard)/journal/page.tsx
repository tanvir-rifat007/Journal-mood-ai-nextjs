import Journal from "@/components/Journal";
import NewEntry from "@/components/NewEntry";
import Question from "@/components/Question";
import { getUserByClerkId } from "@/utils/auth";
import { getAllJournalEntries } from "@/utils/entries";
import Link from "next/link";

const JournalPage = async () => {
  const user = await getUserByClerkId();
  const journals = await getAllJournalEntries(user.id);

  return (
    <div>
      <Question />

      <div className="flex gap-10 mt-10 mb-10 container mx-auto">
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
