import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { ADD_HEART, DELETE_HEART } from "../settings/url";

export const onAddHeart = (type, id) => {
  axios
    .post(
      `${SV_LOCAL}/${ADD_HEART}`,
      { typeId: id, type: type },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    )
    // .then((res) => {
    //   setUpdatePost(true);
    // })
    .catch((err) => console.error(err));
};

export const onDeleteHeart = async (type, id) => {
  await axios
    .delete(
      `${SV_LOCAL}/${DELETE_HEART}`,

      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },

        data: { typeId: id, type: type },
      }
    )
    .catch((err) => console.error(err));
};
