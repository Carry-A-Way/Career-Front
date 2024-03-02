import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const insertHeartToMentor = async (mentorId) => {
  try {
    await axios.post(
      `${SV_LOCAL}/user/mentee/heart/insert?mentorId=${mentorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const deleteHeartToMentor = async (mentorId) => {
  try {
    await axios.post(
      `${SV_LOCAL}/user/mentee/heart/delete?mentorId=${mentorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const fetchHeartMentorList = async () => {
  try {
    const response = await axios.get(`${SV_LOCAL}/search/mentor/heart`, {
      params: {
        page: 0,
        size: 10,
      },
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
