import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://my-individual-project-mongodb.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
});