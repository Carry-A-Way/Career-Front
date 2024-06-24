import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getKakaoOauthToken, getKakaoUserInfo } from "../../api/oauth/kakao";

const KakaoRedirect = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await getKakaoOauthToken(code); // 첫 번째 비동기 함수 실행
      await getKakaoUserInfo(); // 두 번째 비동기 함수 실행
      setIsLoading(false);
    };

    fetchData();
  }, [code]);

  if (isLoading) return <div>loading...</div>;
  return <div>kakao redirect page</div>;
};

export default KakaoRedirect;
