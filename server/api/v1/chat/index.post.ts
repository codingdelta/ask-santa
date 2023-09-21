import { OpenAI } from "~/server/architecture/openai";
import { OpenAIStream } from "ai";

export default defineEventHandler(async (event) => {
  //   setResponseHeader(event, "Content-Type", "text/event-stream");
  //   setResponseHeader(event, "Cache-Control", "no-cache");

  const apiKey = useRuntimeConfig().azureApiKey;
  if (!apiKey) throw new Error("Missing OpenAI API key");

  const body = await readBody(event);
  if (!body)
    throw createError({ statusCode: 400, statusMessage: "Missing body" });

  const messages = body.messages;
  //   const messages = [{ role: "user", content: "test" }];

  const openai = new OpenAI(messages);
  const completion = await openai.chatCompletions();

  const functioncall = JSON.parse(
    completion.choices[0].message.function_call.arguments
  );

  //TODO: sort on best sellers when we have access to the Amazon API

  return {
    ...functioncall,
    items: [
      {
        name: "Merrell Men's Moab 3 Hiking Shoe",
        image:
          "https://m.media-amazon.com/images/I/81rSi12yULL._AC_UL640_FMwebp_QL65_.jpg",
        url: "https://www.amazon.com/Merrell-Mens-Moab-Hiking-Walnut/dp/B098KH1P14/ref=sr_1_5?crid=3NYD8SWF5HFEK&keywords=hiking+shoes&qid=1695302121&sprefix=boots%2Caps%2C1960&sr=8-5",
        price: 50,
        currency: "dollar",
      },
      {
        name: "Contigo Cortland Chill 2.0 Stainless Steel Vacuum-Insulated Water Bottle with Spill-Proof Lid, Keeps Drinks Hot or Cold for Hours with Interchangeable Lid, 24oz 2-Pack, Juniper & Dragonfruit ",
        image:
          "https://m.media-amazon.com/images/I/61FrZSBHwNL._AC_UL640_FMwebp_QL65_.jpg",
        url: "https://www.amazon.com/Contigo-Vacuum-Insulated-Spill-Proof-Interchangeable-Dragonfruit/dp/B09N7Z26F5/ref=sr_1_4?crid=3LK91XC6W8ZKU&keywords=bottle&qid=1695302190&sprefix=bott%2Caps%2C389&sr=8-4",
        price: 42.99,
        currency: "dollar",
      },
    ],
  };

  return functioncall;
});
