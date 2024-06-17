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
// import { colors } from "../../styles/common/Theme";

const MenteeSchedule = () => {
  const [target, setTarget] = useState(null); // 타겟 시간표. 디폴트는 본인
  const point = 12000;
  const [events, setEvents] = useState({
    upcomingConsult: [],
    lastUpcomingConsult: [],
  });
  const [mentorEvents, setMentorEvents] = useState({
    upcomingConsult: [],
    lastUpcomingConsult: [],
  });
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailObject, setDetailObject] = useState({});

  const transformConsultData = (consultData) => {
    if (target === null) {
      return consultData.map((item) => ({
        ...item,
        id: item.consultId,
        title: `[${item.major}]\n${item.mentor.nickname}`,
        start: new Date(item.startTime),
        end: new Date(item.endTime),
        status: item.status,
      }));
    } else {
      return consultData.map((item) => ({
        ...item,
        id: item.consultId,
        title: item.status ? "상담 예정" : "상담 대기",
        start: new Date(item.startTime),
        end: new Date(item.endTime),
        status: item.status,
      }));
    }
  };

  const useFetchConsultData = (target) => {
    return useQuery(
      [target],
      () =>
        target === null ? fetchUserConsult() : fetchMentorCalendar(target.id),
      {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
          const convertedData = {
            lastUpcomingConsult: transformConsultData(data.lastUpcomingConsult),
            upcomingConsult: transformConsultData(data.upcomingConsult),
          };
          if (!!target) {
            // 멘토시간표면 내 시간표 + 멘토시간표
            // setMentorEvents({
            //   lastUpcomingConsult: [
            //     ...events.lastUpcomingConsult,
            //     ...convertedData.lastUpcomingConsult,
            //   ],
            //   upcomingConsult: [
            //     ...events.upcomingConsult,
            //     ...convertedData.upcomingConsult,
            //   ],
            // });
            const existingConsultIds = new Set(
              events.lastUpcomingConsult.map((consult) => consult.consultId)
            );

            const filteredLastUpcomingConsult =
              convertedData.lastUpcomingConsult.filter(
                (consult) => !existingConsultIds.has(consult.consultId)
              );

            return setMentorEvents({
              lastUpcomingConsult: [
                ...events.lastUpcomingConsult,
                ...filteredLastUpcomingConsult,
              ],
              upcomingConsult: [
                ...events.upcomingConsult,
                ...convertedData.upcomingConsult,
              ],
            });
          } else {
            setEvents({ ...convertedData });
          }
        },
      }
    );
  };

  const { isLoading, refetch } = useFetchConsultData(target);

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
        lastUpcomingConsult={
          !!target
            ? mentorEvents.lastUpcomingConsult
            : events.lastUpcomingConsult
        }
        upcomingConsult={
          !!target ? mentorEvents.upcomingConsult : events.upcomingConsult
        }
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
