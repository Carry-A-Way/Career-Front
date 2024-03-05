import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const fetchMentorConsultWithStatus = async (status) => {
  try {
    const response = await axios.get(
      `${SV_LOCAL}/consultation/list-by-status`,
      {
        params: {
          status: status,
        },
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    return response.data.object;
  } catch (err) {
    console.error(err);
  }
};

export const fetchMentorConsult = async () => {
  try {
    const response = await axios.get(`${SV_LOCAL}/consultation/mentor`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    // setLastUpcomingConsult(response.data.object.lastUpcomingConsult);
    // setUpcomingConsult(response.data.object.upcomingConsult);
    // setCompletedConsult(response.data.object.previousConsult);
    console.log(response.data.object);
    return response.data.object;
  } catch (e) {
    console.error(e);
  }
};
