import React from "react";
import styled from "styled-components";
import { ButtonDiv } from "../../components/Button/Button";
import ConsultList from "../../components/List/ConsultList";
import HorizontalLine from "../../components/Line/HorizontalLine";
import { useNavigate } from "react-router-dom";
import { UPCOMING_CONSULT_TYPE } from "../../constants";
import { GridRightCol, TwoColGrid } from "../../styles/common/Layout";
import MentorLeftForm from "../../components/MentorLeftForm";
import { useQuery } from "react-query";
import { fetchConsultWithStatus } from "../../api/fetchConsult";
import EventList from "../../components/List/EventList";
import { fetchPostAll } from "../../api/fetchPost";
import PostItem from "../../components/List/PostItem";
import { xScrollStyle } from "../../styles/common/Scroll";
import PostList from "../../components/List/PostList";

const Home = () => {
  const { data: upcomingData, isLoading: upcomingLoading } = useQuery(
    "consult",
    () => fetchConsultWithStatus(UPCOMING_CONSULT_TYPE),
    {
      refetchOnWindowFocus: false,
    }
  );
  // console.log(upcomingData.length);
  const {
    data: postData,
    isLoading: isPostLoading,
    refetch,
  } = useQuery("post", () => fetchPostAll(), {
    refetchOnWindowFocus: false,
  });
  const navigate = useNavigate();
  return (
    <TwoColGrid>
      <MentorLeftForm />
      {/* <VerticalLine /> */}
      <GridRightCol>
        <Wrapper>
          <EventList />
        </Wrapper>
        {isPostLoading ? (
          <Wrapper>loading...</Wrapper>
        ) : (
          !!postData && (
            <Wrapper>
              <header>이런 고민이 있어요</header>
              <PostContainer>
                {postData.map((post, idx) => (
                  <PostItem
                    item={post}
                    idx={idx}
                    refetch={refetch}
                    key={post.id}
                  />
                ))}
              </PostContainer>
            </Wrapper>
          )
        )}
        <HorizontalLine />
        <Wrapper>
          <header>
            서두르세요! 곧 진행될 상담 ({!!upcomingData && upcomingData.length})
          </header>
          {upcomingLoading ? (
            <Consult>
              <span>loading...</span>
            </Consult>
          ) : !!upcomingData && upcomingData.length ? (
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
                consultList={upcomingData}
                type={UPCOMING_CONSULT_TYPE}
              />
            </Consult>
          )}
        </Wrapper>
        {/* <Wrapper>
              <header>수락전 상담 ({data.lastUpcomingConsult?.length})</header>
              {!data.lastUpcomingConsult?.length ? (
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
              <header>진행 예정된 상담 ({data.upcomingConsult?.length})</header>
              {!data.upcomingConsult?.length ? (
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
              <header>
                취소한 상담 ({data.canceledConsultByMentor?.length})
              </header>
              {!data.canceledConsultByMentor?.length ? (
                <Consult>
                  <span>취소한 상담이 없습니다.</span>
                </Consult>
              ) : (
                <Consult>
                  <ConsultList
                    consultList={data.canceledConsultByMentor}
                    color="#D9D9D9"
                    type={CANCEL_CONSULT_TYPE}
                  />
                </Consult>
              )}
            </Wrapper>
            <HorizontalLine />
            <Wrapper>
              <header>
                취소된 상담 ({data.canceledConsultByMentee?.length})
              </header>
              {!data.canceledConsultByMentee?.length ? (
                <Consult>
                  <span>취소한 상담이 없습니다.</span>
                </Consult>
              ) : (
                <Consult>
                  <ConsultList
                    consultList={data.canceledConsultByMentee}
                    color="#D9D9D9"
                    type={CANCELED_CONSULT_TYPE}
                  />
                </Consult>
              )}
            </Wrapper> */}
      </GridRightCol>
    </TwoColGrid>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
  > header {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const PostContainer = styled.div`
  display: flex;
  gap: 1rem;
  min-height: 20rem;
  height: 200px;
  max-height: 26vh;
  max-width: 100%;
  overflow: auto hidden;
  margin-top: 2rem;
  ${xScrollStyle};
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
