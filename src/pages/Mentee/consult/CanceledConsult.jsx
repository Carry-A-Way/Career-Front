import SubMenubar from "../../../components/Menubar/SubMenubar";
import { useQuery } from "react-query";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import ConsultList, {
  ConsultListShort,
} from "../../../components/List/ConsultList";
import { CANCELED_CONSULT_TYPE } from "../../../constants";
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
import { fetchConsultWithStatus } from "../../../api/consult/fetchConsult";
import RecommendMentorList from "../../../components/List/Recommend/RecommendMentorList";

const MenteeCanceledConsult = () => {
  const subMenuList = MenteeConsultMenu;
  const subMenuLink = MenteeConsultLinkList;
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
        subMenuLinkList={subMenuLink}
      />
      <TwoColGrid className="two-col-grid__long">
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
                취소된 상담 ({canceledConsult.length})
              </SectionHeader>
              {!canceledConsult.length ? (
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

export default MenteeCanceledConsult;
