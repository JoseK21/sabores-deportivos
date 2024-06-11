import { useEffect, useState } from "react";

export const usePreviousURL = () => {
  const [previousUrl, setPreviousUrl] = useState("");

  useEffect(() => {
    if (typeof document !== "undefined") {
      setPreviousUrl(document.referrer);
    }
  }, []);

  return { previousUrl };
};
