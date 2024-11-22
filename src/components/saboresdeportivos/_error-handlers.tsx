"use client";

export function ErrorHandler() {
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return <div id="error-handler"></div>;
}
