import apiClient from "../axios";
import { getErrorMessage } from "./errorHandler";

export const API = {
    newActivity:async(payload)=>{
        try {
            const { data } = await apiClient.post("/activities", payload);
            return data;
        } catch (error) {
            throw getErrorMessage(error);
        }
    },
    dailyActivity:async(date)=>{
        try {
            console.log(date);
            
            const { data } = await apiClient.get("/activities/", {
                params: {date}
            });
            console.log(data);
            
            return data;
        } catch (error) {
            throw getErrorMessage(error);
        }
    },
    activityDetails:async(activiyId)=>{
        try {
            const { data } = await apiClient.get(`/activities/${activiyId}`);
            return data;
        } catch (error) {
            throw getErrorMessage(error);
        }
    },
    updateActivityDetails:async(payload)=>{
        try {
            const { data } = await apiClient.put(`/activities/${payload.id}`, payload);
            return data;
        } catch (error) {
            console.log(error);
            throw getErrorMessage(error);
        }
    },
    updateActivityState:async(payload)=>{
        try {
            const { data } = await apiClient.patch(`/activities/${payload.id}/status`, payload);
            return data;
        } catch (error) {
            console.log(error);
            throw getErrorMessage(error);
        }
    },
    deleteActivity:async(payload)=>{
        try {
            const { data } = await apiClient.delete(`/activities/${payload.id}`, payload);
            return data;
        } catch (error) {
            console.log(error);
            throw getErrorMessage(error);
        }
    },
    team:async()=>{
        try {
            const { data } = await apiClient.get(`/users`);
            return data;
        } catch (error) {
            console.log(error);
            throw getErrorMessage(error);
        }
    },
    newMember:async(payload)=>{
        try {
            const { data } = await apiClient.post(`/users`, payload);
            return data;
        } catch (error) {
            console.log(error);
            throw getErrorMessage(error);
        }
    },
    deleteMember:async(userId)=>{
        try {
            const { data } = await apiClient.delete(`/users/${userId}`);
            return data;
        } catch (error) {
            console.log(error);
            throw getErrorMessage(error);
        }
    },
    fetchReport: async (filters) => {
        try {
            const { data } = await apiClient.get("/logs/report", { params: filters });
            return data;
        } catch (error) {
            throw getErrorMessage(error);
        }
    },
}