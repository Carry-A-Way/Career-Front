import React, { useState } from "react";
import "../../styles/calendar.css";
import styled from "styled-components";
import MenteeScheduleList from "../../components/List/MenteeScheduleList";
import MenteeCalendar from "../../components/MenteeCalendar";
import PointBox from "../../components/Box/PointBox";
import MentorFeeBox from "../../components/Wage/WageBox";
import { ScheduleLayout } from "../../styles/common/Layout";
import RecommendMentorList from "../../components/List/Recommend/RecommendMentorList";
// import { colors } from "../../styles/common/Theme";

const MenteeSchedule = () => {
  const [target, setTarget] = useState(null); // 타겟 시간표. 디폴트는 본인
  const point = 12000;
  return (
    <ScheduleLayout>
      <MenteeCalendar target={target} setTarget={setTarget} />
      <Right>
        <MenteeScheduleList />
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
        {!!target && <MentorFeeBox target={target} wage={target.wage} />}
      </Right>
    </ScheduleLayout>
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
