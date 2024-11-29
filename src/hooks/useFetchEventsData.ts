import { useState } from "react";
import { getApi } from "@/lib/api";

import { REvent } from "@/relatedTypes/event";
import { useFetchData } from "@/lib/useFetchData";
import { useEventsStore } from "@/store/sd-admin";

const useFetchEventData = () => {
  const { events, setData, setError, error } = useEventsStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    if (!events.length) {
      try {
        const data: REvent[] = (await getApi("event"))?.data || [];

        setData(data);
      } catch (error: any) {
        setError(error);
      }
    }

    setIsLoaded(true);
  });

  return { isLoaded, events, error };
};

export default useFetchEventData;
