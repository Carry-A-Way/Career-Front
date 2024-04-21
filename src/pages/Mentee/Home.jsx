import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import HorizontalLine from "../../components/Line/HorizontalLine";
import EventList from "../../components/List/EventList";
import { colors } from "../../styles/common/Theme";
import SuggestionMentor from "../../components/List/SuggestionMentor";
import PopularMentorList from "../../components/List/PopularMentorList";
import { MenteeHeader } from "../../styles/common/mentee/MenteeForm";
import { GridRightCol, TwoColGrid } from "../../styles/common/Layout";
import MenteeLeftForm from "../../components/MenteeLeftForm";
const Home = () => {
  return (
    <TwoColGrid>
      <MenteeLeftForm />
      {/* <VerticalLine /> */}
      <GridRightCol>
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
          <SuggestionMentor />
        </Wrapper>
        <LineGap>
          <HorizontalLine />
        </LineGap>
        <Wrapper>
          <PopularMentorList />
        </Wrapper>
      </GridRightCol>
    </TwoColGrid>
  );
};

export default Home;

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
