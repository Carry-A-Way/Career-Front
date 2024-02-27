import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../cookie";
import { FRONT_URL } from "../../constants";
import { setIsMentor } from "../../store/isMentorSlice";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../../store/isLoginSlice";
import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import VerticalLine from "../../components/Line/VerticalLine";
import { handleLogin } from "../../api/login";
import { getNicknameFromToken } from "../../auth/jwtFunctions";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    const responseData = await handleLogin(id, password);
    if (!!responseData) {
      const jwtToken = responseData.token;
      const parts = jwtToken.split(".");
      const payload = JSON.parse(atob(parts[1]));
      dispatch(setIsLogin(true));
      dispatch(setIsMentor(payload.isTutor));
      setCookie("jwtToken", jwtToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      window.alert(`${getNicknameFromToken(jwtToken)}님 환영합니다!`);
      if (payload.isTutor) navigate("/mentor");
      else navigate("/mentee");
    } else window.alert("로그인 정보가 없습니다.");
  };

  return (
    <LoginLayout>
      <FormWrapper>
        <Title>로그인</Title>
        <Form action="" onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="아이디를 입력하세요."
            onChange={(e) => setId(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button height="4rem">로그인</Button>
        </Form>
        <Link to={`${FRONT_URL}/password`}>비밀번호를 잊으셨나요?</Link>
        <SignupOption>
          <Link to={`${FRONT_URL}/signup/mentor`} className="signup__link">
            멘토 회원가입
          </Link>
          <VerticalLine />
          <Link to={`${FRONT_URL}/signup/mentee`} className="signup__link">
            멘티 회원가입
          </Link>
        </SignupOption>
        <SocialLogin>
          <ColorButton
            style={{
              backgroundColor: "#fee501",
              color: "black",
            }}
          >
            카카오로 시작하기
          </ColorButton>
          <ColorButton style={{ backgroundColor: "#02c75a" }}>
            네이버로 시작하기
          </ColorButton>
          <ColorButton style={{ backgroundColor: "#39529a" }}>
            페이스북으로 시작하기
          </ColorButton>
        </SocialLogin>
      </FormWrapper>
    </LoginLayout>
  );
}

export default Login;

const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
`;

const FormWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  a {
    text-decoration: none;
    color: black;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  padding-bottom: 2.5rem;
`;

const Input = styled.input`
  margin-bottom: 10px;
  height: 4rem;
  width: 25rem;
  text-align: center;
  box-sizing: border-box;
  font-size: 1rem;
  border-radius: 5px;
  border: 2px solid #334b6c;
`;

const SignupOption = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  justify-content: center;
  height: 1.2rem;
  .signup__link {
    margin: 0 1rem;
    &:hover {
      font-weight: 600;
    }
  }
`;

const SocialLogin = styled.section`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ColorButton = styled.div`
  height: 4rem;
  width: 25rem;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
