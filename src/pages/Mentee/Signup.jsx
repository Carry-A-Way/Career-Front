import React from "react";
import axios from "axios";
import { useState } from "react";
import { ButtonDiv } from "../../components/Button/Button";
import MenuLine from "../../components/Line/MenuLine";
import HorizontalLine from "../../components/Line/HorizontalLine";
import Input from "../../components/Input/Input";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { SV_LOCAL } from "../../constants";
import { colors } from "../../styles/common/Theme";
import { useNavigate } from "react-router-dom";
import { checkValidNickname, checkValidUsername } from "../../api/checkValid";
import TitleWithBar from "../../components/Input/InputWithTitle";
import {
  Label,
  Radio,
  SignupButton,
  ValidWrapper,
} from "../../styles/common/FormComponents";
import { phoneNumberParse } from "../../utils/ParseFormat";

const Signup = (props) => {
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [numberCode, setNumberCode] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [validNickname, setValidNickname] = useState(false);

  const [user, setUser] = useState({
    name: "", //필수
    username: "", //필수
    nickname: "", //필수
    password: "", //필수
    confirmPassword: "",
    birth: "", //필수
    gender: true, //필수
    introduce: "",
    telephone: "",
    consultMajor1: "",
    consultMajor2: "",
    consultMajor3: "",
    plan: "",
    hobby: "",
    schoolList: [],
    careerList: [],
    tagList: [],
    email: "",
  });
  const navigator = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    if (!validUsername) window.alert("아이디 중복확인이 필요합니다.");
    else if (!validNickname) window.alert("닉네임 중복확인이 필요합니다.");
    else if (!confirmPassword) window.alert("비밀번호가 일치하지 않습니다.");
    else {
      setUser((user) => ({
        ...user,
      }));

      const formData = new FormData();

      const jsonData = {
        name: user.name, //필수
        username: user.username, //필수
        nickname: user.nickname, //필수
        password: user.password, //필수
        telephone: user.telephone,
        birth: user.birth.replace(/-/g, ""), //필수
        gender: user.gender, //필수
        isTutor: false,
        email: user.email,
      };
      console.log(jsonData);
      formData.append("json", JSON.stringify(jsonData));
      axios
        .post(`${SV_LOCAL}/user/signup/mentee`, jsonData)
        .then((res) => {
          window.alert("멘티 회원가입이 완료되었습니다.");
          navigator("/");
        })
        .catch((err) => {
          console.error(err);
          window.alert("회원가입에 실패하였습니다. 다시 시도해 주세요.");
        });
    }
  };
  return (
    <>
      <Title>
        <MenuLine />
        <span>멘티 회원가입</span>
      </Title>
      <HorizontalLine />
      {/* 여기는 아래 부분 */}
      <Form onSubmit={onSubmit}>
        <div className="Form50">
          <Wrapper>
            <TitleWithBar size="small" title="이름" required={true} />
            <InputForm>
              <Input
                required={true}
                placehaolder="이름을 입력하세요."
                value={user.name}
                onChange={(e) =>
                  setUser((user) => ({ ...user, name: e.target.value }))
                }
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="아이디" required="true" />
            <InputForm>
              <Input
                required={true}
                placeholder="아이디를 입력하세요."
                value={user.username}
                onChange={(e) => {
                  setUser((user) => ({ ...user, username: e.target.value }));
                  setValidUsername(undefined);
                }}
              />
              <ButtonDiv
                height="3rem"
                onClick={() => {
                  checkValidUsername(user.username).then((res) =>
                    setValidUsername(res)
                  );
                }}
                disabled={validUsername}
              >
                중복확인
              </ButtonDiv>
            </InputForm>
            <ValidWrapper>
              {validUsername === undefined && user.username && (
                <span>아이디 중복확인이 필요합니다.</span>
              )}
              {validUsername === false && user.username && (
                <span>이미 사용중인 아이디입니다.</span>
              )}
              {validUsername === true && <span>사용가능한 닉네임입니다.</span>}
            </ValidWrapper>
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="닉네임" required={true} />
            <InputForm>
              <Input
                required={true}
                placeholder="닉네임을 입력하세요."
                value={user.nickname}
                onChange={(e) => {
                  setUser((user) => ({ ...user, nickname: e.target.value }));
                  setValidNickname(undefined);
                }}
              />
              <ButtonDiv
                height="3rem"
                onClick={() => {
                  checkValidNickname(user.nickname).then((res) =>
                    setValidNickname(res)
                  );
                }}
                disabled={validNickname}
              >
                중복확인
              </ButtonDiv>
            </InputForm>
            <ValidWrapper>
              {validNickname === undefined && user.nickname && (
                <span>닉네임 중복확인이 필요합니다.</span>
              )}
              {validNickname === false && user.nickname && (
                <span>이미 사용중인 닉네임입니다.</span>
              )}
              {validNickname === true && <span>사용가능한 닉네임입니다.</span>}
            </ValidWrapper>
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="비밀번호" required={true} />
            <InputForm>
              <Input
                required={true}
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={user.password}
                onChange={(e) =>
                  setUser((user) => ({ ...user, password: e.target.value }))
                }
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="비밀번호 확인" required={true} />
            <InputForm>
              <Input
                required={true}
                type="password"
                placeholder="비밀번호를 다시 입력하세요."
                value={user.confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </InputForm>
            {confirmPassword !== "" &&
              confirmPassword !== user.password &&
              user.password && (
                <ValidWrapper>
                  <span>비밀번호가 일치하지 않습니다.</span>
                </ValidWrapper>
              )}
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="생년월일" required={true} />
            <InputForm>
              <Input
                required={true}
                type="date"
                value={user.birth}
                onChange={(e) => {
                  setUser((user) => ({ ...user, birth: e.target.value }));
                }}
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="전화번호" required={true} />
            <InputForm>
              <Input
                required={true}
                placeholder="010-1234-5678"
                value={user.telephone}
                onChange={(e) => {
                  const withHypenNumber = phoneNumberParse(e.target.value);
                  setUser((user) => ({
                    ...user,
                    telephone: withHypenNumber,
                  }));
                }}
              />
              <ButtonDiv
                height="3rem"
                onClick={() => alert("인증코드가 전송되었습니다.")}
              >
                인증코드 전송
              </ButtonDiv>
            </InputForm>
            <InputForm>
              <Input
                required={true}
                placeholder="인증코드를 입력하세요."
                value={numberCode}
                onChange={(e) => setNumberCode(e.target.value)}
              />
              <ButtonDiv height="3rem">확인</ButtonDiv>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="이메일" required={true} />
            <InputForm>
              <Input
                required={true}
                placeholder="이메일을 입력하세요."
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser((user) => ({ ...user, email: e.target.value }))
                }
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="성별" required={true} />
            <InputForm>
              <Label isChecked={user.gender}>
                <Radio
                  required
                  type="radio"
                  name="gender"
                  value="남자"
                  onChange={
                    () => setUser((user) => ({ ...user, gender: true })) //true: 남자, false: 여자
                  }
                  checked={user.gender}
                />
                <div>남자</div>
              </Label>
              <Label isChecked={!user.gender}>
                <Radio
                  type="radio"
                  name="gender"
                  value="여자"
                  onChange={
                    () => setUser((user) => ({ ...user, gender: false })) //true: 남자, false: 여자
                  }
                />
                <div>여자</div>
              </Label>
            </InputForm>
          </Wrapper>
        </div>
        <SignupButton>회원가입</SignupButton>
      </Form>
    </>
  );
};

