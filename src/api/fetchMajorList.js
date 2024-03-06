import axios from "axios";
import { SV_LOCAL } from "../constants";
import { MAJOR_AUTO_COMPLETE } from "../settings/url";

export const fetchMajorAutoComplete = async (keyword) => {
  try {
    const response = await axios.get(`${SV_LOCAL}/${MAJOR_AUTO_COMPLETE}`, {
      params: {
        majorName: keyword,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
