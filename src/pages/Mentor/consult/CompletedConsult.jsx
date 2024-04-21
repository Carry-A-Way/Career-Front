import React from "react";
import SubMenubar from "../../../components/Menubar/SubMenubar";
import ConsultList from "../../../components/List/ConsultList";
import { ConsultListShort } from "../../../components/List/ConsultList";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import { COMPLETED_CONSULT_TYPE } from "../../../constants";
import {
  MentorConsultLinkList,
  MentorConsultMenu,
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
import RecommendMenteeList from "../../../components/List/Recommend/RecommendMenteeList";
import { useQuery } from "react-query";
import { fetchConsultWithStatus } from "../../../api/fetchConsult";

const CompletedConsult = () => {
  const subMenuList = MentorConsultMenu;
  const subMenuLink = MentorConsultLinkList;
  const { data: completedConsult, isLoading } = useQuery(
    ["consult", COMPLETED_CONSULT_TYPE],
    () => fetchConsultWithStatus(COMPLETED_CONSULT_TYPE),
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[3]}
        subMenuLinkList={subMenuLink}
      />
      <TwoColGrid>
        <GridLeftCol>
          <SectionHeader>추천 학생</SectionHeader>
          <RecommendWrapper>
            <RecommendMenteeList />
          </RecommendWrapper>
        </GridLeftCol>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <GridRightCol>
            <Section>
              <SectionHeader>
                완료된 상담 ({completedConsult.length})
              </SectionHeader>
              {!!completedConsult && !completedConsult.length ? (
                <ConsultWrapper>
                  <span>완료된 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList
                    consultList={completedConsult}
                    color="#D9D9D9" // 나중에 state 로 바꾸는 게 어떨까..
                    type={COMPLETED_CONSULT_TYPE}
                  />
                </ConsultWrapper>
              )}
            </Section>
            <HorizontalLine />
            <Section>
              <ConsultListShort
                consultList={completedConsult}
                color="#D9D9D9"
                type={COMPLETED_CONSULT_TYPE}
              />
            </Section>
          </GridRightCol>
        )}
      </TwoColGrid>
    </>
  );
};

export default CompletedConsult;
