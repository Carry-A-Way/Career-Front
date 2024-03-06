import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { MENTEE_PROFILE, MENTOR_PROFILE } from "../settings/url";

export const fetchMentorProfile = async () => {
  try {
    const response = await axios.get(`${SV_LOCAL}/${MENTOR_PROFILE}`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchMenteeProfile = async () => {
  try {
    const response = await axios.get(`${SV_LOCAL}/${MENTEE_PROFILE}`, {
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
