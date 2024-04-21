import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import {
  ADD_HEART_MENTOR,
  DELETE_HEART_MENTOR,
  HEART_MENTOR_LIST,
} from "./api";

export const insertHeartToMentor = async (mentorId) => {
  try {
    await axios.post(
      `${SV_LOCAL}/${ADD_HEART_MENTOR}?mentorId=${mentorId}`,
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
      `${SV_LOCAL}/${DELETE_HEART_MENTOR}?mentorId=${mentorId}`,
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
    const response = await axios.get(`${SV_LOCAL}/${HEART_MENTOR_LIST}`, {
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
