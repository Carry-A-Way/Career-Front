import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { CONSULT_WITH_STATUS, USER_CONSULT_LIST } from "./api";

export const fetchConsultWithStatus = async (status) => {
  try {
    const response = await axios.get(`${SV_LOCAL}/${CONSULT_WITH_STATUS}`, {
      params: {
        status: status,
      },
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response.data.object;
  } catch (err) {
    console.error(err);
  }
};

export const fetchUserConsult = async () => {
  try {
    const response = await axios.get(`${SV_LOCAL}/${USER_CONSULT_LIST}`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response.data.object;
  } catch (e) {
    console.error(e);
  }
};
