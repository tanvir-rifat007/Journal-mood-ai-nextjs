import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { getJournalEntryById } from "@/utils/entries";

type JournalEntryProps = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: JournalEntryProps) => {
  const user = await getUserByClerkId();
  const journalId = (await params).id;
  const journal = await getJournalEntryById(journalId, user.id);

  const { mood, subject, negative, summary, color, sentimentScore, song } =
    journal?.Analysis;

  const analysisData = [
    {
      name: "Summary",
      value: summary,
    },
    {
      name: "Subject",
      value: subject,
    },
    {
      name: "Mood",
      value: mood,
    },
    {
      name: "Negative",
      value: negative ? "True" : "False",
    },
    {
      name: "Song",
      value: song,
    },
  ];

  return (
    <div className="grid sm:grid-cols-3 h-full w-full gap-4 grid-cols-1">
      <div className="col-span-2 mt-10 container mx-auto">
        <Editor journal={journal} />
      </div>
      <div className="mt-10 border-l border-slate-500/95">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>

        <div className="px-6 py-10">
          <ul>
            {analysisData.map((data) => (
              <li
                key={data.name}
                className="flex justify-between items-center border-b border-t border-slate-500/95 sm:flex-row flex-col"
              >
                <span
                  className="
                  sm:w-1/3
                  w-1/2
                  py-4
                  px-2
                  text-slate-50
                  font-semibold
                  text-xl

                "
                >
                  {data.name}
                </span>
                <span
                  className="
                  sm:w-2/3
                  w-1/2
                  py-4
                  px-2
                  text-slate-50
                  text-sm"
                >
                  {data.value.includes("https") ? (
                    <a href={data.value} target="_blank">
                      {data.value}
                    </a>
                  ) : (
                    data.value
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
