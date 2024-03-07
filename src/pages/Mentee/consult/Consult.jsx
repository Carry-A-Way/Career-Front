import styled from "styled-components";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import ConsultList from "../../../components/List/ConsultList";
import RecommendMentorList from "../../../components/List/Recommend/RecommendMentorList";
import SubMenubar from "../../../components/Menubar/SubMenubar";
import {
  CANCEL_CONSULT_TYPE,
  COMPLETED_CONSULT_TYPE,
  PENDING_CONSULT_TYPE,
  UPCOMING_CONSULT_TYPE,
} from "../../../constants";
import {
  MenteeConsultLinkList,
  MenteeConsultMenu,
} from "../../../settings/config";
import {
  GridLeftCol,
  GridRightCol,
  TwoColGrid,
} from "../../../styles/common/Layout";
import {
  ConsultWrapper,
  MentorRecommendWrapper,
  Section,
  SectionHeader,
} from "../../../styles/common/mentor/MentorForm";
import { useQuery } from "react-query";
import { fetchUserConsult } from "../../../api/fetchConsult";

const MenteeConsult = () => {
  const subMenuList = MenteeConsultMenu;
  const subMenuLink = MenteeConsultLinkList;
  const { data, isLoading } = useQuery("consult", () => fetchUserConsult(), {
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[0]}
        subMenuLinkList={subMenuLink}
      />
      <TwoColGrid>
        <GridLeftCol>
          <SectionHeader>추천 멘토</SectionHeader>
          <MentorRecommendWrapper>
            <RecommendMentorList />
          </MentorRecommendWrapper>
        </GridLeftCol>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <GridRightCol>
            <Section>
              <SectionHeader>
                수락전 상담 ({data.lastUpcomingConsult.length})
              </SectionHeader>
              {!data.lastUpcomingConsult.length ? (
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
                취소한 상담 ({data.canceledConsultByMentee.length})
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
                    type={CANCEL_CONSULT_TYPE}
                  />
                </ConsultWrapper>
              )}
            </Section>
            <Section>
              <SectionHeader>
                취소된 상담 ({data.canceledConsultByMentor.length})
              </SectionHeader>
              {!data.canceledConsultByMentor.length ? (
                <ConsultWrapper>
                  <span>취소된 상담이 없습니다.</span>
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
          </GridRightCol>
        )}
      </TwoColGrid>
    </>
  );
};

export default MenteeConsult;
