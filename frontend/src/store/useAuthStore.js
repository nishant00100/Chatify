import { create } from "zustand";
import { axiosInstance } from "../config/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({

    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ authUser: response.data.user, isCheckingAuth: false });
        } catch (error) {
            console.log("Error checking authentication: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {

            const response = await axiosInstance.post("/auth/signup", data);
            set({ authUser: response.data });

            // toast
            toast.success("Account created successfully!");


        } catch (error) {
            console.log("Full error:", error);
            console.log("Response:", error.response);
            console.log("Data:", error.response?.data);

            toast.error(error.response?.data?.message || "Something went wrong");
        }
        finally {
            set({ isSigningUp: false });
        }
    }
}))