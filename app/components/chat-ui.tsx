"use client";
import { useState } from "react";
import { ChatPayload } from "../api/openai/route";
import { ConversationStyleToggle } from "./converation-style-toggle";
import { Header } from "./header";
import { PromptInput } from "./prompt-input";
import { ConversationStyle } from "../lib/types/ConversationStyle";
import { Card } from "./card";

export const ChatUI = () => {
  const [style, setStyle] = useState<ConversationStyle>("FUNNY");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const promptChatGPT = async (payload: ChatPayload) => {
    setIsLoading(true);
    console.log(style);
    const response: Response = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setResponse(await response.text());
    setIsLoading(false);
  };

  return (
    <Card title={"Add your stuff"}>
      <>
        <div className="text-slate-50 max-h-[50vh] overflow-y-auto p-8 ">
          {response}
        </div>

        {/* <ConversationStyleToggle onClick={(style) => setStyle(style)} /> */}
        <PromptInput
          isLoading={isLoading}
          onSubmit={(prompt) =>
            promptChatGPT({ conversationStyle: style, prompt })
          }
        />
      </>
    </Card>
  );
};
