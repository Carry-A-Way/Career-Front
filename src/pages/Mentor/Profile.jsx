import { useState, useRef, useEffect } from "react";
import { ButtonDiv } from "../../components/Button/Button";
import MenuLine from "../../components/Line/MenuLine";
import HorizontalLine from "../../components/Line/HorizontalLine";
import Input from "../../components/Input/Input";
import "react-datepicker/dist/react-datepicker.css";
import SchoolList from "../../components/List/SchoolList";
import CareerList from "../../components/List/CareerList";
import Image from "../../components/Image/Image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Form50,
  FormHalf,
  Title,
  Form,
  Wrapper,
  Label,
  InputForm,
  Radio,
  FileUpload,
  FileList,
  FileItem,
  FileUploadBtn,
  ValidWrapper,
} from "../../styles/common/FormComponents";
import TitleWithBar from "../../components/Input/InputWithTitle";
import ReviewList from "../../components/List/ReviewList";
import { ScrollUp } from "../../components/Scroll";
import TagList from "../../components/List/TagList";
import { fetchMentorProfile } from "../../api/fetchProfile";
import { useQuery } from "react-query";
import {
  birthHypenParse,
  birthOnlyNumberParse,
  phoneNumberParse,
} from "../../utils/ParseFormat";
import { checkValidNickname } from "../../api/checkValid";
import { CompareObjects } from "../../utils/CompareObjects";
import { modifyMentorProfile } from "../../api/modifyProfile";
import AlertModal from "../../components/Modal/AlertModal";
import { Review } from "../../settings/config";

