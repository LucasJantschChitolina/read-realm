import React from "react";

import { cn } from "@/lib/utils";

const FormSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("grid grid-cols-1 gap-4", className)} {...props}>
    {children}
  </div>
));

export default FormSection;
