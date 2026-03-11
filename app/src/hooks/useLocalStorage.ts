import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setValue(JSON.parse(event.newValue));
      }
    };

    // Listen to storage event
    window.addEventListener("storage", handleStorageChange);

    // Clean-up function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  // This is a tuple
  return [value, setValue] as const;
}
