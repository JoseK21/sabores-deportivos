import axios, { AxiosResponse, AxiosError, CancelToken } from "axios";

interface ErrorResponse {
  isError: boolean;
  error: any;
}

export const getApi = async (url: string, cancelToken?: CancelToken): Promise<any | ErrorResponse> => {
  try {
    const response: AxiosResponse = await axios.get(url, { cancelToken });
    return response.data;
  } catch (error: any) {
    return { isError: true, error };
  }
};

export const postApi = async (url: string, data: any, cancelToken?: CancelToken): Promise<any | ErrorResponse> => {
  try {
    const response: AxiosResponse = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
      cancelToken,
    });
    return response.data;
  } catch (error: any) {
    return { isError: true, error };
  }
};

export const putApi = async (url: string, data: any, cancelToken?: CancelToken): Promise<any | ErrorResponse> => {
  try {
    const response: AxiosResponse = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
      cancelToken,
    });
    return response.data;
  } catch (error: any) {
    return { isError: true, error };
  }
};

export const deleteApi = async (url: string, data?: any, cancelToken?: CancelToken): Promise<any | ErrorResponse> => {
  try {
    const response: AxiosResponse = await axios.delete(url, {
      ...(data
        ? {
            headers: {
              "Content-Type": "application/json",
            },
            data,
          }
        : {}),
      cancelToken,
    });
    return response.data;
  } catch (error: any) {
    return { isError: true, error };
  }
};