const MentorProfile = (props) => {
  const [numberCode, setNumberCode] = useState("");
  const [view, setView] = useState(true);
  const [schoolList, setSchoolList] = useState([]);
  const [careerList, setCareerList] = useState([]);
  const [image, setImage] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [careerFile, setCareerFile] = useState([]);
  const [isFile, setIsFile] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [user, setUser] = useState(null);
  const { data, isLoading, refetch } = useQuery("profile", fetchMentorProfile, {
    // enabled: view,
    staleTime: 1000 * 60 * 10,
    onSuccess: (data) => {
      setUser({
        ...data,
        birth: birthHypenParse(data.birth),
      });
      setSchoolList([...data.schoolList]);
      setTagList([...data.tagList]);
      setCareerList([...data.careerList]);
      setImage(
        data.profileImg ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    },
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

  const fileUploadId = useRef(0);
  const onUploadFile = (e) => {
    if (!e.target.files?.length) return;
    const files = e.target.files;
    const len = files.length;

    for (let i = 0; i < len; i++) {
      const file_name = files[i].name.toLowerCase();
      setCareerFile((current) => {
        return [...current, { id: fileUploadId.current + i, name: file_name }];
      });
    }
    e.target.value = "";
    setIsFile(true);
  };

  console.log(data);

  const onDeleteFile = (id) => {
    setCareerFile(careerFile.filter((a) => a.id !== id));
  };

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
        let majorList = null;
        console.log("schoolList", schoolList);

        let checkSchoolList = schoolList.filter((school) => {
          // 모든 항목이 채워져 있는지 확인
          const isComplete = Object.values(school).every((value) => {
            // majorList가 배열인 경우, 배열의 모든 항목이 채워져 있는지 확인

            if (Array.isArray(value)) {
              console.log("value ", value);
              majorList = value;
              return value.every((major) =>
                Object.values(major).every((majorValue) => {
                  console.log("major value ", major, majorValue);
                  return majorValue;
                })
              );
            }
            // 일반 속성은 단순히 값이 있는지 확인
            return value;
          });
          console.log("iscomplete", isComplete);
          return isComplete;
        });

        if (checkSchoolList.length) {
          console.log("ok ", checkSchoolList, majorList);
          checkSchoolList = schoolList.map((school) => ({
            ...school,
            ...(majorList && majorList.length > 0 && { majorList }),
          }));
        }
        console.log("check school list ", checkSchoolList);
        const compareObj = CompareObjects(data, {
          ...user,
          birth: birthOnlyNumberParse(user.birth),
          tagList: [...tagList],
          schoolList: checkSchoolList,
          careerList: [...careerList],
        });
        console.log(compareObj);
        await modifyMentorProfile(compareObj, imgFile);
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
      data.schoolList && setSchoolList([...data.schoolList]);
      data.tagList && setTagList([...data.tagList]);
      data.careerList && setCareerList([...data.careerList]);
      setImage(
        data.profileImg ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    }
  }, [data]);

  useEffect(() => {
    fileUploadId.current = careerFile.length;
  }, [careerFile]);
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
            <TitleWithBar size="small" title="라이프" />
            <Input
              size="large"
              height="8rem"
              value={user.myLife}
              placeholder="최근 생각, 가치관, 목표 등 자유롭게 적어주세요."
              onChange={(e) =>
                setUser((prev) => ({ ...prev, myLife: e.target.value }))
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
        </FormHalf>
        <FormHalf>
          <Wrapper>
            <TitleWithBar size="small" title="이름" />
            <Input
              value={user.name}
              placeholder="이름을 입력하세요."
              disabled={true}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="아이디" />
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
            <TitleWithBar size="small" title="닉네임" />
            <InputForm>
              <Input
                value={user.nickname}
                placeholder={data.nickname}
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, nickname: e.target.value }));
                  setValidNickname(undefined);
                }}
                disabled={view}
                // onBlur={(e) => {
                //   if (e.target.value === "") {
                //     setUser((prev) => ({ ...prev, nickname: data.nickname }));
                //   }
                // }}
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
            <TitleWithBar size="small" title="이메일" />
            <Input
              placeholder={data.email}
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              // onBlur={(e) => {
              //   if (e.target.value === "") {
              //     setUser((prev) => ({ ...prev, email: data.email }));
              //   }
              // }}
              disabled={view}
            />
          </Wrapper>
          {/* <Wrapper>
            <TitleWithBar size="small" title="비밀번호" />
            <Input
              type="password"
              value={user.password}
              placeholder="비밀번호를 입력하세요."
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
              disabled={view}
            />
          </Wrapper>
          {!view && (
            <Wrapper>
              <TitleWithBar size="small" title="비밀번호 확인" />
              <Input
                type="password"
                value={password}
                placeholder="비밀번호를 다시 입력하세요."
                onChange={(e) => {
                  user.password === e.target.value
                    ? setConfirmPassword(true)
                    : setConfirmPassword(false);
                }}
              />
            </Wrapper>
          )} */}
          <Wrapper>
            <TitleWithBar size="small" title="생년월일" />
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
            <TitleWithBar size="small" title="전화번호" />
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
                // onBlur={(e) => {
                //   if (e.target.value === "") {
                //     setUser((prev) => ({ ...prev, telephone: data.telephone }));
                //   }
                // }}
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
            <TitleWithBar size="small" title="성별" />
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
        <Form50>
          {(user.schoolList?.length || !view) && (
            <Wrapper style={{ width: "100%" }}>
              <TitleWithBar
                size="small"
                title={view ? "학력" : "학력 (최대 5개)"}
              />
              <SchoolList
                schoolList={schoolList}
                setSchoolList={setSchoolList}
                view={view}
              />
            </Wrapper>
          )}
          {(user.careerList?.length || !view) && (
            <Wrapper style={{ width: "100%" }}>
              <TitleWithBar
                size="small"
                title={view ? "경력" : "경력 (최대 5개)"}
              />
              <CareerList
                careerList={careerList}
                setCareerList={setCareerList}
                view={view}
              />
            </Wrapper>
          )}
          <Wrapper>
            <TitleWithBar size="small" title="상담학과1" />
            <Input
              size="large"
              placeholder="첫번째 상담 학과를 입력하세요."
              onChange={(e) => {
                setUser((prev) => ({ ...prev, consultMajor1: e.target.value }));
              }}
              value={user.consultMajor1}
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="상담학과2" />
            <Input
              size="large"
              placeholder="두번째 상담 학과를 입력하세요."
              onChange={(e) => {
                setUser((prev) => ({ ...prev, consultMajor2: e.target.value }));
              }}
              value={user.consultMajor2}
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="상담학과3" />
            <InputForm>
              <Input
                size="large"
                placeholder="세번째 상담 학과를 입력하세요."
                onChange={(e) => {
                  setUser((prev) => ({
                    ...prev,
                    consultMajor3: e.target.value,
                  }));
                }}
                value={user.consultMajor3}
                disabled={view}
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="학력 증명" />
            <FileUpload>
              {careerFile.length ? (
                <FileList>
                  {careerFile.map((file) => {
                    return (
                      <FileItem>
                        <span>{file.name}</span>
                        <FontAwesomeIcon
                          className="icon"
                          icon={faXmark}
                          onClick={() => onDeleteFile(file.id)}
                        />
                      </FileItem>
                    );
                  })}
                </FileList>
              ) : (
                <FileList
                  style={{
                    color: "gray",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.8rem",
                  }}
                >
                  <span>증명서를 첨부해 주세요.</span>
                  <span>(졸업 증명서, 재학 증명서, ... 택1)</span>
                </FileList>
              )}
              {!view && (
                <FileUploadBtn
                  htmlFor="file"
                  style={{ pointerEvents: view ? "none" : "" }}
                >
                  업로드
                </FileUploadBtn>
              )}
              <input
                multiple
                type="file"
                id="file"
                onChange={onUploadFile}
                style={{ display: "none" }}
                disabled={view}
              />
            </FileUpload>
          </Wrapper>
        </Form50>
      </Form>
      <Form>
        <FormHalf>
          <Wrapper>
            <TitleWithBar size="small" title="활동 사진" />
            <ImageWrapper>
              <Image disabled={view} />
              <Image disabled={view} />
              <Image disabled={view} />
              <Image disabled={view} />
              <Image disabled={view} />
              <Image disabled={view} />
            </ImageWrapper>
          </Wrapper>
        </FormHalf>
        <FormHalf>
          <Wrapper>
            <TitleWithBar size="small" title="태그" />
            <TagList tagList={tagList} setTagList={setTagList} view={view} />
          </Wrapper>
        </FormHalf>
      </Form>
      {view && (
        <Form>
          <Form50>
            <Wrapper>
              {/* pagination 추가해야함 */}
              <TitleWithBar size="small" title="나에 대한 리뷰" />
              <ReviewList review={Review} />
            </Wrapper>
          </Form50>
        </Form>
      )}
      <Form style={{ marginBottom: "8rem" }}>
        <ButtonDiv onClick={onChangeEdit} size="large" height="3rem">
          {view ? "수정하기" : "저장하기"}
        </ButtonDiv>
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

export default MentorProfile;

const ProfileImg = styled.img`
  /* max-width: 200px;
  max-height: 220px; */
  width: 18rem;
  height: 19rem;
  margin-bottom: 10px;
  object-fit: cover;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 8rem);
  grid-template-rows: repeat(2, 8rem);
  width: 100%;
  height: 100%;
  gap: 10px;
`;
