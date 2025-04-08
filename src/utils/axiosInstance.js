import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.baseURL = "https://be1.sthvansuroshi.online/api/v1";
// axiosInstance.defaults.baseURL = "http://localhost:8000/api/v1";

export default axiosInstance;
