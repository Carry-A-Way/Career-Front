import React from "react";
import SubMenubar from "../../components/Menubar/SubMenubar";
import HorizontalLine from "../../components/Line/HorizontalLine";
import { MenteeMentorLinkList, MenteeMentorMenu } from "../../settings/config";
import RecommendMentorList from "../../components/List/RecommendMentorList";
import PopularMentorList from "../../components/List/PopularMentorList";
import { GridRightCol, TwoColGrid } from "../../styles/common/Layout";
import MenteeLeftForm from "../../components/MenteeLeftForm";
import styled from "styled-components";
const Mentor = () => {
  const subMenuList = MenteeMentorMenu;
  const subMenuLinkList = MenteeMentorLinkList;
  const subMenu = subMenuList[0];
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[0]}
        subMenuLinkList={subMenuLinkList}
      />
      <TwoColGrid>
        <MenteeLeftForm />
        <GridRightCol>
          {subMenu === subMenuList[0] ? (
            <>
              <ListWrapper>
                <PopularMentorList />
              </ListWrapper>
              <LineGap>
                <HorizontalLine />
              </LineGap>
              <ListWrapper>
                <RecommendMentorList />
              </ListWrapper>
            </>
          ) : (
            ""
          )}
        </GridRightCol>
      </TwoColGrid>
    </>
  );
};

export default Mentor;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const LineGap = styled.div`
  width: 100%;
  margin: 4rem 0;
`;
