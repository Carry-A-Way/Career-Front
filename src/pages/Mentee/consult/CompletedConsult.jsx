import SubMenubar from "../../../components/Menubar/SubMenubar";
import { useQuery } from "react-query";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import ConsultList, {
  ConsultListShort,
} from "../../../components/List/ConsultList";
import { COMPLETED_CONSULT_TYPE } from "../../../constants";
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
  RecommendWrapper,
  Section,
  SectionHeader,
} from "../../../styles/common/mentor/MentorForm";
import { fetchConsultWithStatus } from "../../../api/fetchConsult";
import RecommendMentorList from "../../../components/List/Recommend/RecommendMentorList";

const MenteeCompletedConsult = () => {
  const subMenuList = MenteeConsultMenu;
  const subMenuLink = MenteeConsultLinkList;
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
          <SectionHeader>추천 멘토</SectionHeader>
          <RecommendWrapper>
            <RecommendMentorList />
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
        )}
      </TwoColGrid>
    </>
  );
};

export default MenteeCompletedConsult;
