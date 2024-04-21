import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { USER_CARD_INFO } from "./api";

export const fetchUserInfo = async (userId) => {
  try {
    const response = await axios.get(`${SV_LOCAL}/${USER_CARD_INFO}`, {
      params: {
        userId: userId,
      },
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
