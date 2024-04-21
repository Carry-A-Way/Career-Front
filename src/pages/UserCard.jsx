import React from "react";
import { useLocation } from "react-router-dom";
import { fetchUserInfo } from "../api/fetchUser";
import { useQuery } from "react-query";
import ProfileImage from "../components/Image/ProfileImage";
import SchoolItem from "../components/List/SchoolItem";
import ReviewList from "../components/List/ReviewList";
// import { FAQ } from "../settings/config";
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
import Wage from "../components/Wage/Wage";

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
              <Wage wage={userData.wage} />
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
              {userData.introduce
                ? userData.introduce
                : "등록된 소개글이 없습니다."}
            </TextBox>
          </CenterContainer>
          <CenterContainer>
            <div className="title">멘토의 라이프</div>
            <TextBox>
              {userData.introduce
                ? userData.introduce
                : "등록된 라이프 정보가 없습니다."}
            </TextBox>
          </CenterContainer>
          {userData.isTutor && (
            <CenterContainer>
              <div className="title">
                {userData.isTutor ? "멘토" : "멘티"}의 학력
              </div>
              {userData.schoolList?.length > 0 ? (
                userData.schoolList.map((school, idx) => (
                  <SchoolItemShow item={school} index={idx} key={idx} />
                ))
              ) : (
                <span>등록된 학력이 없습니다.</span>
              )}
            </CenterContainer>
          )}
          {userData.isTutor && (
            <CenterContainer>
              <div className="title">
                {userData.isTutor ? "멘토" : "멘티"}의 경력
              </div>

              {userData.career?.length > 0 ? (
                userData.career.map((careerItem, idx) => (
                  <SchoolItemShow item={careerItem} index={idx} key={idx} />
                ))
              ) : (
                <span>등록된 경력이 없습니다.</span>
              )}
            </CenterContainer>
          )}
          {userData.isTutor && (
            <CenterContainer>
              <div className="title">멘토가 받은 후기</div>
              {userData.review?.lenght > 0 ? (
                <ReviewList review={userData.review} />
              ) : (
                <span>등록된 후기가 없습니다.</span>
              )}
            </CenterContainer>
          )}
          {userData.isTutor && (
            <CenterContainer>
              <div className="title">대표 질문 FAQ</div>
              {userData.faq.length > 0 ? (
                <FAQList FAQ={userData.faq} />
              ) : (
                <span>등록된 대표 질문이 없습니다.</span>
              )}
            </CenterContainer>
          )}
        </UserCardLayout>
        <BottomFixButton>상담 신청하기</BottomFixButton>
      </>
    );
};

export default UserCard;
