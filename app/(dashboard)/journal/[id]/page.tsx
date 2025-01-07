import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { getJournalEntryById } from "@/utils/entries";

type JournalEntryProps = {
  params: Promise<{ id: string }>;
};

const analysisData = [
  {
    name: "Summary",
    value: "",
  },
  {
    name: "Subject",
    value: "",
  },
  {
    name: "Mood",
    value: "",
  },
  {
    name: "Negative",
    value: "False",
  },
];

const page = async ({ params }: JournalEntryProps) => {
  const user = await getUserByClerkId();
  const journalId = (await params).id;
  const journal = await getJournalEntryById(journalId, user.id);

  return (
    <div className="grid grid-cols-3 h-full w-full gap-4">
      <div className="col-span-2 mt-10 container mx-auto">
        <Editor journal={journal} />
      </div>
      <div className="mt-10 border-l border-slate-500/95">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>

        <div className="px-6 py-10">
          <ul>
            {analysisData.map((data) => (
              <li
                key={data.name}
                className="flex justify-between items-center border-b border-t border-slate-500/95"
              >
                <span>{data.name}</span>
                <span>{data.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
