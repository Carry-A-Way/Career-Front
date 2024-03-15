import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { ALL_POST, DETAIL_POST } from "../settings/url";

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

export const fetchPostAll = async () => {
  try {
    const response = await axios.get(`${SV_LOCAL}/${ALL_POST}`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
      params: {
        page: 0,
        size: 10,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
