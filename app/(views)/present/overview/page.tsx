"use client";
import { Card } from "@/app/components/card";
import { useStorage } from "@/app/lib/hooks/useStorage";
import { Person } from "@/app/lib/types/Person";
import { useChatGPT } from "@/app/lib/hooks/useChatGPT";
import { LinkButton } from "@/app/components/link-button";
import { Button } from "@/app/components/button";
import { MealPlan } from "@/app/lib/types/MealPlan";
import { useCallback, useEffect, useMemo } from "react";
import { ChatResultSchema } from "@/app/lib/types/ChatResultSchema";
import { useSearchParams } from "next/navigation";
import { handlePrint } from "./util";
import Spinner from "@/app/components/spinner";

export default function Page() {
  const searchParams = useSearchParams();
  const regenerate = searchParams.get("regenerate") === "true";
  const [people] = useStorage<Person[]>("people");
  const [meals] = useStorage<string[]>("meals");
  const [days] = useStorage<string[]>("days");
  const [cuisines] = useStorage<string[]>("cuisines");
  const [restrictions] = useStorage<string[]>("restrictions");
  const [mealPlan, setMealPlan] = useStorage<MealPlan | null>("mealPlan");
  const { loading, response, setPrompt } = useChatGPT<MealPlan>();

  const prettyPrintPeople = JSON.stringify(
    people.map((x) => {
      const { analysis: _, guid: __, ...rest } = x;
      return rest;
    })
  );
  const input = useMemo(() => {
    const schema: ChatResultSchema = {
      type: "object",
      properties: {
        plan: {
          type: "array",
          description: "A container for all of the data of this meal plan",
          items: {
            type: "object",
            properties: {
              meals: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      description:
                        "Which meal of the day is this, e.g. Breakfast, Dinner, Snack. Always use title case capitalization.  Sort alphabetically.",
                    },
                    description: {
                      type: "string",
                      description:
                        "Description of this meal, limited to 20 words or less",
                    },
                    ingredients: {
                      type: "array",
                      description: "A shopping list needed to cook this meal",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              day: {
                type: "string",
                description:
                  "The day of the week this meal plan is for, sort order should correspond to when this day is present in the week.",
              },
            },
          },
        },
      },
    };
    return {
      system: `You are a professional meal planing dietician and health expert. Given the following people's profiles, plan meals for each day of the week specified.  For each day, include the meal types specified, e.g. "breakfast, lunch, dinner, etc.".  Pay close attention to desired cuisines and dietary restrictions.  Include
    a a shopping list for each meal you can think of.  This is critical to these peoples' health and is much appreciated.  Always return valid ECMA compliant JSON data.`,
      prompt: `I would like a meal plan for ${people?.length} person(s):
    
    List of people and their characteristics including weight, height, sex, and preferred diet. This information will be in Javascript JSON format:
    ${prettyPrintPeople}

    Meal types:
    ${meals.map((x) => x).join(", ")}

    Days of the week to include meals:
    ${days?.join(", ")}

    Favorite cuisines:
    ${cuisines?.join(", ")}

    Dietary restrictions/guidelines:
    ${restrictions?.join(", ")}
    `,
      schema,
    };
  }, [people, meals, days, cuisines, restrictions, prettyPrintPeople]);

  useEffect(() => {
    if (!mealPlan || regenerate) {
      setPrompt(input);
    }
  }, [mealPlan, setPrompt, input, regenerate]);

  useEffect(() => {
    if (response) {
      setMealPlan(response as MealPlan);
    }
  }, [response, setMealPlan]);

  const handleRegenerate = useCallback(() => {
    setMealPlan(null);
  }, [setMealPlan]);

  return (
    <Card title={`Your weekly meal plan`}>
      <div className="relative w-full p-8">
        <div id="exportSection">
          {!loading &&
            mealPlan?.plan?.map((x, i) => (
              <div
                key={i}
                className="mb-8 last:mb-0 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
              >
                <h1 className="text-xl font-semibold mb-4 text-black">
                  {x.day}
                </h1>
                <section>
                  {x.meals.map((y, i2) => (
                    <div key={i2} className="mb-6 last:mb-0">
                      <div className="text-lg font-medium text-black">
                        {y.type}
                      </div>
                      <div className="text-gray-700">{y.description}</div>
                      <ul className="list-disc list-inside mt-2">
                        {y.ingredients.map((z, i3) => (
                          <li key={i3} className="text-gray-600">
                            {z}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              </div>
            ))}
          {loading && (
            <Spinner text="Developing your customized meal plan..." />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex space-x-4">
          <LinkButton href="/configure/1" text="Start Over" />
          <LinkButton href="/customize/2" text="Back" />
        </div>
        <div className="flex space-x-4">
          <Button onClick={() => handlePrint("exportSection")}>Print</Button>
          <Button onClick={handleRegenerate}>Regenerate</Button>
        </div>
      </div>
    </Card>
  );
}
