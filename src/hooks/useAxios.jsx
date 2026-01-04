import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://local-food-lovers-server.onrender.com"
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;