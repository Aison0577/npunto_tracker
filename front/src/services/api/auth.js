import apiClient from "../axios";
import { getErrorMessage } from "./errorHandler";

export const AUTH = {
  useGetCsrfCookie: async () => {
    try {
      const { data } = await apiClient.get("/auth/sanctum/csrf-cookie");
      return data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
  useLogin: async(payload) => {
    try {
      const { data } = await apiClient.post("/auth/login",payload);
      return data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
  useLogout: async() => {
    try {
      const { data } = await apiClient.get("/auth/logout");
      return data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  }
}