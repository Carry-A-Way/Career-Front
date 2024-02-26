import React from "react";
import SubMenubar from "../../../components/Menubar/SubMenubar";
import styled from "styled-components";
import ConsultList from "../../../components/List/ConsultList";
import { ConsultListShort } from "../../../components/List/ConsultList";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import useGetCompletedConsult from "../../../hooks/useGetCompletedConsult";
import { COMPLETED_CONSULT_TYPE } from "../../../constants";
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

const CompletedConsult = () => {
  const subMenuList = MentorConsultMenu;
  const subMenuLink = MentorConsultLinkList;
  const { completedConsult } = useGetCompletedConsult();

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[2]}
        subMenuLinkList={subMenuLink}
      />
      <TwoColGrid>
        <GridLeftCol>
          <SectionHeader>추천 학생</SectionHeader>
          <RecommendMentee />
        </GridLeftCol>
        <GridRightCol>
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
      </TwoColGrid>
    </>
  );
};

export default CompletedConsult;
