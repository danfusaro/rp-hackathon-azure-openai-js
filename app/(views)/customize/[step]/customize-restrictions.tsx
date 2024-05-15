"use client";
import { Card } from "@/app/components/card";
import { LinkButton } from "@/app/components/link-button";

import { ConfigureToggles } from "@/app/components/configure-toggles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useStorage } from "@/app/lib/hooks/useStorage";
import { Person } from "@/app/lib/types/Person";
import { Restriction } from "@/app/lib/types/Restriction";
import { Button } from "@/app/components/button";
import { useChatGPT } from "@/app/lib/hooks/useChatGPT";
import { getSchema } from "./getSchema";

export default function Restrictions() {
  const [restrictions] = useStorage<string[]>("restrictions");

  const {
    response = { values: restrictions },
    setPrompt,
    loading,
  } = useChatGPT<{
    values: string[];
  }>();

  const handleMoreClick = useCallback(() => {
    setPrompt({
      system: `You are a food and diet expert who is eager to share your knowledge.`,
      prompt: `Please add an additional 5 popular dietary restrictions to the following array:  
      
      [${response.values?.toString()}] 
      
      Always include the original values and add your items and return the result. Sort the list in order of popularity.`,
      schema: getSchema("A capitalized string of dietary restricions"),
    });
  }, [response.values, setPrompt]);

  useEffect(() => {
    handleMoreClick();
  }, []);

  return (
    <Card title={`Customize - Restrictions`}>
      <div className="relative w-full p-8">
        Are there any dietary restrictions we should be aware of?
      </div>
      <div className="mb-8">
        <ConfigureToggles name="restrictions" keys={response?.values} />
      </div>
      <div className="flex justify-end space-x-4 items-center">
        <LinkButton text="Back" href="/configure/3" />
        <Button onClick={handleMoreClick}>
          {!loading ? "More Suggestions" : "Thinking..."}
        </Button>
        <LinkButton text="Next: Cuisines" href="/customize/2" />
      </div>
    </Card>
  );
}
