import { useEffect, useRef } from "react";

export const useFetchData = (handler: Function) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;

    isMounted.current = true;

    handler();
  }, [handler]);
};
