import { useFetchData } from "@/lib/useFetchData";
import { getApi } from "@/lib/api";
import { useAdminsStore } from "@/store/sd-admin";
import { User } from "@/types/user";
import { useState } from "react";

const useData = () => {
  const { setData, setError } = useAdminsStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      const newData = await getApi("employee");
      const data: User[] = newData?.data || [];

      setData(data);
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded };
};

export default useData;
