import { useFetchData } from "@/lib/useFetchData";
import { getApi } from "@/lib/api";
import { useEmployeesStore } from "@/store/employeesStore";
import { User } from "@/types/user";
import { useState } from "react";

const useEmployersData = (idBusiness: string | undefined) => {
  const { setData, setError } = useEmployeesStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      if (idBusiness) {
        const newData = await getApi(`employee/byBusiness/${idBusiness}`);
        const employeesData: User[] = newData?.data || [];

        setData(employeesData);
      } else {
        throw new Error("Sin Comercio asociado (id)");
      }
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded };
};

export default useEmployersData;
