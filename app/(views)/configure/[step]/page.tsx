"use client";
import { Card } from "@/app/components/card";
import { LinkButton } from "@/app/components/link-button";
import ConfigurePeople from "./configure-people";
import { ConfigureToggles } from "@/app/components/configure-toggles";

import { useMemo, useState } from "react";
import { Days } from "@/app/lib/types/Days";

export default function Page({
  params: { step },
}: {
  params: { step: string };
}) {
  const [days, setDays] = useState<string[]>([]);
  const [meals, setMeals] = useState<string[]>([]);

  const hasDays = useMemo(() => Object.values(days)?.some((x) => x), [days]);
  const hasMeals = useMemo(() => Object.values(meals)?.some((x) => x), [meals]);

  return {
    1: (
      <Card title={`Configure - Your Crew`}>
        <div className="relative w-full p-8 pl-0">
          Who are you planning meals for?
        </div>
        <div className="mb-8">
          <ConfigurePeople />
        </div>
        <div className="flex justify-end space-x-4 items-center">
          <LinkButton text="Next: Schedule" href="/configure/2" />
        </div>
      </Card>
    ),
    2: (
      <Card title={`Configure - Schedule`}>
        <div className="relative w-full p-8">
          Which days should be included in you meal plan?
        </div>
        <div className="mb-8">
          <ConfigureToggles
            name="days"
            keys={Object.values(Days)}
            onChange={setDays}
          />
        </div>
        <div className="flex justify-end space-x-4 items-center">
          <LinkButton text="Back" href="/configure/1" />
          <LinkButton
            text="Next: Meals"
            href="/configure/3"
            disabled={!hasDays}
          />
        </div>
      </Card>
    ),
    3: (
      <Card title={`Configure - Meals`}>
        <div className="relative w-full p-8">
          Which meals should we plan for each day?
        </div>
        <div className="mb-8">
          <ConfigureToggles
            name="meals"
            keys={["Breakfast", "Lunch", "Snacks", "Dinner"]}
            onChange={setMeals}
          />
        </div>
        <div className="flex justify-end space-x-4 items-center">
          <LinkButton text="Back" href="/configure/2" />
          <LinkButton
            text="Customize"
            href="/customize/1"
            disabled={!hasMeals}
          />
        </div>
      </Card>
    ),
  }[step];
}
