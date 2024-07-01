import axios from "axios";
import { KAKAO_CALLBACK, KAKAO_SIGNUP } from "../api";
import { SV_LOCAL } from "../../constants";

export const kakaoCallback = async (code) => {
  try {
    const res = await axios.get(`${SV_LOCAL}/${KAKAO_CALLBACK}`, {
      params: {
        code: code,
      },
    });
    return {
      data: res.data,
      statusCode: 200,
    };
  } catch (err) {
    if (err.response.status === 409) {
      return {
        data: err.response.data,
        statusCode: 409,
      };
    }
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
