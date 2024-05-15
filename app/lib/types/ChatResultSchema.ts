export type ChatResultSchema = {
  type: string;
  properties?: {
    [key: string]: {
      type: string;
      description?: string;
      items?: ChatResultSchema;
    };
  };
};
