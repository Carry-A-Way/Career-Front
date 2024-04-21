import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchUserInfo } from "../api/fetchUser";
import { useQuery } from "react-query";
import {
  CenterContainer,
  NameWrapper,
  ProfileContainer,
  ProfileImgWrapper,
  Tag,
  TagWrapper,
  TextBox,
  UserCardLayout,
} from "../styles/common/UserCard";
import SchoolItemShow from "../components/List/SchoolItemShow";
import SchoolItem from "../components/List/SchoolItem";
import { FAQ, Review } from "../settings/config";
import BottomFixButton from "../components/Button/BottomFixButton";
import { calculateAge, dateTimeParse } from "../utils/ParseFormat";
import ProfileImage from "../components/Image/ProfileImage";
import ReviewList from "../components/List/ReviewList";
import FAQList from "../components/List/FAQList";
import HorizontalLine from "../components/Line/HorizontalLine";
import { colors } from "../styles/common/Theme";
import styled from "styled-components";
import { ScrollUp } from "../components/Scroll";

const ConsultMentorCard = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userId = query.get("userId");
  const { isLoading, data: userData } = useQuery(
    userId,
    () => fetchUserInfo(57),
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(userData);

  const tmpData = {
    myRequest:
      "저는 자신감이 부족한 편입니다. 남들이랑 비교하지 않고 제 공부에 집중하는 방법을 배우고 싶어요. 또, 슬럼프를 극복했던 경험이 있다면 제게 조언해주세요.",
    startTime: "2024-02-11T20:01:27",
    endTime: "2024-02-11T21:01:26",
    major: "전자공학과",
  };
  const univName = () => {
    const univ = userData.schoolList.filter(
      (school) => school.schoolType === "대학교"
    );
    const univName = univ.length > 0 ? univ[0].schoolName : "";
    const univMajor = univ.length > 0 ? univ[0].majorName : "";

    if (!!univName) {
      return (
        <div className="user-univ">
          {univName}대학교 {univMajor}
        </div>
      );
    }
    return (
      <div className="user-univ" style={{ color: "gray" }}>
        학력 미입력
      </div>
    );
  };

  useEffect(() => {
    ScrollUp();
  }, []);
  if (isLoading || !userData) {
    return <UserCardLayout>loading...</UserCardLayout>;
  } else
    return (
      <>
        <UserCardLayout>
          <ProfileContainer>
            <NameWrapper>
              <div className="user-name">
                {userData.isTutor ? "멘토" : "멘티"} {userData.name} (
                {calculateAge(userData.birth)})
              </div>
              {univName()}
            </NameWrapper>
            <TagWrapper>
              {userData.consultMajor1 && <Tag>#{userData.consultMajor1}</Tag>}
              {userData.consultMajor2 && <Tag>#{userData.consultMajor2}</Tag>}
              {userData.consultMajor3 && <Tag>#{userData.consultMajor3}</Tag>}
            </TagWrapper>
            <ProfileImgWrapper>
              <ProfileImage
                profileImg={userData.profileImg}
                width="100%"
                height="100%"
              />
            </ProfileImgWrapper>
          </ProfileContainer>
          <CenterContainer>
            <ColorText>
              상담 예정 시간 : {dateTimeParse(tmpData.startTime)} ~{" "}
              {dateTimeParse(tmpData.endTime)}
            </ColorText>
            <ColorText>상담할 전공 : {tmpData.major}</ColorText>
          </CenterContainer>
          <CenterContainer>
            <div className="title" style={{ color: colors.secondaryBlue }}>
              나의 요청사항
            </div>
            <BlueTextBox>
              {tmpData.myRequest ? tmpData.myRequest : "요청사항이 없습니다."}
            </BlueTextBox>
          </CenterContainer>
          <HorizontalLine />
          <CenterContainer>
            <div className="title">멘토의 소개글</div>
            <TextBox>
              {userData.introduce ? userData.introduce : "소개글이 없습니다."}
            </TextBox>
          </CenterContainer>
          <CenterContainer>
            <div className="title">멘토의 라이프</div>
            <TextBox>
              {userData.introduce
                ? userData.introduce
                : "라이프 관련 글이 없습니다."}
            </TextBox>
          </CenterContainer>
          {userData.isTutor && userData.schoolList?.length > 0 && (
            <CenterContainer>
              <div className="title">
                {userData.isTutor ? "멘토" : "멘티"}의 학력
              </div>
              {userData.schoolList.map((school, idx) => (
                <SchoolItemShow item={school} index={idx} />
              ))}
            </CenterContainer>
          )}
          {userData.isTutor && userData.schoolList?.length > 0 && (
            <CenterContainer>
              <div className="title">
                {userData.isTutor ? "멘토" : "멘티"}의 경력
              </div>
              {userData.schoolList.map((school, idx) => (
                <SchoolItem item={school} index={idx} view={true} />
              ))}
            </CenterContainer>
          )}
          {userData.isTutor && (
            <CenterContainer>
              <div className="title">멘토가 받은 후기</div>
              <ReviewList review={Review} />
            </CenterContainer>
          )}
          {userData.isTutor && (
            <CenterContainer>
              <div className="title">대표 질문 FAQ</div>
              <FAQList FAQ={FAQ} />
            </CenterContainer>
          )}
        </UserCardLayout>
        <BottomFixButton>상담 입장하기</BottomFixButton>
      </>
    );
};

export default ConsultMentorCard;

const BlueTextBox = styled(TextBox)`
  border-color: ${colors.secondaryBlue};
  color: ${colors.secondaryBlue};
  font-weight: 700;
`;

const ColorText = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${colors.secondaryBlue};
`;
