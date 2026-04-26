import { cn } from "@/lib/utils";
import React from "react";

const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
};

export default Wrapper;
