import React from "react";
import { useLocation } from "react-router-dom";
import { fetchUserInfo } from "../api/fetchUser";
import { useQuery } from "react-query";
import ProfileImage from "../components/Image/ProfileImage";
import SchoolItem from "../components/List/SchoolItem";
import ReviewList from "../components/List/ReviewList";
import { FAQ } from "../settings/config";
import FAQList from "../components/List/FAQList";
import { calculateAge } from "../utils/ParseFormat";
import BottomFixButton from "../components/Button/BottomFixButton";
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

const UserCard = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userId = query.get("userId");
  const { isLoading, data: userData } = useQuery(
    userId,
    () => fetchUserInfo(userId),
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(userData);

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
    return null;
  };

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
                <SchoolItemShow item={school} index={idx} key={idx} />
              ))}
            </CenterContainer>
          )}
          {userData.isTutor && userData.schoolList?.length > 0 && (
            <CenterContainer>
              <div className="title">
                {userData.isTutor ? "멘토" : "멘티"}의 경력
              </div>
              {userData.schoolList.map((school, idx) => (
                <SchoolItem item={school} index={idx} view={true} key={idx} />
              ))}
            </CenterContainer>
          )}
          {userData.isTutor && userData.review?.lenght > 0 && (
            <CenterContainer>
              <div className="title">멘토가 받은 후기</div>
              <ReviewList review={userData.review} />
            </CenterContainer>
          )}
          {userData.isTutor && (
            <CenterContainer>
              <div className="title">대표 질문 FAQ</div>
              <FAQList FAQ={FAQ} />
            </CenterContainer>
          )}
        </UserCardLayout>
        <BottomFixButton>상담 신청하기</BottomFixButton>
      </>
    );
};

export default UserCard;
