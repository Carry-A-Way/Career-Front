import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { dateParse } from "../../utils/ParseFormat";
import { SV_LOCAL } from "../../constants";
import axios from "axios";
import { getCookie } from "../../cookie";

const MyCommentList = ({ comments, setComments }) => {
  const [deleteComment, setDeleteComment] = useState(null);
  const onDeleteComment = () => {
    if (deleteComment.commentId === -1) {
      axios
        .delete(`${SV_LOCAL}/community/comment/delete`, {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
          data: { id: deleteComment.id, articleId: deleteComment.article.id },
        })
        .then((res) => {
          setDeleteComment(null);
          setComments([]);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .delete(`${SV_LOCAL}/community/recomment/delete`, {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
          data: {
            id: deleteComment.id,
            articleId: deleteComment.article.id,
            commentId: comments.commentId,
          },
        })
        .then((res) => {
          setDeleteComment(null);
          setComments([]);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (deleteComment === null) document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";
  }, [deleteComment]);

  if (comments === null) return <NoneList>Loading...</NoneList>;
  return (
    <>
      {comments.length ? (
        comments.map((item, idx) => (
          <Comment key={idx}>
            <header>
              <FontAwesomeIcon icon={faMessage} className="icon" />
              <div className="comment-content">{item.content}</div>
              <div className="comment-date">
                작성일 {dateParse(item.createdAt)}
              </div>
              <FontAwesomeIcon
                icon={faTrashCan}
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setDeleteComment(item);
                }}
              />
            </header>
            <footer>
              <Link
                className="comment-title-wrapper"
                to={`/community/post/${item.article.id}`}
              >
                <div className="comment-title">{item.article.title}</div>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{ fontSize: "1.2rem" }}
                />
              </Link>
            </footer>
          </Comment>
        ))
      ) : (
        <NoneList>남긴 댓글이 없습니다.</NoneList>
      )}
      {deleteComment !== null && (
        <DeleteWrapper
          onClick={() => {
            setDeleteComment(null);
          }}
        >
          <DeleteModal onClick={(e) => e.stopPropagation()}>
            <header>
              <span>댓글을 삭제하시겠습니까?</span>
            </header>
            <main>
              <div
                className="button"
                onClick={() => {
                  setDeleteComment(null);
                }}
              >
                취소
              </div>
              <div className="button" onClick={onDeleteComment}>
                삭제
              </div>
            </main>
          </DeleteModal>
        </DeleteWrapper>
      )}
    </>
  );
};

export default React.memo(MyCommentList);

const Comment = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  header {
    display: flex;
    gap: 1rem;
    align-items: start;
    .icon {
      font-size: 1.4rem;
      width: 2rem;
    }
    .comment-content {
      font-size: 1.3rem;
      flex: 1;
    }
    .comment-date {
      font-size: 1.2rem;
      width: 12rem;
      text-align: end;
    }
  }
  footer {
    display: flex;
    justify-content: flex-end;
    .comment-title-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
      width: 70%;
      color: black;
      text-decoration: none;
      cursor: pointer;
      .comment-title {
        font-size: 1.2rem;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

const DeleteWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #8080806d;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const DeleteModal = styled.div`
  width: 20rem;
  height: 10rem;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
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

const NoneList = styled.div`
  text-align: center;
  font-size: 1.2rem;
  height: 10rem;
  color: gray;
`;
