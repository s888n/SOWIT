import axios from "axios";
const BASE_URL = "http://localhost:8000/api";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getAPI = async (url: string) => {
  return await api
    .get(url)
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    });
};

export const postAPI = async (url: string, data: any) => {
  return await api
    .post(url, data)
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    });
};

// export default api;
