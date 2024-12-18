import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://attractor-b2469-default-rtdb.europe-west1.firebasedatabase.app/',
});
export default axiosApi;