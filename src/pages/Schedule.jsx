import React from "react";
import "../styles/calendar.css";
import MentorCalendar from "../components/MentorCalendar";
import ScheduleList from "../components/List/ScheduleList";
import { ScheduleLayout } from "../styles/common/Layout";

const Schedule = () => {
  return (
    <ScheduleLayout>
      <MentorCalendar />
      <ScheduleList />
    </ScheduleLayout>
  );
};

export default Schedule;
