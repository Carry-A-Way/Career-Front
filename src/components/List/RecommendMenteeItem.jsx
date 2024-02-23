import React from "react";
import styled from "styled-components";

const RecommendMenteeItem = ({ recommendList }) => {
  return (
    <>
      {recommendList.map((item, i) => {
        return (
          <RecommendContainer key={i}>
            <span className="title">{item.title}</span>
            <hr style={{ color: "black", width: "100%" }} />
            <Content>
              <span className="name">이름: {item.name}</span>
              <span className="grade">학년: {item.grade}</span>
              <span className="date">작성일: {item.date}</span>
              <span className="interest">관심 학과: {item.interest}</span>
            </Content>
            <Button>게시물 바로가기</Button>
          </RecommendContainer>
        );
      })}
    </>
  );
};

export default RecommendMenteeItem;

const RecommendContainer = styled.div`
  .title {
    font-size: 1.5rem;
  }
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2rem;
  border: 1px solid black;
  border-radius: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  color: #4a4a4a;
  gap: 10px;
`;

const Button = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-top: 10px;
`;
