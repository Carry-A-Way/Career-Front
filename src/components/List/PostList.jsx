import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMessage,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartFull,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { dateParse } from "../../utils/ParseFormat";
import axios from "axios";
import { getCookie } from "../../cookie";
import { SV_LOCAL } from "../../constants";
import ProfileImage from "../Image/ProfileImage";
import { CommunityCategoryList } from "../../settings/config";

const PostList = ({ posts, setPosts, postStyle }) => {
  const [deletePost, setDeletePost] = useState(null);
  const navigate = useNavigate();
  const onDeletePost = () => {
    axios
      .delete(`${SV_LOCAL}/community/article/delete`, {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
        data: { id: deletePost.id },
      })
      .then((res) => {
        setDeletePost(null);
        setPosts([]);
      })
      .catch((err) => console.error(err));
  };

  const onAddHeart = (e, id, idx) => {
    e.stopPropagation();
    axios
      .post(
        `${SV_LOCAL}/community/heart/add`,
        { typeId: id, type: 0 },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      )
      .then((res) => {
        const updatedPost = [...posts];
        updatedPost[idx] = {
          ...updatedPost[idx],
          heartCnt: updatedPost[idx].heartCnt + 1,
          isHeartClicked: true,
        };
        setPosts(updatedPost);
      })
      .catch((err) => console.error(err));
  };

  const onDeleteHeart = (e, id, idx) => {
    e.stopPropagation();

    axios
      .delete(
        `${SV_LOCAL}/community/heart/delete`,

        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },

          data: { typeId: id, type: 0 },
        }
      )
      .then((res) => {
        const updatedPost = [...posts];
        updatedPost[idx] = {
          ...updatedPost[idx],
          heartCnt: updatedPost[idx].heartCnt - 1,
          isHeartClicked: false,
        };
        setPosts(updatedPost);
      })
      .catch((err) => console.error(err));
  };
  const postStyleRendering = (item) => {
    switch (postStyle) {
      case "category":
        return (
          <div className="category">
            {CommunityCategoryList[item.categoryId].title}
          </div>
        );
      case "edit": // onClick 시 item 과 연관지어서 함수 실행 추가하기
        return (
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faPencil} className="icon fa-white" />
          </div>
        );
      case "delete": // onClick 시 item 과 연관지어서 함수 실행 추가하기
        return (
          <div className="icon-wrapper">
            {/* <img src="/svg/delete.svg" alt="edit-btn" className="icon" /> */}
            <FontAwesomeIcon
              icon={faTrashCan}
              className="icon fa-white"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                setDeletePost(item);
              }}
            />
          </div>
        );
      case "editDelete": // onClick 시 item 과 연관지어서 함수 실행 추가하기
        return (
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faPencil} className="icon fa-white" />
            <FontAwesomeIcon icon={faTrashCan} className="icon fa-white" />
          </div>
        );
      default:
        return;
    }
  };

  useEffect(() => {
    if (deletePost === null) document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";
  }, [deletePost]);

  if (posts === null) return <NoneList>Loading...</NoneList>;
  return (
    <>
      {posts.length ? (
        posts.map((item, idx) => (
          <Post
            key={idx}
            img={item.user.profileImg}
            onClick={() => navigate(`/community/post/${item.id}`)}
          >
            <header>
              <div className="header-left">
                <ProfileImage profileImg={item.user.profileImg} />
                <div className="info">
                  <span className="name">
                    {item.user.nickname || "익명"} (
                    {item.user.isTutor ? "멘토" : "멘티"})
                  </span>
                  <span className="date">
                    작성일 {dateParse(item.createdAt)}
                  </span>
                </div>
              </div>
              <div className="header-right">{postStyleRendering(item)}</div>
            </header>
            <MainWrapper>
              <main>
                <div className="main-title">{item.title}</div>
                <div className="main-content">{item.content}</div>
              </main>
              <div className="image-wrapper">
                {item.imgs.map(
                  (img, imgIdx) =>
                    imgIdx < 2 && <img src={img} key={imgIdx} alt={imgIdx} />
                )}
                {item.imgs.length > 2 && (
                  <div
                    className="more-imgs-number"
                    style={{
                      backgroundImage: `url(${item.imgs[2]})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "7rem",
                        height: "7rem",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                    />
                    <div className="number-overlay">
                      + {item.imgs.length - 2}
                    </div>
                  </div>
                )}
              </div>
            </MainWrapper>
            <footer>
              {item.isHeartClicked ? (
                <FontAwesomeIcon
                  icon={faHeartFull}
                  className="icon heart-full"
                  onClick={(e) => onDeleteHeart(e, item.id, idx)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="icon"
                  onClick={(e) => onAddHeart(e, item.id, idx)}
                />
              )}
              <span>{item.heartCnt}</span>
              <FontAwesomeIcon icon={faMessage} className="icon" />
              <span>{item.commentCnt}</span>
            </footer>
          </Post>
        ))
      ) : (
        <NoneList>게시글이 없습니다.</NoneList>
      )}
      {deletePost !== null && (
        <DeleteWrapper
          onClick={() => {
            setDeletePost(null);
          }}
        >
          <DeleteModal onClick={(e) => e.stopPropagation()}>
            <header>
              <span>글을 삭제하시겠습니까?</span>
            </header>
            <main>
              <div
                className="button"
                onClick={() => {
                  setDeletePost(null);
                }}
              >
                취소
              </div>
              <div className="button" onClick={onDeletePost}>
                삭제
              </div>
            </main>
          </DeleteModal>
        </DeleteWrapper>
      )}
    </>
  );
};

export default PostList;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.5px solid #b3b3b3;
  border-radius: 5px;
  height: 17rem;
  text-decoration: none;
  cursor: pointer;
  header {
    /* background-color: #eeeeee; */
    background-color: #2f5383;
    width: 100%;
    height: 30%;
    border-bottom: 1px solid #b3b3b3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    box-sizing: border-box;
    .header-left {
      display: flex;
      gap: 3rem;
      .img-container {
        background-image: ${(props) =>
          props.img
            ? `url(${props.img})`
            : `url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")`};
        background-size: cover;
        background-color: white;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        border: 1px solid black;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.3rem;
        color: white;
        .name {
          font-size: 1.2rem;
          font-weight: 600;
        }
        .date {
          font-size: 1rem;
          /* color: #4f4f4f; */
        }
      }
    }
    .category {
      font-size: 1.1rem;
      font-weight: 600;
      color: #dedede;
    }
    .icon-wrapper {
      display: flex;
      gap: 1rem;
    }
  }
  main {
    .main-title {
      font-size: 1.1rem;
      font-weight: 700;
    }
  }
  footer {
    display: flex;
    align-items: center;
    height: 20%;
    padding: 0 3rem;
    box-sizing: border-box;
    color: #646464;
    gap: 0.5rem;
    .icon {
      font-size: 1.4rem;
      cursor: pointer;
    }
    span {
      font-size: 1rem;
      margin-right: 1rem;
    }
  }
  .fa-white {
    font-size: 1.4rem;
    color: white;
  }
`;

const MainWrapper = styled.div`
  padding: 2rem 3rem;
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  font-size: 1rem;
  line-height: 1.5rem;
  color: black;
  display: flex;
  justify-content: space-between;
  .image-wrapper {
    display: flex;
    img {
      width: 7rem;
      height: 7rem;
      object-fit: cover;
    }
    .more-imgs-number {
      font-size: 2rem;
      width: 7rem;
      height: 7rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .number-overlay {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 7rem;
      height: 7rem;
      font-weight: 700;
      color: white;
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
