import { ChatResultSchema } from "./ChatResultSchema";

export interface ChatPayload {
  prompt: string;
  system: string;
  schema: ChatResultSchema;
}
