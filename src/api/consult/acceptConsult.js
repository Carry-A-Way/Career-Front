import axios from "axios";
import { SV_LOCAL } from "../../constants";
import { getCookie } from "../../cookie";
import { MENTOR_ACCEPT_CONSULT } from "../api";

export const mentorAcceptConsult = async (consultId) => {
  try {
    await axios.post(
      `${SV_LOCAL}/${MENTOR_ACCEPT_CONSULT}`,
      {
        consultId: consultId,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};
