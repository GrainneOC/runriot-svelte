// src/lib/services/runriot-service.ts
import axios from "axios";
import type { Session, User, Trail, Result } from "$lib/types/runriot-types";
import { loggedInUser } from "$lib/runes.svelte";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor to automatically add the JWT token to every request
api.interceptors.request.use((config) => {
    if (loggedInUser.token) {
        config.headers.Authorization = `Bearer ${loggedInUser.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const runriotService = {
    async signup(user: User): Promise<boolean> {
        try {
            const response = await api.post("/users", user);
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

    async addResult(result: Result) {
        try {
            const response = await api.post(`/trails/${result.trailid}/results`, result);
            return response.status === 200;
        } catch (error) {
            console.error("Add result failed:", error);
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

    async getResults(): Promise<Result[]> {
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
    }
};
