import { z } from "zod";
import fetch from "node-fetch";

export const redditSchema = {
  name: "reddit",
  parameters: z.object({}),
};

export const reddit = async () => {
  console.log("reddit");
  const { data } = await fetch(`https://www.reddit.com/r/mood.json`).then(
    (res) => res.json(),
  );
  console.log("data", data);

  const relevantInfo = data.children.map((child) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upvotes: child.data.ups,
  }));

  return JSON.stringify(relevantInfo, null, 2);
};
