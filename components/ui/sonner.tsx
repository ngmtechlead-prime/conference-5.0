"use client";

import type { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="system"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast font-epilogue",
          title: "group-[.toast]:font-bold",
          description: "group-[.toast]:text-gray-600",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
