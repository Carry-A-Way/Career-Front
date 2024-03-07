import React from "react";
import ConsultList from "../../../components/List/ConsultList";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import SubMenubar from "../../../components/Menubar/SubMenubar";
import {
  CANCELED_CONSULT_TYPE,
  CANCEL_CONSULT_TYPE,
  COMPLETED_CONSULT_TYPE,
  PENDING_CONSULT_TYPE,
  UPCOMING_CONSULT_TYPE,
} from "../../../constants";
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
import {
  fetchUserConsult,
  fetchConsultWithStatus,
} from "../../../api/fetchConsult";

const Consult = () => {
  const subMenuList = MentorConsultMenu;
  const subMenuLink = MentorConsultLinkList;
  // const { upcomingConsult } = useGetConsult();
  // const { completedConsult } = useGetCompletedConsult();
  // const { cancelConsult } = useGetCancelConsult();
  const { data, isLoading } = useQuery("consult", () => fetchUserConsult(), {
    refetchOnWindowFocus: false,
  });
  const { data: cancelConsult } = useQuery(
    ["consult", CANCEL_CONSULT_TYPE],
    () => fetchConsultWithStatus(CANCEL_CONSULT_TYPE),
    {
      refetchOnWindowFocus: false,
    }
  );
  // console.log(cancelConsult);
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
          <RecommendWrapper className="recommend-wrapper__long">
            <RecommendMenteeList />
          </RecommendWrapper>
        </GridLeftCol>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <GridRightCol>
            <Section>
              <SectionHeader>
                수락전 상담 ({data.lastUpcomingConsult.length})
              </SectionHeader>
              {!!data?.lastUpcomingConsult &&
              !data.lastUpcomingConsult.length ? (
                <ConsultWrapper>
                  <span>수락 대기중인 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList
                    consultList={data.lastUpcomingConsult}
                    type={PENDING_CONSULT_TYPE}
                  />
                </ConsultWrapper>
              )}
            </Section>
            <HorizontalLine />
            <Section>
              <SectionHeader>
                예정된 상담 ({data.upcomingConsult.length})
              </SectionHeader>
              {!data.upcomingConsult.length ? (
                <ConsultWrapper>
                  <span>진행될 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList
                    consultList={data.upcomingConsult}
                    type={UPCOMING_CONSULT_TYPE}
                  />
                </ConsultWrapper>
              )}
            </Section>
            <HorizontalLine />
            <Section>
              <SectionHeader>
                완료된 상담 ({data.previousConsult.length})
              </SectionHeader>
              {!data.previousConsult.length ? (
                <ConsultWrapper>
                  <span>완료된 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList
                    consultList={data.previousConsult}
                    color="#D9D9D9"
                    type={COMPLETED_CONSULT_TYPE}
                  />
                </ConsultWrapper>
              )}
            </Section>
            <HorizontalLine />
            <Section>
              <SectionHeader>
                취소한 상담 ({data.canceledConsultByMentor.length})
              </SectionHeader>
              {!data.canceledConsultByMentor.length ? (
                <ConsultWrapper>
                  <span>취소한 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList
                    consultList={data.canceledConsultByMentor}
                    color="#D9D9D9"
                    type={CANCEL_CONSULT_TYPE}
                  />
                </ConsultWrapper>
              )}
            </Section>
            <HorizontalLine />
            <Section>
              <SectionHeader>
                취소된 상담 ({data.canceledConsultByMentee.length})
              </SectionHeader>
              {!data.canceledConsultByMentee.length ? (
                <ConsultWrapper>
                  <span>취소한 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList
                    consultList={data.canceledConsultByMentee}
                    color="#D9D9D9"
                    type={CANCELED_CONSULT_TYPE}
                  />
                </ConsultWrapper>
              )}
            </Section>
          </GridRightCol>
        )}
      </TwoColGrid>
    </>
  );
};

export default Consult;
