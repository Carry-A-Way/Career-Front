import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const fetchMentorPossibleTime = async (mentorId) => {
  try {
    const response = await axios.post(
      `${SV_LOCAL}/calendar/mentee/get/possible/time?mentorId=${mentorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    return response.data.dateList;
  } catch (err) {
    console.error(err);
  }
};
