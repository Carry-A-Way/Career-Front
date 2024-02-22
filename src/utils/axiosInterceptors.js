import axios from "axios";
import { getGlobalNavigate } from "../hooks/useGlobalNavigate";
import { setIsLogin } from "../store/isLoginSlice";

export const setupAxiosInterceptors = (dispatch) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        dispatch(setIsLogin(false));
        const navigate = getGlobalNavigate();
        if (navigate) {
          navigate("/");
        }
      }
      return Promise.reject(error);
    }
  );
};
