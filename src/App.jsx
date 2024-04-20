import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Menubar from "./components/Menubar/Menubar";
import Login from "./pages/Login/Login";
import SignupMentee from "./pages/Mentee/Signup";
import SignupMentor from "./pages/Mentor/Signup";
import FindPassword from "./pages/FindPassword/FindPassword";
import Home from "./pages/Home/Home";
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

function App() {
  const isLogin = useSelector((state) => state.isLogin.value);
  const isMentor = useSelector((state) => state.isMentor.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const jwtToken = getCookie("jwtToken");
    if (jwtToken) {
      const parts = jwtToken.split(".");
      const payload = JSON.parse(atob(parts[1]));
      dispatch(setIsLogin(true));
      dispatch(setIsMentor(payload.isTutor));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Menubar />
        <Routes>
          <Route
            path="/"
            element={
              !isLogin ? <Home /> : isMentor ? <HomeMentor /> : <HomeMentee />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signMentee" element={<SignupMentee />} />
          <Route path="/home" element={<SignupMentee />} />
          <Route path="/signMentor" element={<SignupMentor />} />
          <Route path="/findPassword" element={<FindPassword />} />
          <Route path="/restricted" element={<Restricted />} />
          {isLogin ? (
            <>
              <Route path="/community" element={<Community />} />
              <Route path="/community/category" element={<Category />} />
              <Route
                path="/community/category/:id"
                element={<CategoryPost />}
              />
              <Route path="/community/write" element={<CommunityWrite />} />
              <Route path="/community/activity" element={<MyActivity />} />
              <Route path="/community/post/:id" element={<PostDetail />} />
              <Route path="/schedule" element={<Schedule />} />
              {isMentor ? (
                <>
                  <Route path="/mentor" element={<HomeMentor />} />
                  <Route path="/mentor/setting" element={<Setting />} />
                  <Route path="/mentor/profile" element={<MentorProfile />} />
                  <Route path="/mentor/consult" element={<ConsultMentor />} />
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
                </>
              ) : (
                <>
                  <Route path="/mentor/*" element={<Restricted />} />
                  <Route path="*" element={<NotFound />} />
                </>
              )}
              {!isMentor ? (
                <>
                  <Route path="/mentee" element={<HomeMentee />} />
                  <Route path="/mentee/mentor" element={<MenteeMentor />} />
                  <Route path="/mentee/profile" element={<MenteeProfile />} />
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
    </>
  );
}

export default App;
