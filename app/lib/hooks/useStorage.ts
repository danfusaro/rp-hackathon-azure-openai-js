import { useState, useEffect } from "react";
import { StorageKey } from "../types/StorageKey";

export const useStorage = <T>(name: StorageKey) => {
  const [items, setItems] = useState<T>(() => {
    const saved = window?.localStorage.getItem(name);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    window?.localStorage.setItem(name, items ? JSON.stringify(items) : "");
  }, [items, name]);

  return [items, setItems] as const;
};
