import axios from "axios";
import { SV_LOCAL } from "../constants";
import { GET_MENTOR_POINT } from "../settings/url";
import { getCookie } from "../cookie";

export const fetchMentorPoint = async () => {
  try {
    const response = await axios.get(`${SV_LOCAL}/${GET_MENTOR_POINT}`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
