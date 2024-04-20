import axios from "axios";
import { WRITE_POST } from "./api";
import { getCookie } from "../cookie";
import { SV_LOCAL } from "../constants";

export const writePost = async (post, images) => {
  const formData = new FormData();
  formData.append("json", JSON.stringify(post));
  if (images.length) {
    images.forEach((image) => formData.append("images", image));
  }
  console.log(formData.get("images"));
  try {
    const response = await axios.post(`${SV_LOCAL}/${WRITE_POST}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
