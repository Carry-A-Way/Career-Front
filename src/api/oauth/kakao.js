import axios from "axios";
import { getCookie, setCookie } from "../../cookie";
import { KAKAO_CALLBACK, KAKAO_SIGNUP, KAKAO_SNS_ID_CHECK } from "../api";
import { SV_LOCAL } from "../../constants";

const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY;
const K_SECRET_KEY = process.env.REACT_APP_K_SECRET_KEY;

const KAKAO_GET_TOKEN = "https://kauth.kakao.com/oauth/token";
const KAKAO_GET_USER_INFO = "https://kapi.kakao.com/v2/user/me";
const KAKAO_REDIRECT_URI = "http://localhost:3002/oauth";

export const getKakaoOauthToken = async (code) => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", K_REST_API_KEY);
    params.append("redirect_uri", KAKAO_REDIRECT_URI);
    params.append("code", code);
    params.append("client_secret", K_SECRET_KEY);

    const res = await axios.post(KAKAO_GET_TOKEN, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    if (res.status === 200) {
      const data = res.data;
      setCookie(
        "kakao_token",
        data.access_token,
        {
          path: "/",
          secure: false,
          sameSite: "lax",
        },
        data.expires_in
      );
    }
  } catch (err) {
    console.error(err);
  }
};

export const getKakaoUserInfo = async () => {
  try {
    const res = await axios.get(KAKAO_GET_USER_INFO, {
      headers: {
        Authorization: `Bearer ${getCookie("kakao_token")}`,
      },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const checkRegisterWithSnsId = async (snsId) => {
  try {
    const res = await axios.post(`${SV_LOCAL}/${KAKAO_SNS_ID_CHECK}`, {
      snsId: snsId,
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const kakaoSignup = async (user) => {
  try {
    console.log(user);
    const res = await axios.post(`${SV_LOCAL}/${KAKAO_SIGNUP}`, user);
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const kakaoCallback = async (code) => {
  try {
    const res = await axios.get(`${SV_LOCAL}/${KAKAO_CALLBACK}`, {
      params: {
        code: code,
      },
    });
    console.log("callback res", res);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
