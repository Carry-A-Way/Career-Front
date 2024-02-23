import { useState, useRef, useEffect } from "react";
import { ButtonDiv } from "../../components/Button/Button";
import MenuLine from "../../components/Line/MenuLine";
import HorizontalLine from "../../components/Line/HorizontalLine";
import Input from "../../components/Input/Input";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import {
  FormHalf,
  Title,
  Form,
  Wrapper,
  Label,
  InputForm,
  Radio,
  ValidWrapper,
} from "../../styles/common/FormComponents";
import TitleWithBar from "../../components/Input/InputWithTitle";
import { ScrollUp } from "../../components/Scroll";
import TagList from "../../components/List/TagList";
import { fetchMenteeProfile } from "../../api/fetchProfile";
import { useQuery } from "react-query";
import {
  birthHypenParse,
  birthOnlyNumberParse,
  phoneNumberParse,
} from "../../utils/ParseFormat";
import { checkValidNickname } from "../../api/checkValid";
import { CompareObjects } from "../../utils/CompareObjects";
import { modifyMenteeProfile } from "../../api/modifyProfile";
import AlertModal from "../../components/Modal/AlertModal";
import BottomFixButton from "../../components/Button/BottomFixButton";

const MenteeProfile = (props) => {
  const [numberCode, setNumberCode] = useState("");
  const [view, setView] = useState(true);
  const [image, setImage] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [user, setUser] = useState(null);
  const { data, isLoading, refetch } = useQuery("profile", fetchMenteeProfile, {
    // staleTime: 1000 * 60 * 10,
    onSuccess: (data) => {
      setUser({
        ...data,
        birth: birthHypenParse(data.birth),
      });
      setImage(
        data.profileImg ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    },
    refetchOnWindowFocus: false,
  });
  const [validNickname, setValidNickname] = useState(false);
  const fileInput = useRef(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const onChangeImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImgFile(file);
    // FileReader를 사용하여 이미지 데이터를 읽음
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result); // 이미지 데이터를 상태로 설정
      }
    };
    reader.readAsDataURL(file);

    setImgFile(file);
  };
  const onResetImg = () => {
    setImage(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    );
    setImgFile(null);
  };

  // console.log(data);

  const onChangeEdit = async (e) => {
    e.preventDefault();
    ScrollUp();
    if (view) {
      setView((current) => !current);
    } else {
      if (!validNickname && data.nickname !== user.nickname) {
        setAlertOpen(true);
      } else {
        setView((current) => !current);
        const compareObj = CompareObjects(data, {
          ...user,
          birth: birthOnlyNumberParse(user.birth),
          tagList: [...tagList],
        });
        console.log(compareObj);
        await modifyMenteeProfile(compareObj, imgFile);
        refetch();
      }
    }
  };

  useEffect(() => {
    if (!!data) {
      setUser({
        ...data,
        birth: birthHypenParse(data.birth),
      });
      setTagList([...data.tagList]);
      setImage(
        data.profileImg ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    }
  }, [data]);

  if (isLoading || user === null) return <div>loading...</div>;
  return (
    <>
      <Title>
        <MenuLine />
        <span>내 프로필</span>
      </Title>
      <HorizontalLine />
      <Form>
        <FormHalf>
          <Wrapper>
            <TitleWithBar size="small" title="프로필 사진" />
            <ProfileImg
              src={image || data.profileImg}
              alt=""
              onClick={() => {
                fileInput.current.click();
              }}
            />
            {!view && (
              <span
                style={{
                  width: "18rem",
                  textAlign: "center",
                  color: "#334b6c",
                  cursor: "pointer",
                  fontWeight: "600",
                  marginBottom: "2rem",
                }}
                onClick={onResetImg}
              >
                이미지 삭제하기
              </span>
            )}
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              onChange={onChangeImg}
              ref={fileInput}
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="소개글" />
            <Input
              size="large"
              height="8rem"
              value={user.introduce}
              placeholder="소개글을 작성하세요."
              onChange={(e) =>
                setUser((prev) => ({ ...prev, introduce: e.target.value }))
              }
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="취미" />
            <Input
              size="large"
              value={user.hobby}
              placeholder="취미를 작성해 주세요."
              onChange={(e) =>
                setUser((prev) => ({ ...prev, hobby: e.target.value }))
              }
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="태그" />
            <TagList tagList={tagList} setTagList={setTagList} view={view} />
          </Wrapper>
        </FormHalf>

        {/* 우측 입력창 */}
        <FormHalf>
          <Wrapper>
            <TitleWithBar size="small" title="이름" required={true} />
            <Input
              value={user.name}
              placeholder="이름을 입력하세요."
              disabled={true}
              required={true}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="아이디" required={true} />
            <Input
              placeholder="아이디를 입력하세요."
              value={user.username}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, username: e.target.value }))
              }
              disabled={true}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="닉네임" required={true} />
            <InputForm>
              <Input
                value={user.nickname}
                placeholder={data.nickname}
                onChange={(e) => {
                  console.log(e.target.value);
                  setUser((prev) => ({ ...prev, nickname: e.target.value }));
                  setValidNickname(undefined);
                }}
                disabled={view}
                onBlur={() => {
                  if (user.nickname === "") {
                    setUser((prev) => ({ ...prev, nickname: data.nickname }));
                  }
                }}
              />
              {!view && user.nickname && user.nickname !== data.nickname && (
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
              )}
            </InputForm>
            <ValidWrapper>
              {!view &&
                validNickname === undefined &&
                user.nickname &&
                user.nickname !== data.nickname && (
                  <span>닉네임 중복확인이 필요합니다.</span>
                )}
              {!view &&
                validNickname === false &&
                user.nickname &&
                user.nickname !== data.nickname && (
                  <span>이미 사용중인 닉네임입니다.</span>
                )}
              {!view && validNickname === true && (
                <span>사용가능한 닉네임입니다.</span>
              )}
            </ValidWrapper>
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="생년월일" required={true} />
            <Input
              type="date"
              value={user.birth}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, birth: e.target.value }))
              }
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="전화번호" required={true} />
            <InputForm>
              <Input
                value={user.telephone}
                placeholder={data.telephone}
                onChange={(e) => {
                  const withHypenNumber = phoneNumberParse(e.target.value);
                  setUser((prev) => ({
                    ...prev,
                    telephone: withHypenNumber,
                  }));
                }}
                onBlur={() => {
                  if (user.telephone === "") {
                    setUser((prev) => ({ ...prev, telephone: data.telephone }));
                  }
                }}
                disabled={view}
              />

              {!view && user.telephone && user.telephone !== data.telephone && (
                <ButtonDiv height="3rem">인증코드 전송</ButtonDiv>
              )}
            </InputForm>
            {!view && user.telephone && user.telephone !== data.telephone && (
              <InputForm>
                <Input
                  placeholder="인증코드를 입력하세요."
                  onChange={(e) => setNumberCode(e.target.value)}
                  value={numberCode}
                />
                <ButtonDiv height="3rem">확인</ButtonDiv>
              </InputForm>
            )}
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="이메일" required={true} />
            <Input
              placeholder={data.email}
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              onBlur={() => {
                if (user.email === "") {
                  setUser((prev) => ({ ...prev, email: data.email }));
                }
              }}
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="성별" required={true} />
            <InputForm>
              <Label style={{ pointerEvents: view ? "none" : "" }}>
                <Radio
                  type="radio"
                  name="gender"
                  value="남자"
                  onChange={() =>
                    setUser((prev) => ({ ...prev, gender: true }))
                  }
                  checked={user.gender}
                  disabled={view}
                />
                <div style={{ color: view ? "gray" : "", fontSize: "1.3rem" }}>
                  남자
                </div>
              </Label>
              <Label style={{ pointerEvents: view ? "none" : "" }}>
                <Radio
                  type="radio"
                  name="gender"
                  value="여자"
                  placeholder="닉네임을 입력하세요."
                  onChange={() =>
                    setUser((prev) => ({ ...prev, gender: false }))
                  }
                  checked={!user.gender}
                  disabled={view}
                />
                <div style={{ color: view ? "gray" : "", fontSize: "1.3rem" }}>
                  여자
                </div>
              </Label>
            </InputForm>
          </Wrapper>
        </FormHalf>
      </Form>
      {/* 여기는 아래 부분 */}
      <Form>
        <FormHalf>
          <Wrapper>
            <TitleWithBar size="small" title="관심학과1" />
            <Input
              size="large"
              placeholder="첫번째 관심 학과를 입력하세요."
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  interestingMajor1: e.target.value,
                }));
              }}
              value={user.interestingMajor1}
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="관심학과2" />
            <Input
              size="large"
              placeholder="두번째 관심 학과를 입력하세요."
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  interestingMajor2: e.target.value,
                }));
              }}
              value={user.interestingMajor2}
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="관심학과3" />
            <InputForm>
              <Input
                size="large"
                placeholder="세번째 관심 학과를 입력하세요."
                onChange={(e) => {
                  setUser((prev) => ({
                    ...prev,
                    interestingMajor3: e.target.value,
                  }));
                }}
                value={user.interestingMajor3}
                disabled={view}
              />
            </InputForm>
          </Wrapper>
        </FormHalf>
      </Form>
      <Form style={{ marginBottom: "8rem" }}>
        <BottomFixButton onClick={onChangeEdit}>
          {view ? "수정하기" : "저장하기"}
        </BottomFixButton>
      </Form>
      {alertOpen && (
        <AlertModal
          message="닉네임 중복확인이 필요합니다."
          setModalOpen={setAlertOpen}
        />
      )}
    </>
  );
};

export default MenteeProfile;

const ProfileImg = styled.img`
  /* max-width: 200px;
  max-height: 220px; */
  width: 18rem;
  height: 19rem;
  margin-bottom: 10px;
  object-fit: cover;
  cursor: pointer;
`;
