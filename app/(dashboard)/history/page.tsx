import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkId } from "@/utils/auth";
import { getAnalysis } from "@/utils/averageSentiment";
import React from "react";

const page = async () => {
  const user = await getUserByClerkId();
  const { analysis, average } = await getAnalysis(user.id);
  console.log(analysis);
  return (
    <div className="h-full px-6 py-8">
      <div>
        <h1 className="text-2xl mb-4">{`Avg. Sentiment for ${user.email} is : ${average}`}</h1>
      </div>
      <div className="h-96 w-full mt-20">
        <HistoryChart data={analysis} />
      </div>
    </div>
  );
};

export default page;