export default Signup;

const InputForm = styled.div`
  display: flex;
  min-width: 300px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
  gap: 10px;
  .signup-input__radio {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0;
  }
  .signup-input__label {
    width: 10rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    color: gray;
    border-radius: 5px;
    box-sizing: border-box;
    &:hover {
      border: 2px solid #2f5383;
    }
    &:hover div,
    input:checked + div {
      color: #2f5383;
      font-weight: 600;
    }
    div {
      margin: 0 10px;
      height: 25px;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  .signup-subtitle {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1.3rem;
    span {
      margin-left: 1rem;
    }
  }
  > .valid-wrapper {
    display: flex;
    flex-direction: column;
    > span {
      font-size: 1.1rem;
      font-weight: 500;
      color: ${colors.primaryBlue};
    }
  }
`;

const Form = styled.form`
  width: 100%;
  height: 70%;
  display: flex;
  margin-top: 60px;
  flex-direction: column;
  align-items: center;
  .FormHalf {
    min-width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5rem;
  }
  .Form50 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .signup-submit__btn {
    background-color: ${colors.primaryBlue};
    color: white;
    padding: 1rem;
    width: 20rem;
    margin: 5rem 0;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
`;

const Required = styled.span`
  color: red;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  font-weight: 600;
  width: 15rem;
  justify-content: space-evenly;
  padding: 1.2rem 2.3rem;
`;
