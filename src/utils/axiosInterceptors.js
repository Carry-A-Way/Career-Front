import axios from "axios";
import { getGlobalNavigate } from "../hooks/useGlobalNavigate";
import { setIsLogin } from "../store/isLoginSlice";
import { setCookie } from "../cookie";

export const setupAxiosInterceptors = (dispatch) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      if (error.response && error.response.status === 401) {
        dispatch(setIsLogin(false));
        setCookie("jwtToken", null);
        const navigate = getGlobalNavigate();
        if (navigate) {
          navigate("/");
        }
      }
      return Promise.reject(error);
    }
  );
};
