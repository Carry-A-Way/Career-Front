import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menubar from "./components/Menubar/Menubar";
import Login from "./pages/Login/Login";
import SignupMentee from "./pages/Mentee/Signup";
import SignupMentor from "./pages/Mentor/Signup";
import FindPassword from "./pages/FindPassword/FindPassword";
import "./App.css";
import HomeMentor from "./pages/Mentor/Home";
import Setting from "./pages/Mentor/Setting";
import ConsultMentor from "./pages/Mentor/consult/Consult";
import HomeMentee from "./pages/Mentee/Home";
import MenteeMentor from "./pages/Mentee/Mentor";
import Community from "./pages/Community/Community";
import CommunityWrite from "./pages/Community/CommunityWrite";
import Category from "./pages/Community/Category";
import CategoryPost from "./pages/Community/CategoryPost";
import MyActivity from "./pages/Community/MyActivity";
import PostDetail from "./pages/Community/PostDetail";
import Schedule from "./pages/Schedule";
import UpcomingConsult from "./pages/Mentor/consult/UpcomingConsult";
import CompletedConsult from "./pages/Mentor/consult/CompletedConsult";
import CancelConsult from "./pages/Mentor/consult/CancelConsult";
import { useSelector, useDispatch } from "react-redux";
import Restricted from "./pages/Restricted";
import { getCookie } from "./cookie";
import { setIsLogin } from "./store/isLoginSlice";
import { setIsMentor } from "./store/isMentorSlice";
import NotFound from "./pages/NotFound";
import MenteeProfile from "./pages/Mentee/Profile";
import MentorProfile from "./pages/Mentor/Profile";
import SuggestionMentor from "./pages/Mentee/SuggestionMentor";
import PopularMentor from "./pages/Mentee/PopularMentor";
import EnterTag from "./pages/Mentee/EnterTag";
import FindMentor from "./pages/Mentee/FindMentor";
import MyMentor from "./pages/Mentee/MyMentor";
import LikeMentor from "./pages/Mentee/LikeMentor";
import ConsultMenteeMentor from "./pages/Mentee/ConsultMentor";
import UserCard from "./pages/UserCard";
import ConsultMentorCard from "./pages/ConsultMentorCard";
import MenteeSchedule from "./pages/Mentee/Schedule";
import PendingConsult from "./pages/Mentor/consult/PendingConsult";
import MenteePendingConsult from "./pages/Mentee/consult/PendingConsult";
import MenteeUpcomingConsult from "./pages/Mentee/consult/UpcomingConsult";
import MenteeConsult from "./pages/Mentee/consult/Consult";
import MenteeCancelConsult from "./pages/Mentee/consult/CancelConsult";
import MenteeCompletedConsult from "./pages/Mentee/consult/CompletedConsult";
import MenteeCanceledConsult from "./pages/Mentee/consult/CanceledConsult";
import CanceledConsult from "./pages/Mentor/consult/CanceledConsult";
import Home from "./pages/Home/Home";
import {
  COMMUNITY,
  COMMUNITY_ACTIVITY,
  COMMUNITY_CATEGORY,
  COMMUNITY_POST,
  COMMUNITY_WRITE,
  CONSULT_MENTOR_INFO,
  MENTEE_SCHEDULE,
  USER_CARD_INFO,
} from "./settings/url";
import { setupAxiosInterceptors } from "./utils/axiosInterceptors";

function App() {
  const isLogin = useSelector((state) => state.isLogin.value);
  const isMentor = useSelector((state) => state.isMentor.value);
  const dispatch = useDispatch();
  useEffect(() => {
    setupAxiosInterceptors(dispatch);
    const jwtToken = getCookie("jwtToken");
    if (jwtToken) {
      const parts = jwtToken.split(".");
      const payload = JSON.parse(atob(parts[1]));
      dispatch(setIsLogin(true));
      dispatch(setIsMentor(payload.isTutor));
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Menubar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/mentee" element={<SignupMentee />} />
        <Route path="/home" element={<SignupMentee />} />
        <Route path="/signup/mentor" element={<SignupMentor />} />
        <Route path="/password" element={<FindPassword />} />
        <Route path="/restricted" element={<Restricted />} />
        {isLogin ? (
          <>
            <Route path={`${COMMUNITY}`} element={<Community />} />
            <Route path={`${COMMUNITY_CATEGORY}`} element={<Category />} />
            <Route path="/community/category/:id" element={<CategoryPost />} />
            <Route path={`/${COMMUNITY_WRITE}`} element={<CommunityWrite />} />
            <Route path={`/${COMMUNITY_ACTIVITY}`} element={<MyActivity />} />
            <Route path={`/${COMMUNITY_POST}/:id`} element={<PostDetail />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path={`/${USER_CARD_INFO}`} element={<UserCard />} />
            <Route
              path={`/${CONSULT_MENTOR_INFO}`}
              element={<ConsultMentorCard />}
            />
            {isMentor ? (
              <>
                <Route path="/" element={<HomeMentor />} />
                <Route path="/mentor" element={<HomeMentor />} />
                <Route path="/mentor/setting" element={<Setting />} />
                <Route path="/mentor/profile" element={<MentorProfile />} />
                <Route path="/mentor/consult" element={<ConsultMentor />} />
                <Route
                  path="/mentor/consult/pending"
                  element={<PendingConsult />}
                />
                <Route
                  path="/mentor/consult/upcoming"
                  element={<UpcomingConsult />}
                />
                <Route
                  path="/mentor/consult/completed"
                  element={<CompletedConsult />}
                />
                <Route
                  path="/mentor/consult/cancel"
                  element={<CancelConsult />}
                />
                <Route
                  path="/mentor/consult/canceled"
                  element={<CanceledConsult />}
                />
              </>
            ) : (
              <>
                <Route path="/mentor/*" element={<Restricted />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
            {!isMentor ? (
              <>
                <Route path="/" element={<HomeMentee />} />
                <Route path="/mentee" element={<HomeMentee />} />
                <Route path="/mentee/setting" element={<Setting />} />
                <Route path="/mentee/mentor" element={<MenteeMentor />} />
                <Route
                  path="/mentee/mentor/recommend"
                  element={<SuggestionMentor />}
                />
                <Route
                  path="/mentee/mentor/popular"
                  element={<PopularMentor />}
                />
                <Route path="/mentee/mentor/like" element={<LikeMentor />} />
                <Route
                  path="/mentee/mentor/consult"
                  element={<ConsultMenteeMentor />}
                />
                <Route path="/mentee/consult" element={<MenteeConsult />} />
                <Route
                  path="/mentee/consult/pending"
                  element={<MenteePendingConsult />}
                />
                <Route
                  path="/mentee/consult/upcoming"
                  element={<MenteeUpcomingConsult />}
                />
                <Route
                  path="/mentee/consult/completed"
                  element={<MenteeCompletedConsult />}
                />
                <Route
                  path="/mentee/consult/cancel"
                  element={<MenteeCancelConsult />}
                />
                <Route
                  path="/mentee/consult/canceled"
                  element={<MenteeCanceledConsult />}
                />
                <Route path="/mentee/tag" element={<EnterTag />} />
                <Route path="/mentee/mentor/find" element={<FindMentor />} />
                <Route
                  path="/mentee/mentor/my-mentors"
                  element={<MyMentor />}
                />
                <Route path="/mentee/profile" element={<MenteeProfile />} />
                <Route
                  path={`/${MENTEE_SCHEDULE}`}
                  element={<MenteeSchedule />}
                />
              </>
            ) : (
              <>
                <Route path="/mentee/*" element={<Restricted />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" Navigate to={"/"} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
