import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const modifyMentorProfile = async (changeObject, imageFile) => {
  try {
    const formData = new FormData();
    const jsonData = { ...changeObject };
    formData.append("json", JSON.stringify(jsonData));
    if (!!imageFile) formData.append("image", imageFile);
    const response = await axios.post(
      `${SV_LOCAL}/user/mentor/modify_profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const modifyMenteeProfile = async (
  changeObject,
  deleteObject,
  imageFile
) => {
  try {
    const formData = new FormData();
    const jsonData = { ...changeObject };
    formData.append("json", JSON.stringify(jsonData));
    if (!!deleteObject)
      formData.append("delete", JSON.stringify({ ...deleteObject }));
    if (!!imageFile) formData.append("image", imageFile);
    console.log(changeObject);
    const response = await axios.post(
      `${SV_LOCAL}/user/mentee/modify_profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const modifyMenteeTag = async (tagList) => {
  const formData = new FormData();
  // {tagList = [{ idx: 3}]} 형식으로 보내야함
  const jsonData = { tagList: [...tagList] };
  try {
    await axios.post(`${SV_LOCAL}/user/mentee/modify_tagList`, jsonData, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
