import SubMenubar from "../../../components/Menubar/SubMenubar";
import { useQuery } from "react-query";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import ConsultList, {
  ConsultListShort,
} from "../../../components/List/ConsultList";
import { CANCEL_CONSULT_TYPE } from "../../../constants";
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

const MenteeCancelConsult = () => {
  const subMenuList = MenteeConsultMenu;
  const subMenuLink = MenteeConsultLinkList;
  const { data: cancelConsult, isLoading } = useQuery(
    ["consult", CANCEL_CONSULT_TYPE],
    () => fetchConsultWithStatus(CANCEL_CONSULT_TYPE),
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[4]}
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

export default MenteeCancelConsult;
