import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", autoComplete = "off", ...props }, ref) => {
    return (
      <input
        type={type}
        autoComplete={autoComplete}
        ref={ref}
        className={cn(
          "flex w-full h-12 rounded-lg  px-4 py-2 text-sm text-black placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border border-input",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
