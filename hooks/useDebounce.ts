import { useEffect, useState } from "react";

export const useDebounce = <T>(
  delay: number = 500
): {
  value: T | undefined;
  debouncedValue: T | undefined;
  setValue: (value: T) => void;
} => {
  const [value, setValue] = useState<T>();
  const [debouncedValue, setDebouncedValue] = useState<T>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return {
    value,
    debouncedValue,
    setValue,
  };
};
