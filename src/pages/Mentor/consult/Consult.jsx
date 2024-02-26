import React from "react";
import styled from "styled-components";
import ConsultList from "../../../components/List/ConsultList";
// import { ConsultListShort } from "../../../components/List/ConsultList";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import useGetConsult from "../../../hooks/useGetConsult";
import SubMenubar from "../../../components/Menubar/SubMenubar";
import useGetCompletedConsult from "../../../hooks/useGetCompletedConsult";
import useGetCancelConsult from "../../../hooks/useGetCancelConsult";
import {
  CANCEL_CONSULT_TYPE,
  COMPLETED_CONSULT_TYPE,
  UPCOMING_CONSULT_TYPE,
} from "../../../constants";
import { xScrollStyle } from "../../../styles/common/Scroll";
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
  Section,
  SectionHeader,
} from "../../../styles/common/mentor/MentorForm";
import RecommendMentee from "../RecommendMentee";

const Consult = () => {
  const subMenuList = MentorConsultMenu;
  const subMenuLink = MentorConsultLinkList;
  const { upcomingConsult } = useGetConsult();
  const { completedConsult } = useGetCompletedConsult();
  const { cancelConsult } = useGetCancelConsult();

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[0]}
        // setSubMenu={setSubMenu}
        subMenuLinkList={subMenuLink}
      />
      <TwoColGrid>
        <GridLeftCol>
          <SectionHeader>추천 학생</SectionHeader>
          <RecommendMentee longHeight={true} />
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
            <SectionHeader>
              완료된 상담 ({completedConsult.length})
            </SectionHeader>
            {!completedConsult.length ? (
              <ConsultWrapper>
                <span>완료된 상담이 없습니다.</span>
              </ConsultWrapper>
            ) : (
              <ConsultWrapper>
                <ConsultList
                  consultList={completedConsult}
                  color="#D9D9D9"
                  type={COMPLETED_CONSULT_TYPE}
                />
              </ConsultWrapper>
            )}
          </Section>
          <HorizontalLine />
          <Section>
            <SectionHeader>취소한 상담 ({cancelConsult.length})</SectionHeader>
            {!cancelConsult.length ? (
              <ConsultWrapper>
                <span>취소한 상담이 없습니다.</span>
              </ConsultWrapper>
            ) : (
              <ConsultWrapper>
                <ConsultList
                  consultList={cancelConsult}
                  color="#D9D9D9"
                  type={CANCEL_CONSULT_TYPE}
                />
              </ConsultWrapper>
            )}
          </Section>
        </GridRightCol>
      </TwoColGrid>
      {}
    </>
  );
};

export default Consult;
