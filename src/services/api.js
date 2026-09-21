import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

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
    return []; // Return empty array on failure
  }
};
