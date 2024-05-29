import React, { useState } from "react";
import "../../styles/calendar.css";
import MentorCalendar from "../../components/MentorCalendar";
import MentorScheduleList from "../../components/List/Schedule/MentorScheduleList";
import { ScheduleLayout } from "../../styles/common/Layout";
import { useQuery } from "react-query";
import { fetchUserConsult } from "../../api/consult/fetchConsult";

const MentorSchedule = () => {
  const [events, setEvents] = useState({
    upcomingConsult: [],
    lastUpcomingConsult: [],
  });

  const transformConsultData = (consultData) => {
    return consultData.map((item) => ({
      ...item,
      id: item.consultId,
      title: `[${item.major}]\n${item.student.nickname}`,
      start: new Date(item.startTime),
      end: new Date(item.endTime),
      status: item.status,
    }));
  };

  const useFetchConsultData = () => {
    return useQuery(["mentee-schedule"], () => fetchUserConsult(), {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const convertedData = {
          lastUpcomingConsult: transformConsultData(data.lastUpcomingConsult),
          upcomingConsult: transformConsultData(data.upcomingConsult),
        };
        setEvents({ ...convertedData });
      },
    });
  };

  const { isLoading, refetch } = useFetchConsultData();

  if (isLoading) return <div>Loading...</div>;
  return (
    <ScheduleLayout>
      <MentorCalendar
        lastUpcomingConsult={isLoading ? [] : events.lastUpcomingConsult}
        upcomingConsult={isLoading ? [] : events.upcomingConsult}
        refetch={refetch}
      />
      <MentorScheduleList
        lastUpcomingConsult={isLoading ? [] : events.lastUpcomingConsult}
        upcomingConsult={isLoading ? [] : events.upcomingConsult}
        refetch={refetch}
      />
    </ScheduleLayout>
  );
};

export default MentorSchedule;
