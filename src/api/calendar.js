import axios from "axios";
import { getCookie } from "../cookie";
import { SV_LOCAL } from "../constants";

export const fetchMentorCalendar = async (mentorId) => {
  try {
    const response = await axios.get(`${SV_LOCAL}/calendar/mentor/view`, {
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
