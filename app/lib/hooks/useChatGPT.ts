import { useEffect, useState } from "react";
import { ChatPayload } from "../types/ChatPayload";

export function useChatGPT<T>() {
  const [prompt, setPrompt] = useState<ChatPayload>();
  const [response, setResponse] = useState<T>();
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const promptChatGPT = async (payload: ChatPayload) => {
      setIsLoading(true);
      const response: Response = await fetch("/api/openai", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponse((await response.json()) as T);
      setIsLoading(false);
    };

    if (prompt) {
      promptChatGPT(prompt);
    }
  }, [prompt]);
  return {
    setPrompt,
    response,
    loading,
  };
}
