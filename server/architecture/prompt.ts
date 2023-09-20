export const functionCall = {
  name: "amazonSearchTerms",
  description: "function to search amazon for a product",
  parameters: {
    type: "object",
    properties: {
      searchTerms: {
        description: "Array of search terms",
        type: "array",
        items: {
          type: "string",
          description: "Individual search term",
        },
      },
    },
  },
};
