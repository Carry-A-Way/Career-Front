import React from "react";
import "../styles/calendar.css";
import MyCalendar from "../components/MyCalendar";
import ScheduleList from "../components/List/ScheduleList";
import { ScheduleLayout } from "../styles/common/Layout";

const Schedule = () => {
  return (
    <ScheduleLayout>
      <MyCalendar />
      <ScheduleList />
    </ScheduleLayout>
  );
};

export default Schedule;
