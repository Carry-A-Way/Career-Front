import SubMenubar from "../../../components/Menubar/SubMenubar";
import RecommendMenteeItem from "../../../components/List/RecommendMenteeItem";
import ConsultList from "../../../components/List/ConsultList";
import { ConsultListShort } from "../../../components/List/ConsultList";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import {
  PENDING_CONSULT_TYPE,
  UPCOMING_CONSULT_TYPE,
} from "../../../constants";
import {
  MentorConsultLinkList,
  MentorConsultMenu,
  RecommendMenteeList,
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
import { useQuery } from "react-query";
import { fetchConsultWithStatus } from "../../../api/fetchConsult";

const PendingConsult = () => {
  const subMenuList = MentorConsultMenu;
  const subMenuLink = MentorConsultLinkList;
  const { data: pendingConsult, isLoading } = useQuery(
    ["consult", PENDING_CONSULT_TYPE],
    () => fetchConsultWithStatus(PENDING_CONSULT_TYPE),
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[1]}
        // setSubMenu={setSubMenu}
        subMenuLinkList={subMenuLink}
      />
      <TwoColGrid>
        <GridLeftCol>
          <SectionHeader>추천 학생</SectionHeader>
          <RecommendWrapper>
            <RecommendMenteeItem recommendList={RecommendMenteeList} />
          </RecommendWrapper>
        </GridLeftCol>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <GridRightCol>
            <Section>
              <SectionHeader>
                수락전 상담 ({pendingConsult.length})
              </SectionHeader>
              {pendingConsult && !pendingConsult.length ? (
                <ConsultWrapper>
                  <span>수락 대기중인 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList
                    consultList={pendingConsult}
                    type={PENDING_CONSULT_TYPE}
                  />
                </ConsultWrapper>
              )}
            </Section>
            <HorizontalLine />
            <Section>
              <ConsultListShort
                consultList={pendingConsult}
                type={UPCOMING_CONSULT_TYPE}
              />
            </Section>
          </GridRightCol>
        )}
      </TwoColGrid>
    </>
  );
};

export default PendingConsult;
