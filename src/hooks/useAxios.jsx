import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://local-food-lovers-server.onrender.com"
    baseURL: "http://localhost:3001",
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;