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
