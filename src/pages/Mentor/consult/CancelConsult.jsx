import React from "react";
import SubMenubar from "../../../components/Menubar/SubMenubar";
import ConsultList from "../../../components/List/ConsultList";
import { ConsultListShort } from "../../../components/List/ConsultList";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import { CANCEL_CONSULT_TYPE } from "../../../constants";
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
import { useQuery } from "react-query";
import { fetchMentorConsultWithStatus } from "../../../api/fetchConsult";

const CancelConsult = () => {
  const subMenuList = MentorConsultMenu;
  const subMenuLink = MentorConsultLinkList;
  const { data: cancelConsult, isLoading } = useQuery(
    ["consult", CANCEL_CONSULT_TYPE],
    () => fetchMentorConsultWithStatus(CANCEL_CONSULT_TYPE),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[4]}
        // setSubMenu={setSubMenu}
        subMenuLinkList={subMenuLink}
      />
      <TwoColGrid className="two-col-grid__long">
        <GridLeftCol>
          <SectionHeader>추천 학생</SectionHeader>
          <RecommendMentee />
        </GridLeftCol>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <GridRightCol>
            <Section>
              <SectionHeader>
                취소한 상담 ({cancelConsult.length})
              </SectionHeader>
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
        )}
      </TwoColGrid>
    </>
  );
};

export default CancelConsult;
