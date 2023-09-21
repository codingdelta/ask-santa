export const systemMessage = `
You are a chatbot helping Santa Claus.
The user will describe a certain person, their hobbies, interests etc.
Your goal is to find the perfect gift for that person. Be spefific and original in your gift ideas.
You can also ask for more information from the user to make your recommendations more spefific.`;

export const functions = [
  {
    name: "giftIdeas",
    description:
      "function to get gift ideas. Be spefific and original in your gift ideas. Come up with at least 5 perfect presents.",
    parameters: {
      type: "object",
      properties: {
        explanation: {
          type: "string",
          description: "Explanation of your gifts. Talk like Santa Claus",
        },
        searchTerms: {
          description: "Array of gifts. Be as specific as possible",
          type: "array",
          items: {
            type: "string",
            description: "Individual gifts, be spefific",
          },
        },
        maxPrice: {
          description:
            "Price the user is willing to pay for the gift. If no price is mentioned, use the default value '0'",
          type: "number",
          default: 0,
        },
      },
      required: ["explanation", "searchTerms", "maxPrice"],
    },
  },
];
