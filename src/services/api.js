import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// إضافة رمز الدخول تلقائيًا إلى الطلبات
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default API;

export const fetchDestinations = async (category = "", search = "") => {
  try {
    const response = await API.get("/destinations", {
      params: { category, search },
    });

    const resData = response.data;

    if (Array.isArray(resData)) {
      return resData;
    }

    if (resData && Array.isArray(resData.data)) {
      return resData.data;
    }

    return [];
  } catch (error) {
    console.error("API Error in fetchDestinations:", error);
    return [];
  }
};
