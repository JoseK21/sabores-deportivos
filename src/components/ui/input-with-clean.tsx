import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handle: (value: string) => void; // Prop personalizada
}

const InputWithClean = forwardRef<HTMLInputElement, InputProps>(({ className, type, handle, ...props }, ref) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current!);

  const handleClear = () => {
    setValue("");
    handle("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => {
          var value = e.target.value;
          setValue(value);
          handle(value);
        }}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={inputRef}
        {...props}
      />
      {props.value && (
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-red"
          onClick={handleClear}
        >
          x
        </span>
      )}
    </div>
  );
});

InputWithClean.displayName = "InputWithClean";

export { InputWithClean };
