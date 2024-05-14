import axios, { AxiosResponse, CancelToken } from "axios";

const HEADERS = { "Content-Type": "application/json" };

interface ApiResponse {
  isError: boolean;
  error: any;
  data: any;
}

const api = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://quinisports/";

export const getApi = async (url: string, cancelToken?: CancelToken): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.get(`${api}${url}`, { cancelToken });

    return { isError: false, error: "", data: response.data?.data || null };
  } catch (error: any) {
    console.error("🚀 >>  getApi >>  error:", error);
    return { isError: true, error: error?.response?.data || error, data: null };
  }
};

export const postApi = async (url: string, data: any, cancelToken?: CancelToken): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.post(`${api}${url}`, data, { headers: HEADERS, cancelToken });

    return { isError: false, error: "", data: response.data?.data || null };
  } catch (error: any) {
    console.error("🚀 >>  getApi >>  error:", error);
    return { isError: true, error: error?.response?.data || error, data: null };
  }
};

export const putApi = async (url: string, data: any, cancelToken?: CancelToken): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.put(`${api}${url}`, data, { headers: HEADERS, cancelToken });

    return { isError: false, error: "", data: response.data?.data || null };
  } catch (error: any) {
    console.error("🚀 >>  getApi >>  error:", error);
    return { isError: true, error: error?.response?.data || error, data: null };
  }
};

export const deleteApi = async (url: string, cancelToken?: CancelToken): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.delete(`${api}${url}`, { headers: HEADERS, data: {}, cancelToken });

    return { isError: false, error: "", data: response.data?.data || null };
  } catch (error: any) {
    console.error("🚀 >>  deleteApi >>  error:", error);
    return { isError: true, error: error?.response?.data || error, data: null };
  }
};
