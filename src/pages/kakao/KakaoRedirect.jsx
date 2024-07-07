import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { kakaoCallback } from "../../api/oauth/kakao";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";
import { FRONT_URL } from "../../constants";
import { SIGNUP_MENTEE } from "../../api/api";
import { OAUTH_KAKAO_MENTOR_SIGNUP } from "../../settings/url";
import { useDispatch, useSelector } from "react-redux";
import { setKakaoInfo } from "../../store/kakaoInfoSlice";
import { setIsLogin } from "../../store/isLoginSlice";
import { setIsMentor } from "../../store/isMentorSlice";
import { setCookie } from "../../cookie";
import { getNicknameFromToken } from "../../auth/jwtFunctions";

const KakaoRedirect = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const currentCode = useSelector((state) => state.kakaoInfo.code);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  console.log("current ", currentCode);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await kakaoCallback(code);
      if (res.statusCode === 409) {
        const jwtToken = res.data;
        const parts = jwtToken.split(".");
        const payload = JSON.parse(atob(parts[1]));
        dispatch(setIsLogin(true));
        dispatch(setIsMentor(payload.isTutor));
        setCookie("jwtToken", jwtToken, {
          path: "/",
          secure: false,
          sameSite: "lax",
        });
        window.alert(`${getNicknameFromToken(jwtToken)}님 환영합니다!`);
        if (payload.isTutor) navigate("/mentor");
        else navigate("/mentee");
      } else {
        const kakaoInfo = { code: code, ...res.data };
        dispatch(setKakaoInfo(kakaoInfo));
      }
      setIsLoading(false);
    };

    if (currentCode !== code) fetchData();
  }, []);

  // 카카오 유저가 기존 회원인지 신규 회원인지 확인하고 신규 회원이면 멘토/멘티 회원가입 페이지, 기존 회원이면 홈

  if (isLoading) return <div>loading...</div>;
  return (
    <ListWrapper>
      <Link to={`${FRONT_URL}/${OAUTH_KAKAO_MENTOR_SIGNUP}`}>
        멘토 회원가입
      </Link>
      <Link to={`${FRONT_URL}/${SIGNUP_MENTEE}`}>멘티 회원가입</Link>
    </ListWrapper>
  );
};

export default KakaoRedirect;

const ListWrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  gap: 3rem;
  a {
    text-decoration: none;
    padding: 18rem 8rem;
    border: 1px solid black;
    border-radius: 2rem;
    font-size: 2rem;
    font-weight: 600;
    cursor: pointer;
    color: white;
    :first-child {
      background-color: ${colors.primaryBlue};
    }
    :last-child {
      background-color: ${colors.secondaryBlue};
    }
  }
`;
