import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { DETAIL_POST } from "../settings/url";

export const fetchPostDetail = async (postId) => {
  try {
    const response = await axios.get(`${SV_LOCAL}/${DETAIL_POST}`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
      params: {
        id: postId,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
