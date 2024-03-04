import React from "react";
import SubMenubar from "../../../components/Menubar/SubMenubar";
import RecommendMenteeItem from "../../../components/List/RecommendMenteeItem";
import ConsultList from "../../../components/List/ConsultList";
import { ConsultListShort } from "../../../components/List/ConsultList";
import HorizontalLine from "../../../components/Line/HorizontalLine";
// import useGetUpcomingConsult from "../../../hooks/consult/useGetUpcomingConsult";
import { UPCOMING_CONSULT_TYPE } from "../../../constants";
import {
  MentorConsultLinkList,
  MentorConsultMenu,
  RecommendMenteeList,
} from "../../../settings/config";
import {
  GridLeftCol,
  GridRightCol,
  TwoColGrid,
} from "../../../styles/common/Layout";
import {
  ConsultWrapper,
  RecommendWrapper,
  Section,
  SectionHeader,
} from "../../../styles/common/mentor/MentorForm";
import { useQuery } from "react-query";
import { fetchMentorConsultWithStatus } from "../../../api/fetchConsult";

const UpcomingConsult = () => {
  const subMenuList = MentorConsultMenu;
  const subMenuLink = MentorConsultLinkList;
  const { data: upcomingConsult, isLoading } = useQuery(
    ["consult", UPCOMING_CONSULT_TYPE],
    () => fetchMentorConsultWithStatus(UPCOMING_CONSULT_TYPE),
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[2]}
        // setSubMenu={setSubMenu}
        subMenuLinkList={subMenuLink}
      />
      <TwoColGrid>
        <GridLeftCol>
          <SectionHeader>추천 학생</SectionHeader>
          <RecommendWrapper>
            <RecommendMenteeItem recommendList={RecommendMenteeList} />
          </RecommendWrapper>
        </GridLeftCol>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <GridRightCol>
            <Section>
              <SectionHeader>
                예정된 상담 ({upcomingConsult.length})
              </SectionHeader>
              {upcomingConsult && !upcomingConsult.length ? (
                <ConsultWrapper>
                  <span>진행될 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList
                    consultList={upcomingConsult}
                    type={UPCOMING_CONSULT_TYPE}
                  />
                </ConsultWrapper>
              )}
            </Section>
            <HorizontalLine />
            <Section>
              <ConsultListShort
                consultList={upcomingConsult}
                type={UPCOMING_CONSULT_TYPE}
              />
            </Section>
          </GridRightCol>
        )}
      </TwoColGrid>
    </>
  );
};

export default UpcomingConsult;
