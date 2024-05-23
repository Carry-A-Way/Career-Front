import React from "react";
import SubMenubar from "../../../components/Menubar/SubMenubar";
import ConsultList from "../../../components/List/ConsultList";
import { ConsultListShort } from "../../../components/List/ConsultList";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import { CANCELED_CONSULT_TYPE } from "../../../constants";
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
import { fetchConsultWithStatus } from "../../../api/consult/fetchConsult";

const CanceledConsult = () => {
  const subMenuList = MentorConsultMenu;
  const subMenuLink = MentorConsultLinkList;
  const { data: canceledConsult, isLoading } = useQuery(
    ["consult", CANCELED_CONSULT_TYPE],
    () => fetchConsultWithStatus(CANCELED_CONSULT_TYPE),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[5]}
        // setSubMenu={setSubMenu}
        subMenuLinkList={subMenuLink}
      />
      <TwoColGrid className="two-col-grid__long">
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
                취소된 상담 ({canceledConsult.length})
              </SectionHeader>
              {!!canceledConsult && !canceledConsult.length ? (
                <ConsultWrapper>
                  <span>취소된 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList
                    consultList={canceledConsult}
                    color="#D9D9D9" // 나중에 state 로 바꾸는 게 어떨까..
                    type={CANCELED_CONSULT_TYPE}
                  />
                </ConsultWrapper>
              )}
            </Section>
            <HorizontalLine />
            <Section>
              <ConsultListShort
                consultList={canceledConsult}
                color="#D9D9D9"
                type={CANCELED_CONSULT_TYPE}
              />
            </Section>
          </GridRightCol>
        )}
      </TwoColGrid>
    </>
  );
};

export default CanceledConsult;
