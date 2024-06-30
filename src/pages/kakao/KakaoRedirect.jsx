import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  checkRegisterWithSnsId,
  getKakaoOauthToken,
  getKakaoUserInfo,
  kakaoCallback,
} from "../../api/oauth/kakao";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";
import { FRONT_URL } from "../../constants";
import { SIGNUP_MENTEE, SIGNUP_MENTOR } from "../../api/api";
import { OAUTH_KAKAO_MENTOR_SIGNUP } from "../../settings/url";
import { useDispatch } from "react-redux";
import { setKakaoInfo } from "../../store/kakaoInfoSlice";

const KakaoRedirect = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    // "name" : "",
    // "username" : "",
    // "nickname" : "",
    // "telephone": "",
    // "birth" : "",
    // "gender" : false,
    // "isTutor" : false,
    // "email" : "",
    // "snsId" : ""
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const kakaoInfo = await kakaoCallback(code);
      dispatch(setKakaoInfo(kakaoInfo));
      // await getKakaoOauthToken(code); // 첫 번째 비동기 함수 실행

      // const data = await getKakaoUserInfo(); // 두 번째 비동기 함수 실행
      // // //setUserInfo(JSON.stringify(data));
      // const kakao_info = { snsId: data.id, ...data.kakao_account };
      // dispatch(setKakaoInfo(kakao_info));
      // const isUser = await checkRegisterWithSnsId(data.id);
      // if (isUser) {
      //   navigate("/");
      // }
      setIsLoading(false);
    };

    fetchData();
  }, [code]);

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
