import React from "react";
import SubMenubar from "../../../components/Menubar/SubMenubar";
import RecommendMenteeItem from "../../../components/List/RecommendMenteeItem";
import ConsultList from "../../../components/List/ConsultList";
import { ConsultListShort } from "../../../components/List/ConsultList";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import useGetUpcomingConsult from "../../../hooks/useGetUpcomingConsult";
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

const UpcomingConsult = () => {
  const subMenuList = MentorConsultMenu;
  const subMenuLink = MentorConsultLinkList;
  const { upcomingConsult } = useGetUpcomingConsult();

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[1]}
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
        <GridRightCol>
          <Section>
            <SectionHeader>
              진행 예정된 상담 ({upcomingConsult.length})
            </SectionHeader>
            {!upcomingConsult.length ? (
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
      </TwoColGrid>
    </>
  );
};

export default UpcomingConsult;
