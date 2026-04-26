"use client";

import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/dare-nigeria";

export function ClearLocalStorage() {
  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return null;
}
