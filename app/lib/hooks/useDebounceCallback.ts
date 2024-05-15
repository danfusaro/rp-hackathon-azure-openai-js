import { useEffect, useState } from "react";

// Debounce function with strong typing
export const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const debouncedCallback = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => callback(...args), delay);
    setTimer(newTimer);
  };

  return debouncedCallback as T;
};
