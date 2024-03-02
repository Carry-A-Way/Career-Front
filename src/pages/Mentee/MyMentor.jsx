import React from "react";
import {
  MenteeMentorLinkList,
  MenteeMentorMenu,
  RecommendMentors,
} from "../../settings/config";
import SubMenubar from "../../components/Menubar/SubMenubar";
import styled from "styled-components";
import MentorDetailCard from "../../components/List/MentorDetailCard";
import MentorCard from "../../components/List/MentorCard";
import { xScrollStyle } from "../../styles/common/Scroll";
import { MenteeHeader } from "../../styles/common/mentee/MenteeForm";
import { ButtonDiv } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import HorizontalLine from "../../components/Line/HorizontalLine";
import { useQuery } from "react-query";
import { fetchHeartMentorList } from "../../api/heartMentor";

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
          ) : heartMentorList && heartMentorList.length ? (
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
                {RecommendMentors.map((mentor) => (
                  <MentorDetailCard mentor={mentor} />
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
  align-items: center;
  gap: 1.5rem;
  font-size: 1.2rem;
  margin: 3rem 0;
`;
