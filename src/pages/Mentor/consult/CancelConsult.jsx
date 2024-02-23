import React from "react";
import SubMenubar from "../../../components/Menubar/SubMenubar";
import styled from "styled-components";
import ConsultList from "../../../components/List/ConsultList";
import { ConsultListShort } from "../../../components/List/ConsultList";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import useGetCancelConsult from "../../../hooks/useGetCancelConsult";
import { CANCEL_CONSULT_TYPE } from "../../../constants";
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
  Section,
  SectionHeader,
} from "../../../styles/common/mentor/MentorForm";
import RecommendMentee from "../RecommendMentee";

const CancelConsult = () => {
  const subMenuList = MentorConsultMenu;
  const subMenuLink = MentorConsultLinkList;
  const { cancelConsult } = useGetCancelConsult();

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[3]}
        // setSubMenu={setSubMenu}
        subMenuLinkList={subMenuLink}
      />
      <TwoColGrid className="two-col-grid__long">
        <GridLeftCol>
          <RecommendMentee />
        </GridLeftCol>
        <GridRightCol>
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
                  color="#D9D9D9" // 나중에 state 로 바꾸는 게 어떨까..
                  type={CANCEL_CONSULT_TYPE}
                />
              </ConsultWrapper>
            )}
          </Section>
          <HorizontalLine />
          <Section>
            <ConsultListShort
              consultList={cancelConsult}
              color="#D9D9D9"
              type={CANCEL_CONSULT_TYPE}
            />
          </Section>
        </GridRightCol>
      </TwoColGrid>
    </>
  );
};

export default CancelConsult;

const ConsultWrapper = styled.div`
  width: 100%;
  min-height: 20rem;
  height: 26vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.3rem;
  color: #909090;
  position: relative;
  margin-top: 2rem;
  overflow-x: auto;
  ${xScrollStyle}
  > span {
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
  }
`;
