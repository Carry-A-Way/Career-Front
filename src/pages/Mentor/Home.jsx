import React from "react";
import styled from "styled-components";
import { ButtonDiv } from "../../components/Button/Button";
import ConsultList from "../../components/List/ConsultList";
import HorizontalLine from "../../components/Line/HorizontalLine";
import useGetConsult from "../../hooks/useGetConsult";
import { useNavigate } from "react-router-dom";
import useGetCancelConsult from "../../hooks/useGetCancelConsult";
import useGetCompletedConsult from "../../hooks/useGetCompletedConsult";
import {
  CANCEL_CONSULT_TYPE,
  COMPLETED_CONSULT_TYPE,
  UPCOMING_CONSULT_TYPE,
} from "../../constants";
import { GridRightCol, TwoColGrid } from "../../styles/common/Layout";
import MentorLeftForm from "../../components/MentorLeftForm";

const Home = () => {
  const { lastUpcomingConsult, upcomingConsult } = useGetConsult();
  const { cancelConsult } = useGetCancelConsult();
  const { completedConsult } = useGetCompletedConsult();
  const navigate = useNavigate();
  return (
    <TwoColGrid>
      <MentorLeftForm />
      {/* <VerticalLine /> */}
      <GridRightCol>
        <Wrapper>
          <header>곧 진행될 상담</header>
          {!lastUpcomingConsult.length ? (
            <Consult>
              <span>진행될 상담이 없습니다.</span>
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
                consultList={[lastUpcomingConsult[0]]}
                type={UPCOMING_CONSULT_TYPE}
              />
            </Consult>
          )}
        </Wrapper>
        <HorizontalLine />
        <Wrapper>
          <header>진행 예정된 상담 ({upcomingConsult.length})</header>
          {!upcomingConsult.length ? (
            <Consult>
              <span>진행될 상담이 없습니다.</span>
            </Consult>
          ) : (
            <Consult>
              <ConsultList
                consultList={upcomingConsult}
                type={UPCOMING_CONSULT_TYPE}
              />
            </Consult>
          )}
        </Wrapper>
        <HorizontalLine />
        <Wrapper>
          <header>완료된 상담 ({completedConsult.length})</header>
          {!completedConsult.length ? (
            <Consult>
              <span>완료된 상담이 없습니다.</span>
            </Consult>
          ) : (
            <Consult>
              <ConsultList
                consultList={completedConsult}
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
