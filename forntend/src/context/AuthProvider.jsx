/* eslint-disable no-useless-catch */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import httpStatus from "http-status";
import { useNavigate } from "react-router-dom";




const server = "http://localhost:5000";

const userClient = axios.create({
    baseURL: `${server}/api/v1/user`,
});

const taskClient = axios.create({
    baseURL: `${server}/api/v1/task`,
});

 const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const handleRegister = async (name, email, password,role) => {
        try {
            const response = await userClient.post("/register", {
                name,
                email,
                password,
                role
            });
            console.log(response);
            
            if (response.status === httpStatus.CREATED) {
                return response.data.message;
            }
        } catch (error) {
            throw error;
        }
    };

    const handleLogin = async(email, password) => {
        try {
            const response = await userClient.post("/login", {
                email,
                password,
            });
            console.log(response);
            
            if (response.status === httpStatus.OK) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }
        } catch (error) {
            throw error;
        }
    };

    const handleAddTask = async (title, description) => {
        try {
            const token = localStorage.getItem("token");

            const response = await taskClient.post(
                "/",
                { title, description },
                {
                    headers: { Authorization: `Bearer ${token}` },

                }
                
            );
            //console.log(response.data.newtask._id);
            

            if (response.status === httpStatus.CREATED) {
                //console.log(response.data.newtask._id);
                // localStorage.setItem("taskId",response.data.newtask._id)
                return response.data.message;
            }
        } catch (error) {
            throw error;
        }
    };

    const handleUpdateTask = async (taskId,title, description) => {
        try {
            const token = localStorage.getItem("token");
            
            
            

            const response = await taskClient.put(
                `/${taskId}`,
                { title, description },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === httpStatus.OK) {
                return response.data.message;
            }
        } catch (error) {
            throw error;
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await taskClient.delete(`/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === httpStatus.NO_CONTENT) {
                return "Task deleted successfully";
            }
        } catch (error) {
            throw error;
        }
    };

    const handleGetAllTask = async () => {
        try {
            const token = localStorage.getItem("token");
            //console.log(token);
            

            const response = await taskClient.get("/", 
                {
                headers: { Authorization: `Bearer ${token}` },
                }
            );
            //console.log(response);
            

            if (response.status === httpStatus.OK) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    };

    const handleCompleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await taskClient.put(
            `/complete/${taskId}`,  
            {},                     
            {
                headers: { 
                Authorization: `Bearer ${token}` 
                }
            }
            );
            console.log(response);
            
            if (response.status === httpStatus.OK) {
            return response.data;
            }

        } catch (error) {
            console.error("Complete Task Error:", error);
            throw error;
        }
    };


    const handleGetCompletedTask = async (taskId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await taskClient.get("/completed", {
                headers: { Authorization: `Bearer ${token}` },

            });
            //console.log(response);
            

            if (response.status === httpStatus.OK) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    };

    const data = {
        handleRegister,
        handleLogin,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
        handleGetAllTask,
        handleGetCompletedTask,
        handleCompleteTask
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider