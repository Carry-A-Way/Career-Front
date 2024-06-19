import axios from "axios";
import { SV_LOCAL } from "../../constants";
import { APPLY_CONSULT_TO_MENTOR } from "../api";
import { getCookie } from "../../cookie";

export const applyConsult = async (data) => {
  try {
    const response = await axios.post(
      `${SV_LOCAL}/${APPLY_CONSULT_TO_MENTOR}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    return { status: response.status, message: response.data };
  } catch (err) {
    if (err.response && err.response.status === 400) {
      return { status: err.response.status, message: err.response.data }; // HTTP 400 오류 메시지 반환
    } else {
      return { status: err.response.status, message: err.response.data };
    }
  }
};
