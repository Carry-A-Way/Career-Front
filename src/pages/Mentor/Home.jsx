import React from "react";
import styled from "styled-components";
import { ButtonDiv } from "../../components/Button/Button";
import ConsultList from "../../components/List/ConsultList";
import HorizontalLine from "../../components/Line/HorizontalLine";
import { useNavigate } from "react-router-dom";
import {
  CANCEL_CONSULT_TYPE,
  COMPLETED_CONSULT_TYPE,
  UPCOMING_CONSULT_TYPE,
} from "../../constants";
import { GridRightCol, TwoColGrid } from "../../styles/common/Layout";
import MentorLeftForm from "../../components/MentorLeftForm";
import { useQuery } from "react-query";
import {
  getMentorConsult,
  getMentorConsultWithStatus,
} from "../../api/fetchConsult";

const Home = () => {
  // const { lastUpcomingConsult, upcomingConsult } = useGetConsult(); // lastUpcoming 이 수락전인 상담, upcoming 이 수락한 상담
  // const { cancelConsult } = useGetCancelConsult();
  // const { completedConsult } = useGetCompletedConsult();
  const { data, isLoading } = useQuery("consult", () => getMentorConsult(), {
    refetchOnWindowFocus: false,
  });
  const { data: cancelConsult } = useQuery(
    ["consult", CANCEL_CONSULT_TYPE],
    () => getMentorConsultWithStatus(CANCEL_CONSULT_TYPE),
    {
      refetchOnWindowFocus: false,
    }
  );
  const navigate = useNavigate();
  return (
    <TwoColGrid>
      <MentorLeftForm />
      {/* <VerticalLine /> */}
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <GridRightCol>
          <Wrapper>
            <header>수락전 상담 ({data.lastUpcomingConsult.length})</header>
            {!data.lastUpcomingConsult.length ? (
              <Consult>
                <span>수락 대기중인 상담이 없습니다.</span>
                <div
                  className="button-wrapper"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <ButtonDiv onClick={() => navigate(`/schedule`)}>
                    시간표 바로가기
                  </ButtonDiv>
                </div>
              </Consult>
            ) : (
              <Consult>
                <ConsultList
                  consultList={data.lastUpcomingConsult}
                  type={UPCOMING_CONSULT_TYPE}
                />
              </Consult>
            )}
          </Wrapper>
          <HorizontalLine />
          <Wrapper>
            <header>진행 예정된 상담 ({data.upcomingConsult.length})</header>
            {!data.upcomingConsult.length ? (
              <Consult>
                <span>진행될 상담이 없습니다.</span>
              </Consult>
            ) : (
              <Consult>
                <ConsultList
                  consultList={data.upcomingConsult}
                  type={UPCOMING_CONSULT_TYPE}
                />
              </Consult>
            )}
          </Wrapper>
          <HorizontalLine />
          <Wrapper>
            <header>완료된 상담 ({data.previousConsult.length})</header>
            {!data.previousConsult.length ? (
              <Consult>
                <span>완료된 상담이 없습니다.</span>
              </Consult>
            ) : (
              <Consult>
                <ConsultList
                  consultList={data.previousConsult}
                  color="#D9D9D9"
                  type={COMPLETED_CONSULT_TYPE}
                />
              </Consult>
            )}
          </Wrapper>
          <HorizontalLine />
          <Wrapper>
            <header>취소한 상담 ({cancelConsult.length})</header>
            {!cancelConsult.length ? (
              <Consult>
                <span>취소한 상담이 없습니다.</span>
              </Consult>
            ) : (
              <Consult>
                <ConsultList
                  consultList={cancelConsult}
                  color="#D9D9D9"
                  type={CANCEL_CONSULT_TYPE}
                />
              </Consult>
            )}
          </Wrapper>
        </GridRightCol>
      )}
    </TwoColGrid>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > header {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const Consult = styled.div`
  width: 100%;
  min-height: 20rem;
  height: 200px;
  max-height: 26vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.3rem;
  color: #909090;
  position: relative;
  margin-top: 2rem;
  overflow: auto hidden;
  > span {
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
  }
`;
