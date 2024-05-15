"use client";
import { Card } from "@/app/components/card";
import { LinkButton } from "@/app/components/link-button";

import { ConfigureToggles } from "@/app/components/configure-toggles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useStorage } from "@/app/lib/hooks/useStorage";
import { Button } from "@/app/components/button";
import { useChatGPT } from "@/app/lib/hooks/useChatGPT";
import { getSchema } from "./getSchema";

export default function Cuisines() {
  const [cuisines] = useStorage<string[]>("cuisines");

  const {
    response = { values: cuisines },
    setPrompt,
    loading,
  } = useChatGPT<{
    values: string[];
  }>();

  const handleMoreClick = useCallback(() => {
    setPrompt({
      system: `You are a world cuisine expert who is eager to share your knowledge.`,
      prompt: `Please add an additional 5 popular international and interesting cuisines to the following array:  
      [${response.values?.toString()}] 
      Always include the original values and add your items and return the result. Sort the list in order of popularity.`,
      schema: getSchema("A capitalized string of an cuisine"),
    });
  }, [response.values, setPrompt]);

  useEffect(() => {
    handleMoreClick();
  }, []);

  return (
    <Card title={`Configure - Cuisines`}>
      <div className="relative w-full p-8">
        What types of cuisine do you enjoy?
      </div>
      <div className="mb-8">
        <ConfigureToggles name="cuisines" keys={response?.values} />
      </div>
      <div className="flex justify-end space-x-4 items-center">
        <LinkButton text="Back" href="/customize/1" />
        <Button onClick={handleMoreClick}>
          {!loading ? "More Suggestions" : "Thinking..."}
        </Button>

        <LinkButton
          text="Plan my meals!"
          href="/present/overview?regenerate=true"
        />
      </div>
    </Card>
  );
}
