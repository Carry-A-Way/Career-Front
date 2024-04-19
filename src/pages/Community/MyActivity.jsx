import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import PostList from "../../components/List/PostList";
import MyCommentList from "../../components/List/MyCommentList";
import SubMenubar from "../../components/Menubar/SubMenubar";
import { CommunityMenu, CommunityMenuLinkList } from "../../settings/config";
import axios from "axios";
import { SV_LOCAL } from "../../constants";
import { getCookie } from "../../cookie";
import { colors } from "../../styles/common/Theme";
import { ScrollUp } from "../../components/Scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { COMMUNITY_ACTIVITY } from "../../settings/url";
import { fetchWritePosts } from "../../api/myActivity";

const MyActivity = () => {
  const subMenuList = CommunityMenu;
  const subMenuLinkList = CommunityMenuLinkList;
  const [selectMenu, setSelectMenu] = useState(0);
  const menuList = ["작성한 게시글", "좋아요한 게시글", "댓글 목록"];
  const [comments, setComments] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  // useEffect(() => {}, [selectMenu]);

  const navigator = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const option = searchParams.get("option");
  useEffect(() => {
    setSelectMenu(parseInt(option));
  }, [option]);

  const selectedMenuRendering = () => {
    if (selectMenu === 0) {
      return (
        <PostWrapper>
          <div className="selected-menu-header">내가 작성한 게시글</div>
          <PostList posts={myPosts} setPosts={setMyPosts} postStyle="delete" />
        </PostWrapper>
      );
    } else if (selectMenu === 1) {
      return (
        <PostWrapper>
          <div className="selected-menu-header">내가 좋아요 누른 게시글</div>
          <PostList posts={likedPosts} setPosts={setLikedPosts} />
        </PostWrapper>
      );
    } else if (selectMenu === 2) {
      return (
        <PostWrapper>
          <div className="selected-menu-header">내가 남긴 댓글</div>
          <MyCommentList comments={comments} setComments={setComments} />
        </PostWrapper>
      );
    }
  };

  useEffect(() => {
    if (selectMenu === 0) {
      const fetchData = async () => {
        try {
          const data = await fetchWritePosts();
          setMyPosts(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }
  }, [myPosts, selectMenu]);

  useEffect(() => {
    if (selectMenu === 1) {
      axios
        .get(`${SV_LOCAL}/community/heart/my_hearts`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
          params: {
            page: 0,
            size: 10,
          },
        })
        .then((res) => {
          setLikedPosts(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [likedPosts.length, selectMenu]);

  useEffect(() => {
    if (selectMenu === 2) {
      axios
        .get(`${SV_LOCAL}/community/comment/my_comments`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
          params: {
            page: 0,
            size: 10,
          },
        })
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [comments.length, selectMenu]);
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[2]} // 활동 내역
        subMenuLinkList={subMenuLinkList}
      />
      <Form>
        <FormLeft>
          <div className="menu-list">
            {menuList.map((item, idx) => (
              <div
                key={idx}
                className={
                  selectMenu === idx
                    ? "menu-list__item menu-list__item-selected"
                    : "menu-list__item"
                }
                onClick={() =>
                  navigator(`/${COMMUNITY_ACTIVITY}?option=${idx}`)
                }
              >
                {item}
              </div>
            ))}
            {/*댓글 목록이라고 하는 게 좋을지?*/}
          </div>
        </FormLeft>
        {/* <VerticalLine /> */}
        <FormRight>{selectedMenuRendering()}</FormRight>
        <UtilBox>
          <div className="util-item up" onClick={ScrollUp}>
            <FontAwesomeIcon icon={faChevronUp} />
            <span>위로</span>
          </div>
        </UtilBox>
      </Form>
    </>
  );
};

export default MyActivity;

const Form = styled.div`
  height: 70%;
  display: flex;
  margin: 60px 0;
  justify-content: center;
  box-sizing: border-box;
`;

const FormLeft = styled.div`
  min-width: 20rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 6rem;
  margin-top: 2rem;
  .menu-list {
    &__item {
      font-size: 1.4rem;
      padding: 0.8rem;
      border-bottom: 1px solid black;
      cursor: pointer;
    }
    &__item-selected,
    &__item:hover {
      background-color: #f4f4f4;
      font-weight: 600;
    }
  }
`;

const FormRight = styled.div`
  min-width: 50rem;
  max-width: 70rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 8rem;
  border-left: 1px solid #bcbcbc;
`;

const PostWrapper = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 2rem;
  .selected-menu-header {
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
    margin: 1rem 0 2rem;
  }
`;

const UtilBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: fixed;
  bottom: 2rem;
  right: 3rem;
  .util-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    border: 1px solid black;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    padding: 0.7rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
  .up {
    background-color: ${colors.primaryBlue};
    color: white;
  }
`;
