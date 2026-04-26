"use client";

import { useEffect, useRef } from "react";
import type { UseFormWatch, FieldValues } from "react-hook-form";

export function useFormAutoSave<T extends FieldValues>(
  watch: UseFormWatch<T>,
  onAutoSave?: (data: T) => void,
  delay = 1000,
) {
  const callbackRef = useRef(onAutoSave);

  useEffect(() => {
    callbackRef.current = onAutoSave;
  });

  useEffect(() => {
    if (!callbackRef.current) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const subscription = watch((data) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callbackRef.current?.(data as T);
      }, delay);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [watch, delay]);
}
