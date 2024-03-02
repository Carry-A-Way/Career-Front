import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";
import {
  calculateAge,
  dateTimeParse,
  localToIsoParse,
  pad,
} from "../../utils/ParseFormat";
import { WhiteButton } from "../Button/WhiteButton";
import { setDefaultImage } from "../../utils/DefaultValue";
import { DefaultImg } from "../../settings/config";
import { useNavigate } from "react-router-dom";
import { CONSULT_MENTOR_INFO } from "../../settings/url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  deleteHeartToMentor,
  insertHeartToMentor,
} from "../../api/heartMentor";
import Wage from "../Wage/Wage";
import { MentorDetailCardSize } from "../../styles/common/Size";

const MentorDetailCard = ({ mentor, consult, refetch }) => {
  const { profileImg, name, birth, schoolList } = mentor;
  const majorList = [
    mentor.consultMajor1,
    mentor.consultMajor2,
    mentor.consultMajor3,
  ];
  const [IsDetailOpen, setIsDetailOpen] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const item = {
    startTime: localToIsoParse(new Date("2024-01-28T16:30")),
    endTime: localToIsoParse(new Date("2024-01-28")),
    major: "화학공학과",
    questions: "전망이 좋나요?\n 공부를 어떻게 하면 좋을지 모르겠어요.",
  };
  const [leftTime, setLeftTime] = useState("");
  const navigate = useNavigate();
  const onMoveUserPage = () => {
    navigate(`/${CONSULT_MENTOR_INFO}?userId=${mentor.id}`);
  };
  const checkConsultTime = () => {
    // 시간 렌더링 부분 생각해보기
    const now = new Date();
    // const afterOneHour = now.setHours(now.getHours() - 1);
    const startTime = new Date(String(item.startTime));
    const timeDiff = startTime - now;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const displayDays = days;
    const displayHours = hours % 24;
    const displayMinutes = minutes % 60;
    const displaySeconds = seconds % 60;

    setLeftTime(
      `상담까지 ${displayDays}일 ${pad(displayHours)}: ${pad(
        displayMinutes
      )}: ${pad(displaySeconds)} 남음`
    );

    if (displayDays === 0 && displayHours <= 1) setBtnDisable(false);
    else return setBtnDisable(true);
  };

  useEffect(() => {
    checkConsultTime();
  }, []);

  const onToggleHeart = async (e) => {
    e.stopPropagation();
    if (mentor.heart) {
      await deleteHeartToMentor(mentor.id);
    } else {
      await insertHeartToMentor(mentor.id);
    }
    if (!!refetch) refetch();
    else window.location.reload();
  };

  return (
    <StyledContainer>
      <FontAwesomeIcon
        icon={mentor.heart ? faHeartFull : faHeart}
        className={mentor.heart ? "heart-icon heart-full" : "heart-icon"}
        onClick={onToggleHeart}
      />
      <WageWrapper>
        <Wage wage={mentor.wage} />
      </WageWrapper>
      <ProfileWrapper>
        <img
          alt=""
          src={setDefaultImage(profileImg)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DefaultImg;
          }}
        />
        <Content>
          <header>
            {name} {!!birth && `(${calculateAge(birth)})`}
          </header>
          {!!schoolList && schoolList.length ? (
            schoolList.map((school, idx) =>
              school.schoolType === "대학교" ? (
                <main key={idx}>
                  <span>{school.schoolName}대학교</span>
                  <span>
                    {school.majorName} ({school.state})
                  </span>
                </main>
              ) : null
            )
          ) : (
            <main>
              <span>학교 미입력</span>
            </main>
          )}
          <footer>
            {!!majorList &&
              majorList.map(
                (major, idx) => !!major && <span key={idx}>#{major}</span>
              )}
          </footer>
        </Content>
      </ProfileWrapper>
      <InfoWrapper>
        <div className="main">
          <div className="main-content time">
            <div>상담 시작 : </div>
            <div> {dateTimeParse(item.startTime)}</div>
          </div>
          <div className="main-content time">
            <div>상담 종료 : </div>
            <div> {dateTimeParse(item.endTime)}</div>
          </div>
          <div className="main-content major">
            <div>상담할 전공 : </div>
            <div className="majorName">{item.major}</div>
          </div>
          <div className="main-content question">
            <div>주요 질문 :</div>
            <span className="full-name">{item.questions}</span>
            <div>{item.questions || "질문이 없습니다"}</div>
          </div>
        </div>
        {consult && (
          <LeftTime style={{ color: btnDisable ? "black" : "red" }}>
            {leftTime}
          </LeftTime>
        )}
        <div className="footer">
          {consult && (
            <WhiteButton
              onClick={() => setIsDetailOpen(true)}
              text="상담 입장"
              disabled={btnDisable}
            />
          )}
          <div className="button" onClick={onMoveUserPage}>
            자세히 보기
          </div>
        </div>
      </InfoWrapper>
    </StyledContainer>
  );
};

export default MentorDetailCard;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 14rem 23rem;
  grid-template-rows: 22rem;
  box-shadow: 1px 1px 10px ${colors.primaryBlue};
  border: 1px solid black;
  border-radius: 10px;
  position: relative;
  .heart-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    color: gray;
    cursor: pointer;
  }
  .heart-full {
    color: red;
  }
`;
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  .icon {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 2rem;
    background-color: #00000061;
    padding: 10px;
    border-radius: 50%;
  }
  img {
    width: 100%;
    height: 13rem;
    object-fit: cover;
    object-position: center;
    border-top-left-radius: 10px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
  text-align: center;
  font-size: 1rem;
  height: 11rem;
  background-color: #f5f5f5;
  box-sizing: border-box;
  border-bottom-left-radius: 10px;
  font-weight: 500;
  header {
    font-size: 1.2rem;
  }
  main {
    display: flex;
    flex-direction: column;
  }
  footer {
    display: flex;
    gap: 10px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem 2rem;
  justify-content: space-between;
  background-color: #f6f5f5;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 1px solid ${colors.primaryBlue};
  cursor: default;
  .main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1.1rem;
    .main-content {
      display: flex;
      align-items: center;
      height: 2rem;
      div:first-child {
        text-align: start;
        margin-right: 10px;
        white-space: nowrap;
      }
      div:last-child {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .majorName {
        background-color: ${(props) =>
          props.color === "#D9D9D9"
            ? "#9D9D9D"
            : "" || `${colors.primaryBlue}`};
        color: white;
        padding: 0.7rem;
        border-radius: 10px;
      }
    }
    .question {
      position: relative;
      &:hover {
        .full-name {
          visibility: visible;
        }
      }
    }
    .full-name {
      /* visibility: hidden; */
      position: absolute;
      bottom: 1.6rem;
      left: 5rem;
      color: black;
      background-color: #d5d5d5;
      visibility: hidden;
      padding: 0.2rem 0.5rem;
      border-radius: 10px;
      font-size: 0.8rem;
      text-align: center;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    gap: 1rem;
    .button {
      border: 1px solid ${colors.primaryBlue};
      padding: 0.7rem 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: ${(props) =>
          props.color === "#D9D9D9"
            ? "#9D9D9D"
            : "" || `${colors.primaryBlue}`};
        color: white;
      }
    }
  }
`;

const LeftTime = styled.div`
  margin: 0 auto;
`;

const WageWrapper = styled.div`
  position: absolute;
  top: -1rem;
  left: 50%;
  /* transform: translateX(-50%); */
`;
