import axios from "axios";
import type { Session, User, Trail, Result, PopulatedResult } from "$lib/types/runriot-types";
import { loggedInUser } from "$lib/runes.svelte";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor to automatically add the JWT token to every request
api.interceptors.request.use((config) => {
    console.log("=== REQUEST INTERCEPTOR ===");
    console.log("loggedInUser.token:", loggedInUser.token);
    if (loggedInUser.token) {
        config.headers.Authorization = `Bearer ${loggedInUser.token}`;
        console.log("Authorization header set:", config.headers.Authorization);
    } else {
        console.log("No token available, request will be unauthorized");
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const runriotService = {
    async signup(user: User): Promise<boolean> {
        try {
            console.log("=== SIGNUP SERVICE ===");
            console.log("Sending user data:", user);
            const response = await api.post("/users/signup", user);
            console.log("Signup response:", response);
            return response.data.success === true;
        } catch (error) {
            console.error("Signup failed:", error);
            return false;
        }
    },

    async login(email: string, password: string): Promise<Session | null> {
        try {
            const response = await api.post("/users/authenticate", { email, password });
            if (response.data.success) {
                const session: Session = {
                    name: response.data.name,
                    token: response.data.token,
                    _id: response.data.id
                };
                return session;
            }
            return null;
        } catch (error) {
            console.error("Login failed:", error);
            return null;
        }
    },

                async addResult(result: Result, trailId: string) {
                try {
                    console.log("=== ADD RESULT DEBUG ===");
                    console.log("Sending result:", result);
                    console.log("Result type:", typeof result);
                    console.log("lat type:", typeof result.lat);
                    console.log("lng type:", typeof result.lng);
                    console.log("Trail ID:", trailId);
                    console.log("Payload JSON:", JSON.stringify(result));
                    const response = await api.post(`/trails/${trailId}/results`, result);
                    console.log("Add result response:", response);
                    console.log("Response status:", response.status);
                    return response.status === 200 || response.status === 201;
                } catch (error) {
                    console.error("=== ADD RESULT ERROR ===");
                    console.error("Full error:", JSON.stringify(error, null, 2));
                    
                    // Log the response data if available
                    if (error && typeof error === 'object' && 'response' in error) {
                        const axiosError = error as { response?: { status: number; data: unknown } };
                        console.error("Response status:", axiosError.response?.status);
                        console.error("Response data:", axiosError.response?.data);
                    }
                    
                    return false;
                }
            },

    async addTrail(trail: Trail): Promise<boolean> {
        try {
            console.log("=== ADD TRAIL DEBUG ===");
            console.log("Sending trail:", trail);
            const response = await api.post("/trails", trail);
            console.log("Response received:", response);
            console.log("Response status:", response.status);
            console.log("Response data:", response.data);
            // Accept both 201 (Created) and 200 (OK) as success
            const success = response.status === 201 || response.status === 200;
            console.log("Success:", success);
            return success;
        } catch (error) {
            console.error("=== ADD TRAIL ERROR ===");
            console.error("Full error:", JSON.stringify(error, null, 2));
            return false;
        }
    },

    async getTrails(): Promise<Trail[]> {
        try {
            const response = await api.get("/trails");
            return response.data;
        } catch (error) {
            console.error("Get trails failed:", error);
            return [];
        }
    },

    async getResults(): Promise<PopulatedResult[]> {
        try {
            const response = await api.get("/results");
            return response.data;
        } catch (error) {
            console.error("Get results failed:", error);
            return [];
        }
    },

    async getTrail(id: string): Promise<Trail | null> {
        try {
            const response = await api.get(`/trails/${id}`);
            return response.data;
        } catch (error) {
            console.error("Get trail failed:", error);
            return null;
        }
    },

    async getResultsByTrailId(id: string): Promise<Result[]> {
        try {
            const response = await api.get(`/trails/${id}/results`);
            return response.data;
        } catch (error) {
            console.error("Get results by trail ID failed:", error);
            return [];
        }
    },

    async deleteTrail(trailId: string): Promise<boolean> {
        try {
            const response = await api.delete(`/trails/${trailId}`);
            return response.status === 204 || response.status === 200;
        } catch (error) {
            console.error("Delete trail failed:", error);
            return false;
        }
    }
};