import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostList from "../../components/List/PostList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../cookie";
import { SV_LOCAL } from "../../constants";
import { CommunityCategoryList } from "../../settings/config";
import { colors } from "../../styles/common/Theme";
import { ScrollUp } from "../../components/Scroll";

const CategoryPost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${SV_LOCAL}/community/article/all_category`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
        params: {
          categoryId: id,
          page: 0,
          size: 10,
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);
  return (
    <PostWrapper>
      <Section>
        <Search>
          <span>{CommunityCategoryList[id].title} 게시판</span>
        </Search>
        <Wrapper>
          <PostList posts={posts} setPosts={setPosts} postStyle="category" />
        </Wrapper>
        <UtilBox>
          <Link
            className="util-item write"
            // onClick={() => setIsWrite(true)}
            to={"/community/write"}
          >
            <FontAwesomeIcon icon={faPencil} />
            <span>글쓰기</span>
          </Link>
          <div className="util-item up" onClick={ScrollUp}>
            <FontAwesomeIcon icon={faChevronUp} />
            <span>위로</span>
          </div>
        </UtilBox>
      </Section>
    </PostWrapper>
  );
};

export default CategoryPost;

const PostWrapper = styled.div`
  height: 70%;
  display: flex;
  margin: 60px 0;
  justify-content: center;
  box-sizing: border-box;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  .header {
    margin: 50px 0;
    font-size: 2rem;
    font-weight: 600;
    color: ${colors.primaryBlue};
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 5rem;
  span {
    font-size: 1.7rem;
    font-weight: 600;
  }
  input {
    width: 30rem;
    height: 2.2rem;
    border: 1px solid black;
    border-radius: 3px;
  }
  .glass-icon {
    background-color: #2f5383;
    padding: 0.7rem 1rem;
    font-size: 1.2rem;
    color: white;
    border-radius: 5px;
  }
`;

const Wrapper = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  .write {
    background-color: #eaeaea;
    text-decoration: none;
    color: black;
  }
  .up {
    background-color: ${colors.primaryBlue};
    color: white;
  }
`;
