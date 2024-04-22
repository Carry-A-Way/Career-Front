import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { ALL_POST, DETAIL_POST } from "./api";

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
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchPostAll = async (params = { page: 0, size: 10 }) => {
  try {
    const response = await axios.get(`${SV_LOCAL}/${ALL_POST}`, {
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

export const fetchSearchPosts = async (
  searchKeyword,
  params = { page: 0, size: 10 }
) => {
  try {
    const response = await axios.get(`${SV_LOCAL}/search/community`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
      params: {
        keyWord: searchKeyword,
        page: params.page,
        size: params.size,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
