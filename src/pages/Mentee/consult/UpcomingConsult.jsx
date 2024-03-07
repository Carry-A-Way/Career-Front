import SubMenubar from "../../../components/Menubar/SubMenubar";
import { useQuery } from "react-query";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import ConsultList, {
  ConsultListShort,
} from "../../../components/List/ConsultList";
import { UPCOMING_CONSULT_TYPE } from "../../../constants";
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
import { fetchConsultWithStatus } from "../../../api/fetchConsult";
import RecommendMentorList from "../../../components/List/Recommend/RecommendMentorList";

const MenteeUpcomingConsult = () => {
  const subMenuList = MenteeConsultMenu;
  const subMenuLink = MenteeConsultLinkList;
  const { data: upcomingConsult, isLoading } = useQuery(
    ["consult", UPCOMING_CONSULT_TYPE],
    () => fetchConsultWithStatus(UPCOMING_CONSULT_TYPE),
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[2]}
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

export default MenteeUpcomingConsult;
