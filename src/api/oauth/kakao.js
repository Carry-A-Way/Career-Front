import axios from "axios";
import {
  KAKAO_GET_TOKEN,
  KAKAO_GET_USER_INFO,
  KAKAO_REDIRECT_URI,
} from "../../settings/url";
import { getCookie, setCookie } from "../../cookie";

const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY;
const K_SECRET_KEY = process.env.REACT_APP_K_SECRET_KEY;

export const getKakaoOauthToken = async (code) => {
  console.log(code);
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
  const res = await axios.get(KAKAO_GET_USER_INFO, {
    headers: {
      Authorization: `Bearer ${getCookie("kakao_token")}`,
    },
  });
  console.log(res);
};
