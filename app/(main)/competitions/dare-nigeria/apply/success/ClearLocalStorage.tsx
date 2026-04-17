"use client";

import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/dare-nigeria";

export function ClearLocalStorage() {
  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  return null;
}
