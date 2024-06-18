import React, { useEffect, useState } from "react";
import "../../styles/calendar.css";
import styled from "styled-components";
import MenteeScheduleList from "../../components/List/Schedule/MenteeScheduleList";
import MenteeCalendar from "../../components/MenteeCalendar";
import PointBox from "../../components/Box/PointBox";
import WageBox from "../../components/Wage/WageBox";
import { ScheduleLayout } from "../../styles/common/Layout";
import RecommendMentorList from "../../components/List/Recommend/RecommendMentorList";
import { useQuery } from "react-query";
import { fetchUserConsult } from "../../api/consult/fetchConsult";
import { fetchMentorCalendar } from "../../api/calendar";
import DetailedModal from "../../components/Modal/DetailedModal";
import {
  useFetchConsultList,
  useGetConsultList,
} from "../../hooks/useGetConsultList";
import { transformConsultData } from "../../utils/TransformConsultData";
// import { colors } from "../../styles/common/Theme";

const MenteeSchedule = () => {
  const [target, setTarget] = useState(null); // 타겟 시간표. 디폴트는 본인
  const point = 12000;

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailObject, setDetailObject] = useState({});

  const { menteeEvent, mentorEvent, isLoading, refetch } =
    useGetConsultList(target);

  const [events, setEvents] = useState(menteeEvent);
  const [mentorEvents, setMentorEvents] = useState(mentorEvent);

  useEffect(() => {
    setEvents(menteeEvent);
    setMentorEvents(mentorEvent);
  }, [menteeEvent, mentorEvent]);

  useEffect(() => {
    if (isDetailOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isDetailOpen]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <ScheduleLayout>
      <MenteeCalendar
        target={target}
        setTarget={setTarget}
        consultList={!!target ? mentorEvents : events}
        setConsultList={!!target ? setMentorEvents : setEvents}
        refetch={refetch}
        setDetailObject={setDetailObject}
        setIsDetailOpen={setIsDetailOpen}
      />
      <Right>
        <MenteeScheduleList
          lastUpcomingConsult={isLoading ? [] : events.lastUpcomingConsult}
          upcomingConsult={isLoading ? [] : events.upcomingConsult}
          setDetailObject={setDetailObject}
          setIsDetailOpen={setIsDetailOpen}
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
        {!target && <PointBox point={12000} />}
        {target && <WageBox target={target} wage={target.wage} />}
      </Right>
      {isDetailOpen && (
        <DetailedModal
          setModalOpen={setIsDetailOpen}
          item={detailObject}
          type={Number(detailObject.status)}
          refetch={refetch}
        />
      )}
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
