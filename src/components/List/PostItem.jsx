import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileImage from "../Image/ProfileImage";
import { dateParse } from "../../utils/ParseFormat";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
const PostItem = ({ item, idx }) => {
  const navigate = useNavigate();

  // const onAddHeart = (e, id, idx) => {
  //     e.stopPropagation();
  //     axios
  //       .post(
  //         `${SV_LOCAL}/community/heart/add`,
  //         { typeId: id, type: 0 },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${getCookie("jwtToken")}`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         const updatedPost = [...posts];
  //         updatedPost[idx] = {
  //           ...updatedPost[idx],
  //           heartCnt: updatedPost[idx].heartCnt + 1,
  //           isHeartClicked: true,
  //         };
  //         setPosts(updatedPost);
  //       })
  //       .catch((err) => console.error(err));
  //   };

  //   const onDeleteHeart = (e, id, idx) => {
  //     e.stopPropagation();

  //     axios
  //       .delete(
  //         `${SV_LOCAL}/community/heart/delete`,

  //         {
  //           headers: {
  //             Authorization: `Bearer ${getCookie("jwtToken")}`,
  //           },

  //           data: { typeId: id, type: 0 },
  //         }
  //       )
  //       .then((res) => {
  //         const updatedPost = [...posts];
  //         updatedPost[idx] = {
  //           ...updatedPost[idx],
  //           heartCnt: updatedPost[idx].heartCnt - 1,
  //           isHeartClicked: false,
  //         };
  //         setPosts(updatedPost);
  //       })
  //       .catch((err) => console.error(err));
  //   };
  return (
    <Post
      img={item.user.profileImg}
      onClick={() => {
        navigate(`/community/post/${item.id}`);
      }}
    >
      <header>
        <div className="header-left">
          <ProfileImage profileImg={item.user.profileImg} />
          <div className="info">
            <span className="name">
              {item.user.nickname || "익명"} (
              {item.user.isTutor ? "멘토" : "멘티"})
            </span>
            <span className="date">작성일 {dateParse(item.createdAt)}</span>
          </div>
        </div>
        {/* <div className="header-right">{postStyleRendering(item)}</div> */}
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
              <div className="number-overlay">+ {item.imgs.length - 2}</div>
            </div>
          )}
        </div>
      </MainWrapper>
      <footer>
        {item.isHeartClicked ? (
          <FontAwesomeIcon
            icon={faHeartFull}
            className="icon heart-full"
            // onClick={(e) => onDeleteHeart(e, item.id, idx)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faHeart}
            className="icon"
            // onClick={(e) => onAddHeart(e, item.id, idx)}
          />
        )}
        <span>{item.heartCnt}</span>
        <FontAwesomeIcon icon={faMessage} className="icon" />
        <span>{item.commentCnt}</span>
      </footer>
    </Post>
  );
};

export default PostItem;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.5px solid #b3b3b3;
  border-radius: 5px;
  /* width: 35rem; */
  min-width: 35rem;
  /* height: 100%; */
  /* box-sizing: border-box; */
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
      font-size: 1.3rem;
      font-weight: 600;
      color: #fee501;
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
