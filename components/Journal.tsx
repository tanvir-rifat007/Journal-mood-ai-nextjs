type JournalProps = {
  journal: {
    id: string;
  };
};

const Journal = ({ journal }: JournalProps) => {
  return <div>journal {journal.id}</div>;
};

export default Journal;
