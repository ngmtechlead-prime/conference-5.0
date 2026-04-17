"use client";

import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/sme-pitch";

export function ClearLocalStorage() {
  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  return null;
}
