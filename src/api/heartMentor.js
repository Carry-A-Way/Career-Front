import axios from "axios";
import { SV_LOCAL } from "../constants";

const insertHeartToMentor = async (mentorId) => {
  try {
    const response = await axios.post(`${SV_LOCAL}/user/mentee/heart/insert`, {
      params: {
        mentorId: mentorId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
