import React, { useState } from "react";
import "../../styles/calendar.css";
import styled from "styled-components";
import MenteeScheduleList from "../../components/List/Schedule/MenteeScheduleList";
import MenteeCalendar from "../../components/MenteeCalendar";
import PointBox from "../../components/Box/PointBox";
import WageBox from "../../components/Wage/WageBox";
import { ScheduleLayout } from "../../styles/common/Layout";
import RecommendMentorList from "../../components/List/Recommend/RecommendMentorList";
import { useQuery } from "react-query";
import { fetchUserConsult } from "../../api/fetchConsult";
// import { colors } from "../../styles/common/Theme";

const MenteeSchedule = () => {
  const [target, setTarget] = useState(null); // 타겟 시간표. 디폴트는 본인
  const point = 12000;

  const { data, isLoading, refetch } = useQuery([], () => fetchUserConsult(), {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      {data && (
        <ScheduleLayout>
          <MenteeCalendar
            target={target}
            setTarget={setTarget}
            lastUpcomingConsult={isLoading ? [] : data.lastUpcomingConsult}
            upcomingConsult={isLoading ? [] : data.upcomingConsult}
            refetch={refetch}
          />
          <Right>
            <MenteeScheduleList
              lastUpcomingConsult={isLoading ? [] : data.lastUpcomingConsult}
              upcomingConsult={isLoading ? [] : data.upcomingConsult}
            />
            <MentorRecommendWrapper>
              <div className="header-wrapper">
                <header className="list-title">추천 멘토</header>
                <span className="list-subtitle">
                  * 클릭시 멘토의 시간표가 보여집니다.
                </span>
              </div>
              <RecommendMentorList target={target} setTarget={setTarget} />
            </MentorRecommendWrapper>
            {target === null && <PointBox point={point} />}
            {!!target && <WageBox target={target} wage={target.wage} />}
          </Right>
        </ScheduleLayout>
      )}
    </>
  );
};

export default MenteeSchedule;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const MentorRecommendWrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-height: 35rem;
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: end;
    .list-title {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .list-subtitle {
      margin-bottom: 0.5rem;
    }
  }
`;
