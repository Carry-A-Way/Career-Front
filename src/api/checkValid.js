import axios from "axios";
import { SV_LOCAL } from "../constants";
import { VALID_NICKNAME, VALID_USERNAME } from "./api";

export const checkValidUsername = async (username) => {
  try {
    const response = await axios.post(`${SV_LOCAL}/${VALID_USERNAME}`, {
      username,
    });
    if (response.data) window.alert("사용 가능한 아이디입니다.");
    else window.alert("이미 사용중인 아이디입니다.");
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const checkValidNickname = async (nickname) => {
  try {
    const response = await axios.post(`${SV_LOCAL}/${VALID_NICKNAME}`, {
      nickname,
    });
    // if (response.data) window.alert("사용 가능한 닉네임입니다.");
    // else window.alert("이미 사용중인 닉네임입니다.");
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
