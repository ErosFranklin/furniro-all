import axios from "axios";
import api from "./api";

type CreateUserPayload = {
  email: string;
  password: string;
};

type ApiErrorResponse = {
  error?: string;
};

export const createUser = async (payload: CreateUserPayload) => {
  try {
    const { data } = await api.post("/users", payload);
    return data;
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      throw new Error(
        error.response?.data?.error ?? "We couldn't create your account. Please try again.",
        { cause: error },
      );
    }
    throw error;
  }
};

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  try {
    const { data } = await api.post("/users/login", { email, password });
    return data;
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      throw new Error(
        error.response?.data?.error ?? "We couldn't log you in. Please try again.",
        { cause: error },
      );
    }
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/users/logout");
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      throw new Error(
        error.response?.data?.error ?? "We couldn't log you out. Please try again.",
        { cause: error },
      );
    }
    throw error;
  }
};
