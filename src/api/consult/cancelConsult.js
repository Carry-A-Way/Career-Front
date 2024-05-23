import axios from "axios";
import { SV_LOCAL } from "../../constants";
import { MENTEE_CANCEL_CONSULT } from "../api";
import { getCookie } from "../../cookie";

export const menteeCancelConsult = async (reason, consultId) => {
  try {
    await axios.post(
      `${SV_LOCAL}/${MENTEE_CANCEL_CONSULT}`,
      {
        consultId: consultId,
        reason: reason,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
  } catch (e) {
    console.error(e);
  }
};

export const mentorCancelConsult = async (reason, consultId) => {
  try {
    await axios.post(
      `${SV_LOCAL}/calendar/mentor/deny`,
      {
        consultId: consultId,
        reason: reason,
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
