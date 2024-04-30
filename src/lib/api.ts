import axios, { AxiosResponse, CancelToken } from "axios";

const HEADERS = { "Content-Type": "application/json" };

interface ApiResponse {
  isError?: boolean;
  error?: any;
  data: any;
}

const api = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://quinisports/";

export const getApi = async (url: string, cancelToken?: CancelToken): Promise<any | ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.get(`${api}${url}`, { cancelToken });

    return response.data;
  } catch (error: any) {
    console.log("🚀 >>  getApi >>  error:", error);
    return { isError: true, error: error?.response?.data || error };
  }
};

export const postApi = async (url: string, data: any, cancelToken?: CancelToken): Promise<any | ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.post(`${api}${url}`, data, { headers: HEADERS, cancelToken });

    return response.data;
  } catch (error: any) {
    console.log("🚀 >>  getApi >>  error:", error);

    return { isError: true, error: error?.response?.data || error };
  }
};

export const putApi = async (url: string, data: any, cancelToken?: CancelToken): Promise<any | ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.put(`${api}${url}`, data, { headers: HEADERS, cancelToken });

    return response.data;
  } catch (error: any) {
    console.log("🚀 >>  getApi >>  error:", error);

    return { isError: true, error: error?.response?.data || error };
  }
};

export const deleteApi = async (url: string, cancelToken?: CancelToken): Promise<any | ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.delete(`${api}${url}`, { headers: HEADERS, data: {}, cancelToken });

    return response.data;
  } catch (error: any) {
    console.log("🚀 >>  deleteApi >>  error:", error);

    return { isError: true, error: error?.response?.data || error };
  }
};
