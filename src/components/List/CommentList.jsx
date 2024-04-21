import React, { useRef, Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import HorizontalLine from "../Line/HorizontalLine";
import { dateTimeParse } from "../../utils/ParseFormat";
import OptionButton from "../Button/OptionButton";
import ProfileImage from "../Image/ProfileImage";
import {
  CommentContainer,
  CommentHeader,
  CommentMain,
  ProfileInfo,
} from "../../styles/common/postComponents";
import RecommentList from "./RecommentList";
import { onAddHeart, onDeleteHeart } from "../../api/heartPost";
import ReplyInput from "../Input/ReplyInput";
import { onEditCommentContent } from "../../api/editPost";
import { checkModify } from "../../utils/checkModify";

const CommentList = (props) => {
  const {
    comments,
    setComments,
    editCommentContent,
    setEditCommentContent,
    setUpdate,
    activeOptionId,
    setActiveOptionId,
  } = props;
  const [editRecommentContent, setEditRecommentContent] = useState(false);
  const replyIRef = useRef(null);
  const scrollToReplyInput = () => {
    if (replyIRef.current) {
      replyIRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const commentInputRef = useRef([]);

  const [recommentInput, setRecommentInput] = useState("");
  const recommentInputRef = useRef(null);
  const recommentRef = useRef(null);
  const [isAddReply, setIsAddReply] = useState(false);
  const [replyTargetIdx, setReplyTargetIdx] = useState(0);

  useEffect(() => {
    if (isAddReply && recommentInputRef.current)
      recommentInputRef.current.focus();
  }, [isAddReply]);

  return (
    <>
      {comments.map((comment, commentIdx) => (
        <Fragment key={comment.id}>
          <CommentContainer>
            <CommentHeader>
              <ProfileInfo>
                <ProfileImage profileImg={comment.img} />
                <div className="info">
                  <span className="name">
                    {comment.user.nickname || "익명"} (
                    {comment.user.isTutor ? "멘토" : "멘티"})
                  </span>
                  <span className="date">
                    작성일 {dateTimeParse(comment.createdAt)}
                    {checkModify(comment.createdAt, comment.updatedAt)
                      ? " (수정됨)"
                      : ""}
                  </span>
                </div>
              </ProfileInfo>
              {!comment.isDeleted && (
                <OptionButton
                  idx={comment.id}
                  setEditContent={setEditCommentContent}
                  inputRef={commentInputRef[commentIdx]}
                  checkId={comment.user.id}
                  option="댓글"
                  ids={{ commentId: comment.id }}
                  activeOptionId={activeOptionId}
                  setActiveOptionId={setActiveOptionId}
                  setUpdate={setUpdate}
                />
              )}
            </CommentHeader>
            <CommentMain>
              <textarea
                className={
                  editCommentContent === comment.id
                    ? "main-content-write main-content"
                    : "main-content"
                }
                disabled={!(editCommentContent === comment.id)}
                value={comment.content}
                ref={(inputRef) => {
                  if (!commentInputRef[commentIdx]) {
                    commentInputRef[commentIdx] = React.createRef();
                  }
                  commentInputRef[commentIdx].current = inputRef;
                }}
                onChange={(e) => {
                  const updatedComment = [...comments];
                  updatedComment[commentIdx] = {
                    ...updatedComment[commentIdx],
                    content: e.target.value,
                  };
                  setComments(updatedComment);
                }}
              />
            </CommentMain>

            {editCommentContent === comment.id ? (
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
                    setEditCommentContent("");
                    setUpdate(true);
                  }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  style={{ margin: "0" }}
                  onClick={() => {
                    onEditCommentContent(
                      comment.id,
                      comments[commentIdx].content
                    );
                    setEditCommentContent("");
                    setUpdate(true);
                  }}
                >
                  등록
                </button>
              </footer>
            ) : (
              <footer>
                <div className="footer-left">
                  {comment.isHeartClicked ? (
                    <FontAwesomeIcon
                      icon={faHeartFull}
                      className="icon heart-full"
                      onClick={() => {
                        onDeleteHeart(1, comment.id); //댓글은 type 1
                        setUpdate(true);
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="icon"
                      onClick={() => {
                        onAddHeart(1, comment.id); //댓글은 type 1
                        setUpdate(true);
                      }}
                    />
                  )}
                  <span>{comment.heartCnt}</span>
                  <FontAwesomeIcon icon={faMessage} className="icon" />
                  <span>{comment.recommentCnt}</span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsAddReply(true);
                      setReplyTargetIdx(commentIdx);
                      scrollToReplyInput();
                      setTimeout(() => {
                        recommentRef.current.focus();
                      }, 0);
                      setRecommentInput("");
                    }}
                  >
                    답글쓰기
                  </span>
                </div>
              </footer>
            )}
          </CommentContainer>
          <RecommentList
            comment={comment}
            commentIdx={commentIdx}
            setComments={setComments}
            comments={comments}
            setEditRecommentContent={setEditRecommentContent}
            editRecommentContent={editRecommentContent}
            recommentInputRef={recommentInputRef}
            activeOptionId={activeOptionId}
            setActiveOptionId={setActiveOptionId}
            setUpdate={setUpdate}
          />
          {isAddReply && commentIdx === replyTargetIdx && (
            <ReplyInput
              commentId={comment.id}
              setIsAddReply={setIsAddReply}
              recommentRef={recommentRef}
              recommentInput={recommentInput}
              setRecommentInput={setRecommentInput}
              comment={comment}
              setUpdate={setUpdate}
            />
          )}
          <HorizontalLine color="#929292" height="1px" />
        </Fragment>
      ))}
    </>
  );
};
export default CommentList;
