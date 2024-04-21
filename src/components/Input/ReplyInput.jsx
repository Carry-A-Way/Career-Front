import React from "react";
import styled from "styled-components";
import { onEnterRecomment } from "../../api/editPost";
import { useParams } from "react-router-dom";

const ReplyInput = (props) => {
  const {
    commentId,
    setIsAddReply,
    recommentRef,
    recommentInput,
    setRecommentInput,
    comment,
    setUpdate,
  } = props;
  const { id: postId } = useParams();
  return (
    <StyledContainer
      style={{ width: "90%" }}
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   onEnterRecomment(postId, commentIdx, recommentInput);
      // }}
    >
      <input
        type="text"
        placeholder={`${comment.user.nickname}님 댓글에 답글쓰기`}
        onChange={(e) => setRecommentInput(e.target.value)}
        value={recommentInput}
        ref={recommentRef}
      />
      <div className="reply-title">답글쓰기</div>
      <div className="reply-option">
        <div
          className="reply-option__item"
          onClick={() => setIsAddReply(false)}
        >
          취소
        </div>
        <div
          className="reply-option__item"
          onClick={() => {
            onEnterRecomment(postId, commentId, recommentInput);
            setIsAddReply(false);
            setUpdate(true);
          }}
        >
          등록
        </div>
      </div>
    </StyledContainer>
  );
};

export default ReplyInput;

const StyledContainer = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  font-size: 1.2rem;
  position: relative;
  > input {
    width: 100%;
    padding: 4rem 3rem;
    box-sizing: border-box;
    font-size: 1.1rem;
    border: 1px solid gray;
    border-radius: 10px;
  }
  .reply-title {
    position: absolute;
    top: 1.5rem;
    left: 3rem;
    font-weight: 600;
  }
  .reply-option {
    display: flex;
    gap: 1rem;
    position: absolute;
    bottom: 1.2rem;
    right: 2rem;
    color: gray;
    font-weight: 600;
    &__item:hover {
      cursor: pointer;
      color: black;
    }
  }
`;
