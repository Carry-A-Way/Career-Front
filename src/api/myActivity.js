import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { MY_ACTIVITY_WRITE_POST } from "./api";

export const fetchWritePosts = async (params = { page: 0, size: 10 }) => {
  try {
    const response = await axios.get(`${SV_LOCAL}/${MY_ACTIVITY_WRITE_POST}`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
      params: {
        page: params.page,
        size: params.size,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
