import axios from "axios";
import { withRouter } from "react-router-dom";
import { clearUserData } from "./JwtHelper";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
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

export const baseURL = "http://localhost:8080/api/";
