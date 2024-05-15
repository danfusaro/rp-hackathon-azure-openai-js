"use client";
import { useStorage } from "@/app/lib/hooks/useStorage";
import { useEffect, useState } from "react";
import { StorageKey } from "../lib/types/StorageKey";

type Props = {
  name: StorageKey;
  keys: string[];
  onChange?: (values: string[]) => void;
};

export const ConfigureToggles: React.FC<Props> = ({ onChange, keys, name }) => {
  const [values, setValues] = useStorage<string[]>(name);

  const toggleValue = (value: string) => {
    let newValues = [...values];
    const valueIndex = newValues.indexOf(value);

    if (valueIndex === -1) {
      // Value does not exist, add it
      newValues.push(value);
    } else {
      // Value exists, remove it
      newValues = newValues.filter((val) => val !== value);
    }
    setValues(newValues);
  };

  useEffect(() => {
    onChange?.(values);
  }, [values, onChange]);

  return (
    <div className="grid-cols-5 grid gap-4 mb-6">
      {keys.map((value, index) => (
        <button
          key={value}
          className={`py-2 px-4 rounded ${
            values.includes(value)
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => toggleValue(value)}
        >
          {value}
        </button>
      ))}
    </div>
  );
};
