import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import {
  ADD_COMMENT,
  ADD_RECOMMENT,
  EDIT_COMMENT,
  EDIT_RECOMMENT,
} from "./api";

export const onEnterComment = async (postId, commentInput) => {
  try {
    await axios.post(
      `${SV_LOCAL}/${ADD_COMMENT}`,
      { articleId: postId, content: commentInput },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    // window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const onEditCommentContent = async (id, content) => {
  try {
    await axios.post(
      `${SV_LOCAL}/${EDIT_COMMENT}`,
      {
        id: id,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    // window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const onEditRecommentContent = async (id, content) => {
  try {
    await axios.post(
      `${SV_LOCAL}/${EDIT_RECOMMENT}`,
      {
        id: id,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    // window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const onEnterRecomment = async (postId, commentId, content) => {
  try {
    await axios.post(
      `${SV_LOCAL}/${ADD_RECOMMENT}`,
      {
        articleId: postId,
        commentId: commentId,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    // window.location.reload();
  } catch (err) {
    console.error(err);
  }
};
