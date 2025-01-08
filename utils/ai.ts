import OpenAI from "openai";
import { z } from "zod";

// zod schema for the journal entry
// instead of using our own prompt, we can use the prompt from the zod schema
const schema = z.object({
  mood: z
    .string()
    .describe("the mood of the person who wrote the journal entry."),
  subject: z.string().describe("the subject of the journal entry."),
  negative: z
    .boolean()
    .describe(
      "is the journal entry negative? (i.e. does it contain negative emotions?).",
    ),
  summary: z.string().describe("quick summary of the entire entry."),
  color: z
    .string()
    .describe(
      "a hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.",
    ),
  sentimentScore: z
    .number()
    .describe(
      "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.",
    ),
  song: z.string().describe("a youtube link to a song that matches the mood."),
});

// Generate the prompt
const getPrompt = (content: string) => {
  return `
Analyze the following journal entry and provide structured information based on the format below:

Format:
{
  "mood": "string (e.g., happy, sad)",
  "subject": "string (subject of the entry)",
  "negative": "boolean (true/false)",
  "summary": "string (quick summary)",
  "color": "string (hex color code representing mood, e.g., #ff0000)",
  "sentimentScore": "number (-10 to 10 sentiment score)"
  "song": "string (youtube link to a song that matches the mood)"
}

Journal Entry:
${content}
`;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyze(entry: string) {
  const prompt = getPrompt(entry);
  // ai can analyze the journal entry and provide structured information based on the format and give me the prompt
  console.log("Prompt:", prompt);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
    });

    const output = response.choices[0].message.content;

    // This give me the json output of the journal entry
    console.log("Output:", output);

    try {
      const result = schema.parse(JSON.parse(output as string));
      return result;
    } catch (error) {
      console.error("Error parsing output:", error);
    }
  } catch (error) {
    console.error("Error with OpenAI:", error);
  }
}
