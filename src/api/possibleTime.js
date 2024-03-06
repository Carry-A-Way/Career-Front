import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { MENTOR_POSSIBLE_CONSULT_TIME } from "../settings/url";

export const fetchMentorPossibleTime = async (mentorId) => {
  try {
    const response = await axios.post(
      `${SV_LOCAL}/${MENTOR_POSSIBLE_CONSULT_TIME}?mentorId=${mentorId}`,
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
