import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { SEARCH_MENTOR } from "../settings/url";

export const fetchMentor = async (queryParams) => {
  const { keyword, size, page, sortOption } = queryParams;
  try {
    const url = `${SV_LOCAL}/${SEARCH_MENTOR}`;
    let type;

    switch (sortOption) {
      case 0: // 최신순
        type = "recently";
        break;
      case 1: // 후기 많은 순
        type = "rate";
        break;
      case 2:
        type = "rank";
        break;
      default:
        throw new Error("Invalid sort option");
    }

    const params = {
      keyWord: keyword,
      type,
      page,
      size,
    };
    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
