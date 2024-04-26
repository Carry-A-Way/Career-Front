import axios from "axios";
import { getGlobalNavigate } from "../hooks/useGlobalNavigate";
import { setIsLogin } from "../store/isLoginSlice";
import { deleteCookie, setCookie } from "../cookie";

export const setupAxiosInterceptors = (dispatch) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!!error.response && error.response.status === 401) {
        dispatch(setIsLogin(false));
        setCookie("jwtToken", null, {
          path: "/",
          secure: true,
          sameSite: "none",
        });
        const navigate = getGlobalNavigate();
        if (navigate) {
          navigate("/");
        }
      }
      return Promise.reject(error);
    }
  );
};
