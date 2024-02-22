import React from "react";
import styled from "styled-components";
import PointBox from "../../components/Box/PointBox";
import MoveBox from "../../components/Box/MoveBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAngleRight,
  faCalendar,
  faTicket,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import HorizontalLine from "../../components/Line/HorizontalLine";
import EventList from "../../components/List/EventList";
import { colors } from "../../styles/common/Theme";
import RecommendMentorList from "../../components/List/RecommendMentorList";
import PopularMentorList from "../../components/List/PopularMentorList";
import { MenteeHeader } from "../../styles/common/mentee/MenteeForm";
const Home = () => {
  const userName = "김성애";

  return (
    <Form>
      <FormLeft>
        <Wrapper>
          <NameDiv>
            <span>{userName}</span>님 반갑습니다!
          </NameDiv>
        </Wrapper>
        <PointBox point="10,000" />
        <MoveBox>
          <div>
            <FontAwesomeIcon icon={faUser} />
            <span>친구 초대하기</span>
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
        </MoveBox>
        <MoveBox>
          <div>
            <FontAwesomeIcon icon={faCalendar} />
            <span>상담 예약하기</span>
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
        </MoveBox>
        <MoveBox>
          <div>
            <FontAwesomeIcon icon={faTicket} />
            <span>이용권 구매하기</span>
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
        </MoveBox>
      </FormLeft>
      {/* <VerticalLine /> */}
      <FormRight>
        <Wrapper>
          <EventList />
        </Wrapper>
        <LineGap>
          <HorizontalLine />
        </LineGap>
        <Wrapper>
          <MenteeHeader>Carry-A-Way 가 처음이라면?</MenteeHeader>
          <About>
            <div>
              <span>Carry-A-Way 이용방법 알아보기</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div>
              <span>멘토 추천받기</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div>
              <span>멘토 찜하기</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div>
              <span>커뮤니티 바로가기</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </About>
        </Wrapper>
        <LineGap>
          <HorizontalLine />
        </LineGap>
        <Wrapper>
          <RecommendMentorList />
        </Wrapper>
        <LineGap>
          <HorizontalLine />
        </LineGap>
        <Wrapper>
          <PopularMentorList />
        </Wrapper>
      </FormRight>
    </Form>
  );
};

export default Home;

const Form = styled.div`
  height: 70%;
  display: flex;
  margin: 60px 0;
  justify-content: center;
  box-sizing: border-box;
`;

const FormLeft = styled.div`
  min-width: 20rem;
  height: 73vh;
  min-height: 50rem;
  display: flex;
  flex-direction: column;
  margin: 0 6rem;
  margin-top: 2rem;
`;

const FormRight = styled.div`
  width: 57rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 6rem;
  border-left: 1px solid #bcbcbc;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  .header {
    margin: 3rem;
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.primaryBlue};
  }
  .notice {
    width: 100%;
    text-align: end;
    font-size: 1.1rem;
    color: #334b6c;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .button-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
`;

const NameDiv = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  width: 100%;
  span {
    font-size: 2rem;
    font-weight: 600;
    color: #334b6c;
    padding-right: 1rem;
  }
`;

const About = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  div {
    padding: 20px 30px;
    background-color: white;
    color: ${colors.primaryBlue};
    border: 1px solid ${colors.primaryBlue};
    font-size: 1.3rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 50px;
    &:hover {
      background-color: #44638c;
      color: white;
    }
    span {
      width: 90%;
      text-align: center;
    }
  }
`;

const LineGap = styled.div`
  width: 100%;
  margin: 2rem 0;
`;
