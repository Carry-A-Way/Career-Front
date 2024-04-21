import React, { useEffect, useState } from "react";
import SubMenubar from "../../components/Menubar/SubMenubar";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronUp,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import PostList from "../../components/List/PostList";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SV_LOCAL } from "../../constants";
import { getCookie } from "../../cookie";
import { CommunityMenu, CommunityMenuLinkList } from "../../settings/config";
import { colors } from "../../styles/common/Theme";
import { ScrollUp } from "../../components/Scroll";

const Community = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchKeyword = queryParams.get("search");

  const subMenuList = CommunityMenu;
  const subMenuLinkList = CommunityMenuLinkList;
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/community?search=${searchInput}`);
    const fetchSearchData = async () => {
      try {
        const response = await axios.get(`${SV_LOCAL}/search/community`, {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
          params: {
            keyWord: searchInput,
            page: 0,
            size: 10,
          },
        });
        setPosts([...response.data]);
      } catch (e) {
        console.error(e);
      }
    };
    fetchSearchData();
  };

  useEffect(() => {
    if (searchKeyword) {
      const fetchSearchData = async () => {
        try {
          const response = await axios.get(`${SV_LOCAL}/search/community`, {
            headers: {
              Authorization: `Bearer ${getCookie("jwtToken")}`,
            },
            params: {
              keyWord: searchKeyword,
              page: 0,
              size: 10,
            },
          });
          setPosts([...response.data]);
          setSearchInput(searchKeyword);
        } catch (e) {
          console.error(e);
        }
      };
      fetchSearchData();
    } else {
      const fetchPostData = async () => {
        try {
          const response = await axios.get(
            `${SV_LOCAL}/community/article/all`,
            {
              headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${getCookie("jwtToken")}`,
              },
              params: {
                page: 0,
                size: 10,
              },
            }
          );
          setPosts([...response.data]);
          setSearchInput("");
        } catch (err) {
          console.error(err);
        }
      };
      fetchPostData();
    }
  }, [searchKeyword]);
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[0]} // 전체보기
        subMenuLinkList={subMenuLinkList}
      />
      <Form>
        <Section>
          <Search onSubmit={submitSearch}>
            <span>키워드 검색</span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="glass-icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </Search>
          <Wrapper>
            <PostList posts={posts} setPosts={setPosts} postStyle="category" />
          </Wrapper>
          <UtilBox>
            <Link className="util-item write" to={"/community/write"}>
              <FontAwesomeIcon icon={faPencil} />
              <span>글쓰기</span>
            </Link>
            <div className="util-item up" onClick={ScrollUp}>
              <FontAwesomeIcon icon={faChevronUp} />
              <span>위로</span>
            </div>
          </UtilBox>
        </Section>
      </Form>
    </>
  );
};

export default Community;

const Form = styled.div`
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

const Search = styled.form`
  display: flex;
  flex-direction: row;
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
    padding: 0 5px;
  }
  .glass-icon {
    background-color: #2f5383;
    padding: 0.6rem 1rem;
    font-size: 1.2rem;
    color: white;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
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
