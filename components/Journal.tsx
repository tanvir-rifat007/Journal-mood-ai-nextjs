type JournalProps = {
  journal: {
    id: string;
    content: string;
    createdAt: string;
  };
};

const Journal = ({ journal }: JournalProps) => {
  return (
    <div className="card bg-slate-800  w-96 text-slate-50">
      <div className="card-body">
        <h2 className="card-title">
          {new Date(journal.createdAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <p>{journal.content}</p>
        <div className="card-actions justify-end">
          <button className="btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Journal;
