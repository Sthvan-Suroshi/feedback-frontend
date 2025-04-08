import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.baseURL = "https://be1.sthvansuroshi.online/api/v1";

export default axiosInstance;
