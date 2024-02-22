import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarFull } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const LikeList = () => {
  const [likeList, setLikeList] = useState([
    {
      idx: 0,
      title: "화학과 가고 싶은데.. 활동 고민이에요..",
      content:
        "화학화 너무 가고 싶은데 한 활동이 아무것도 없어요. 어디서 어떤 활동을 시작해야 할까요? 입시때 힘들 것 같아서 걱정입니다.",
      like: true,
    },
    {
      idx: 1,
      title: "컴공과 가고 싶은데.. 활동 고민이에요..",
      content: "제가 수학을 못해요..",
      like: true,
    },
    {
      idx: 2,
      title: "도와주세요ㅠㅠ",
      content: "전자과랑 기계과 중에 고민입니다.",
      like: true,
    },
    {
      idx: 3,
      title: "예체능 상담해주실 선생님 없나요?",
      content:
        "안녕하세요. 고등학교 2학년 학생입니다. 미대에 가고 싶은데 돈이 많이 들어서 부모님이 반대해요. ",
      like: true,
    },
  ]);
  const likeToggle = (i) => {
    setLikeList(likeList.filter((a) => a.idx !== i));
  };
  return (
    <LikeWrapper>
      {likeList.map((item) => {
        return (
          <LikeContainer key={item.idx}>
            <header>
              <span>{item.title}</span>
              <FontAwesomeIcon
                icon={faStarFull}
                onClick={() => likeToggle(item.idx)}
              />
            </header>
            <main>{item.content}</main>
            <footer>
              <span>게시물 보기</span>
              <FontAwesomeIcon icon={faAngleRight} />
            </footer>
          </LikeContainer>
        );
      })}
    </LikeWrapper>
  );
};

export default LikeList;

const LikeWrapper = styled.div`
  height: 30rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  padding: 20px 0;
`;
const LikeContainer = styled.div`
  width: 40rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
  padding: 20px;
  border-radius: 10px;
  background-color: #eaeaea;
  margin: 0.5rem 0;
  header {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    font-size: 1.4rem;
    span {
      font-weight: 600;
    }
  }
  main {
    width: 100%;
    height: 30%;
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px 0;
  }
  footer {
    width: 100%;
    height: 30%;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span {
      margin-right: 10px;
    }
  }
`;
