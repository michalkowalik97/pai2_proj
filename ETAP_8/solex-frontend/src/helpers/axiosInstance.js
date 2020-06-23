import axios from "axios";
import { withRouter } from "react-router-dom";
import { clearUserData } from "./JwtHelper";

export const baseURL = "http://solex.tk:8080/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      clearUserData();
      return error;
    }
    return error;
  }
);

export default withRouter(axiosInstance);
