"use client";
import Restrictions from "./customize-restrictions";
import Cuisines from "./customize-cuisines";

const getSchema = (description: string) => ({
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

export default function Page({
  params: { step },
}: {
  params: { step: string };
}) {
  return {
    1: <Restrictions />,
    2: <Cuisines />,
  }[step];
}
