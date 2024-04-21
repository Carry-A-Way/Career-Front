import React from "react";
import ProfileImage from "../Image/ProfileImage";
import {
  CommentContainer,
  CommentHeader,
  CommentMain,
  ProfileInfo,
} from "../../styles/common/postComponents";
import { onAddHeart, onDeleteHeart } from "../../api/heartPost";
import { dateTimeParse } from "../../utils/ParseFormat";
import OptionButton from "../Button/OptionButton";
import { HeartButton } from "../Button/HeartButton";
import { onEditRecommentContent } from "../../api/editPost";
import { checkModify } from "../../utils/checkModify";

const RecommentList = (props) => {
  const {
    comment,
    commentIdx,
    setComments,
    comments,
    setEditRecommentContent,
    editRecommentContent,
    recommentInputRef,
    activeOptionId,
    setActiveOptionId,
    setUpdate,
  } = props;
  const reverseRecomment = comment.recomments.slice().reverse();
  return (
    <>
      {reverseRecomment &&
        reverseRecomment.map((recomment, recommentIdx) => (
          <CommentContainer
            img={recomment.img || ""}
            key={recommentIdx}
            style={{ width: "90%" }}
          >
            <CommentHeader>
              <ProfileInfo>
                <ProfileImage profileImg={recomment.img} />
                <div className="info">
                  <span className="name">
                    {recomment.user.nickname || "익명"} (
                    {recomment.user.isTutor ? "멘토" : "멘티"})
                  </span>
                  <span className="date">
                    작성일 {dateTimeParse(recomment.createdAt)}
                    {checkModify(recomment.createdAt, recomment.updatedAt)
                      ? " (수정됨)"
                      : ""}
                  </span>
                </div>
              </ProfileInfo>
              <OptionButton
                option="대댓글"
                idx={recomment.id}
                setEditContent={setEditRecommentContent}
                inputRef={recommentInputRef[recommentIdx]}
                checkId={recomment.user.id}
                ids={{
                  recommentId: recomment.id,
                  commentId: comment.id,
                }}
                activeOptionId={activeOptionId}
                setActiveOptionId={setActiveOptionId}
                setUpdate={setUpdate}
              />
            </CommentHeader>
            <CommentMain>
              <textarea
                className={
                  editRecommentContent === recomment.id
                    ? "main-content-write main-content"
                    : "main-content"
                }
                disabled={!(editRecommentContent === recomment.id)}
                value={recomment.content}
                ref={(inputRef) => {
                  if (!recommentInputRef[recommentIdx]) {
                    recommentInputRef[recommentIdx] = React.createRef();
                  }
                  recommentInputRef[recommentIdx].current = inputRef;
                }}
                onChange={(e) => {
                  const updatedComments = [...comments];
                  const updatedComment = {
                    ...updatedComments[commentIdx],
                  };
                  const updatedRecomments = [...updatedComment.recomments];
                  updatedRecomments[recommentIdx] = {
                    ...updatedRecomments[recommentIdx],
                    content: e.target.value,
                  };
                  updatedComment.recomments = updatedRecomments;
                  updatedComments[commentIdx] = updatedComment;
                  setComments(updatedComments);
                }}
              />
            </CommentMain>
            {editRecommentContent === recomment.id ? (
              <footer
                style={{
                  justifyContent: "flex-end",
                  padding: "0 2.5rem",
                  gap: "0.5rem",
                }}
              >
                <button
                  style={{ margin: "0" }}
                  onClick={() => {
                    setEditRecommentContent("");
                    // const updatedComments = [...comments];
                    // const updatedComment = {
                    //   ...updatedComments[commentIdx],
                    // };
                    // const updatedRecomments = [...updatedComment.recomments];
                    // updatedRecomments[recommentIdx] = {
                    //   ...updatedRecomments[recommentIdx],
                    //   content:
                    //     originalPost.comments[commentIdx].recomments[
                    //       recommentIdx
                    //     ].content,
                    // };
                    // updatedComment.recomments = updatedRecomments;
                    // updatedComments[commentIdx] = updatedComment;
                    // setComments(updatedComments);
                    setUpdate(true);
                  }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  style={{ margin: "0" }}
                  onClick={() => {
                    onEditRecommentContent(
                      recomment.id,
                      comments[commentIdx].recomments[recommentIdx].content
                    );
                    setEditRecommentContent("");
                    setUpdate(true);
                  }}
                >
                  등록
                </button>
              </footer>
            ) : (
              <footer>
                <div className="footer-left">
                  <HeartButton
                    isHeartClicked={recomment.isHeartClicked}
                    onClick={() => {
                      if (recomment.isHeartClicked)
                        onDeleteHeart(2, recomment.id);
                      else onAddHeart(2, recomment.id); // 대댓글은 type 2
                      //   setUpdateComment(true);
                      setUpdate(true);
                    }}
                  />
                  <span>{recomment.heartCnt}</span>
                </div>
              </footer>
            )}
          </CommentContainer>
        ))}
    </>
  );
};

export default RecommentList;
