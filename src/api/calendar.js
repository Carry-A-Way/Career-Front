import axios from "axios";
import { getCookie } from "../cookie";
import { SV_LOCAL } from "../constants";
import { CALENDAR_MENTOR_VIEW } from "./api";

export const fetchMentorCalendar = async (mentorId) => {
  try {
    const response = await axios.get(`${SV_LOCAL}/${CALENDAR_MENTOR_VIEW}`, {
      params: {
        mentorId: mentorId,
      },
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
