import React from "react";
import {
  MenteeMentorLinkList,
  MenteeMentorMenu,
  RecommendMentors,
} from "../../settings/config";
import SubMenubar from "../../components/Menubar/SubMenubar";
import styled from "styled-components";
import MentorDetailCard from "../../components/Card/MentorDetailCard";
import MentorCard from "../../components/Card/MentorCard";
import { xScrollStyle } from "../../styles/common/Scroll";
import { MenteeHeader } from "../../styles/common/mentee/MenteeForm";
import { ButtonDiv } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import HorizontalLine from "../../components/Line/HorizontalLine";
import { useQuery } from "react-query";
import { fetchHeartMentorList } from "../../api/heartMentor";
import { colors } from "../../styles/common/Theme";

const MyMentor = () => {
  const subMenuList = MenteeMentorMenu;
  const subMenuLinkList = MenteeMentorLinkList;
  const subMenu = subMenuList[2];
  const navigate = useNavigate();

  const {
    data: heartMentorList,
    isLoading,
    refetch,
  } = useQuery("heart-mentor", () => fetchHeartMentorList(), {
    refetchOnWindowFocus: false,
  });
  const noMentorMessage = "좋아요 누른 멘토가 없습니다.";
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenu}
        subMenuLinkList={subMenuLinkList}
      />
      <StyledLayout>
        <ListContainer>
          <MenteeHeader>내가 찜한 멘토</MenteeHeader>
          {isLoading ? (
            <div>loading...</div>
          ) : !!heartMentorList &&
            heartMentorList.length &&
            heartMentorList !== noMentorMessage ? (
            <>
              <MentorWrapper>
                {heartMentorList.map((mentor) => (
                  <MentorCard mentor={mentor} refetch={refetch} />
                ))}
              </MentorWrapper>
              <div className="button-wrapper">
                <ButtonDiv onClick={() => navigate("/mentee/mentor/like")}>
                  찜한 멘토 더 보러가기
                </ButtonDiv>
              </div>
            </>
          ) : (
            <NoList>
              <div>찜한 멘토가 없습니다.</div>
            </NoList>
          )}
        </ListContainer>
        <HorizontalLine />
        <ListContainer>
          <MenteeHeader>상담이 예정된 멘토</MenteeHeader>
          {RecommendMentors && RecommendMentors.length ? (
            <>
              <MentorWrapper>
                {RecommendMentors.map((mentor, idx) => (
                  <MentorDetailCard mentor={mentor} key={idx} />
                ))}
              </MentorWrapper>
              <div className="button-wrapper">
                <ButtonDiv onClick={() => navigate("/mentee/mentor/consult")}>
                  상담 멘토 더 보러가기
                </ButtonDiv>
              </div>
            </>
          ) : (
            <NoList>
              <div>상담 멘토가 없습니다.</div>
            </NoList>
          )}
        </ListContainer>
      </StyledLayout>
    </>
  );
};

export default MyMentor;

const StyledLayout = styled.div`
  width: 80rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 4rem auto;
  gap: 5rem;
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
`;

const ListContainer = styled.div`
  width: 100%;
`;

const MentorWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  gap: 2rem;
  overflow: auto;
  ${xScrollStyle}
  padding: 1rem 2rem;
  box-sizing: border-box;
  background-color: #eaeaea;
  border-radius: 10px;
`;

const NoList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.3rem;
  color: ${colors.gray};
  height: 15rem;
`;
