import React, { useEffect, useState } from "react";
import "../../styles/calendar.css";
import MentorCalendar from "../../components/MentorCalendar";
import MentorScheduleList from "../../components/List/Schedule/MentorScheduleList";
import { ScheduleLayout } from "../../styles/common/Layout";
import { useQuery } from "react-query";
import { fetchUserConsult } from "../../api/consult/fetchConsult";
import DetailedModal from "../../components/Modal/DetailedModal";
import { transformConsultData } from "../../utils/transformConsultData";

const MentorSchedule = () => {
  const [events, setEvents] = useState({
    upcomingConsult: [],
    lastUpcomingConsult: [],
  });
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailObject, setDetailObject] = useState({});

  const { isLoading, refetch } = useQuery(
    ["mentee-schedule"],
    fetchUserConsult,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log("onSuccess", data);
        const convertedData = {
          lastUpcomingConsult: transformConsultData(
            data.lastUpcomingConsult,
            false,
            true
          ),
          upcomingConsult: transformConsultData(
            data.upcomingConsult,
            false,
            true
          ),
        };
        setEvents({ ...convertedData });
      },
    }
  );

  useEffect(() => {
    if (isDetailOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isDetailOpen]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <ScheduleLayout>
      <MentorCalendar
        lastUpcomingConsult={isLoading ? [] : events.lastUpcomingConsult}
        upcomingConsult={isLoading ? [] : events.upcomingConsult}
        setDetailObject={setDetailObject}
        setIsDetailOpen={setIsDetailOpen}
      />
      <MentorScheduleList
        lastUpcomingConsult={isLoading ? [] : events.lastUpcomingConsult}
        upcomingConsult={isLoading ? [] : events.upcomingConsult}
        refetch={refetch}
        setDetailObject={setDetailObject}
        setIsDetailOpen={setIsDetailOpen}
      />
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

export default MentorSchedule;
