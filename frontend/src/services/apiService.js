import axios from "axios";
import menuData from "../Components/Screens/menu-data.json";

const API_BASE_URL = "http://localhost:5090/api";

export const apiService = {
  // getMenuItems: async () => {
  //   try {
  //     return menuData;
  //   } catch (error) {
  //     console.error("Error loading menu data:", error);
  //     throw error;
  //   }
  // },

  getMenuItems: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/menu`);
      return response.data;
    } catch (error) {
      console.error("Error fetching menu items from API:", error);
      throw error;
    }
  },
  placeOrder: async (orderData) => {
    try {
      console.log("Sending to API:", orderData);
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      console.log("API Response:", response);
      return response.data;
    } catch (error) {
      console.error("API Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  getOrders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },
  getDashboardStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/stats`);
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },
};
