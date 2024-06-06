import axios, { AxiosResponse, CancelToken } from "axios";

const HEADERS = { "Content-Type": "application/json" };

interface ApiResponse {
  isError: boolean;
  error: any;
  data: any;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getApi = async (url: string, cancelToken?: CancelToken): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}${url}`, { cancelToken });

    return { isError: false, error: "", data: response.data?.data || null };
  } catch (error: any) {
    console.error("🚀 >>  getApi >>  error:", error);
    return { isError: true, error: error?.response?.data || error, data: null };
  }
};

export const postApi = async (url: string, data: any, cancelToken?: CancelToken): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.post(`${API_URL}${url}`, data, { headers: HEADERS, cancelToken });

    return { isError: false, error: "", data: response.data?.data || null };
  } catch (error: any) {
    console.error("🚀 >>  postApi >>  error:", error);
    return { isError: true, error: error?.response?.data || error, data: null };
  }
};

export const putApi = async (url: string, data: any, cancelToken?: CancelToken): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.put(`${API_URL}${url}`, data, { headers: HEADERS, cancelToken });

    return { isError: false, error: "", data: response.data?.data || null };
  } catch (error: any) {
    console.error("🚀 >>  putApi >>  error:", error);
    return { isError: true, error: error?.response?.data || error, data: null };
  }
};

export const deleteApi = async (url: string, cancelToken?: CancelToken): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.delete(`${API_URL}${url}`, { headers: HEADERS, data: {}, cancelToken });

    return { isError: false, error: "", data: response.data?.data || null };
  } catch (error: any) {
    console.error("🚀 >>  deleteApi >>  error:", error);
    return { isError: true, error: error?.response?.data || error, data: null };
  }
};
