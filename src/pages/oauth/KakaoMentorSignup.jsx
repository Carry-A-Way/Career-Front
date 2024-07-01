import { useState } from "react";
import { ButtonDiv } from "../../components/Button/Button";
import MenuLine from "../../components/Line/MenuLine";
import HorizontalLine from "../../components/Line/HorizontalLine";
import Input from "../../components/Input/Input";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";
import { checkValidNickname } from "../../api/checkValid";
import TitleWithBar from "../../components/Input/InputWithTitle";
import {
  Label,
  Radio,
  SignupButton,
  ValidWrapper,
} from "../../styles/common/FormComponents";
import { phoneNumberParse } from "../../utils/ParseFormat";
import { useDispatch, useSelector } from "react-redux";
import { kakaoSignup } from "../../api/oauth/kakao";
import { setCookie } from "../../cookie";
import { useNavigate } from "react-router-dom";
import { setIsLogin } from "../../store/isLoginSlice";
import { setIsMentor } from "../../store/isMentorSlice";
import { getNicknameFromToken } from "../../auth/jwtFunctions";
function KakaoMentorSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const kakaoInfo = useSelector((state) => state.kakaoInfo);
  const validUsername = true;
  const [validNickname, setValidNickname] = useState(false);
  const [numberCode, setNumberCode] = useState("");
  const [user, setUser] = useState({
    name: kakaoInfo.name, //필수
    username: kakaoInfo.email, //필수
    nickname: "", //필수
    password: "", //필수
    birth: "", //필수
    gender: kakaoInfo.gender === "male" ? true : false, //필수
    telephone: "",
    email: kakaoInfo.email,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validUsername) window.alert("아이디 중복확인이 필요합니다.");
    else if (!validNickname) window.alert("닉네임 중복확인이 필요합니다.");
    else {
      setUser((user) => ({
        ...user,
      }));

      const jsonData = {
        name: user.name, //필수
        username: user.username, //필수
        nickname: user.nickname, //필수
        telephone: user.telephone,
        birth: user.birth.replace(/-/g, ""), //필수
        gender: user.gender, //필수
        isTutor: true,
        email: user.email,
        snsId: kakaoInfo.id,
      };
      const response = await kakaoSignup(jsonData);
      if (response.status === 200) {
        window.alert("카카오 회원가입이 완료되었습니다.");
        const jwtToken = response.data.token;
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
        window.alert("오류가 발생했습니다. 다시 시도해 주세요.");
        navigate("/login");
      }
    }
  };
  return (
    <>
      <Title>
        <MenuLine />
        <span>멘토 회원가입</span>
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
                disabled={user.name !== ""}
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
                disabled={user.username !== ""}
              />
            </InputForm>
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
                disabled={user.email !== ""}
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
              <Label className="signup-input__label" isChecked={!user.gender}>
                <Radio
                  type="radio"
                  name="gender"
                  value="여자"
                  onChange={
                    () => setUser((user) => ({ ...user, gender: false })) //true: 남자, false: 여자
                  }
                  checked={!user.gender}
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
}

export default KakaoMentorSignup;

const InputForm = styled.div`
  display: flex;
  min-width: 300px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
`;

const Form = styled.form`
  width: 100%;
  height: 70%;
  display: flex;
  margin-top: 60px;
  flex-direction: column;
  align-items: center;
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

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  font-weight: 600;
  width: 15rem;
  justify-content: space-evenly;
  padding: 1.2rem 2.3rem;
`;
