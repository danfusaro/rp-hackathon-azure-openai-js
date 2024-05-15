export const getSchema = (description: string) => ({
  type: "object",
  properties: {
    values: {
      type: "array",
      description,
      items: {
        type: "string",
      },
    },
  },
});
