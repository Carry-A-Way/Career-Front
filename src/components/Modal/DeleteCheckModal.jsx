import React from "react";
import styled from "styled-components";
import {
  onDeleteComment,
  onDeletePost,
  onDeleteRecomment,
} from "../../api/deletePost";
import { useParams } from "react-router-dom";
import { ModalWrapper } from "../../styles/common/ModalComponent";

const DeleteCheckModal = (props) => {
  const { ids, setIsDeleteInfo, option, setUpdate } = props;
  const { id: postId } = useParams();
  const deleteFunction = () => {
    switch (option) {
      case "게시글":
        onDeletePost(postId);
        window.history.back();
        break;
      case "댓글":
        onDeleteComment(ids.commentId, postId);
        setUpdate(true);
        // window.location.reload();
        break;
      case "대댓글":
        onDeleteRecomment(ids.recommentId, ids.commentId, postId);
        // window.location.reload();
        setUpdate(true);
        break;
      default:
        break;
    }
  };
  return (
    <ModalWrapper
      onClick={() => {
        setIsDeleteInfo(false);
      }}
    >
      <DeleteModal onClick={(e) => e.stopPropagation()}>
        <header>
          <span>{option}을 삭제하시겠습니까?</span>
        </header>
        <main>
          <div
            className="button"
            onClick={() => {
              setIsDeleteInfo(false);
            }}
          >
            취소
          </div>
          <div className="button" onClick={deleteFunction}>
            삭제
          </div>
        </main>
      </DeleteModal>
    </ModalWrapper>
  );
};

export default DeleteCheckModal;

const DeleteModal = styled.div`
  width: 20rem;
  height: 10rem;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  color: black;
  > header {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }
  > main {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: 1.3rem;
    .button {
      padding: 1rem 1.5rem;
      cursor: pointer;
      border-radius: 0.7rem;
      &:nth-of-type(1) {
        background-color: #f5f5f5;
        &:hover {
          background-color: #e9e9e9;
        }
      }
      &:nth-of-type(2) {
        background-color: #516a8b;
        color: white;
        &:hover {
          background-color: #2f5383;
        }
      }
    }
  }
`;
