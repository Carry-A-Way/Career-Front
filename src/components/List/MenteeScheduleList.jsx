import React, { Fragment, useEffect, useState } from "react";
import { dateParse, dateTimeParse, timeParse } from "../../utils/ParseFormat";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getCookie } from "../../cookie";
import { SV_LOCAL } from "../../constants";
import { colors } from "../../styles/common/Theme";

const MenteeScheduleList = () => {
  const [pendingConsult, setPendingConsult] = useState([]);
  const [upcomingConsult, setUpcomingConsult] = useState([]);
  const [upcomingDetailId, setUpcomingDetailId] = useState("");
  const [pendingDetailId, setPendingDetailId] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailObject, setDetailObject] = useState({ type: "", object: {} });

  const acceptConsult = async () => {
    try {
      await axios.post(
        `${SV_LOCAL}/calendar/mentor/accept`,
        {
          consultId: detailObject.object.consultId,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      );
      setUpcomingConsult([...upcomingConsult, detailObject.object]);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const rejectConsult = async (reason) => {
    try {
      await axios.post(
        `${SV_LOCAL}/calendar/mentor/deny`,
        {
          consultId: detailObject.object.consultId,
          reason: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      );
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const enterZoomLink = () => {
    window.open(`${detailObject.object.zoomLink}`, "_blank");
  };

  useEffect(() => {
    if (isDetailOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isDetailOpen]);

  useEffect(() => {
    axios
      .get(`${SV_LOCAL}/consultation/mentor`, {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      })
      .then((res) => {
        const consultDataList = res.data.object;
        setPendingConsult([...consultDataList.lastUpcomingConsult]);
        setUpcomingConsult([...consultDataList.upcomingConsult]);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <ListWrapper>
        <List>
          <h1 className="list-title">예정된 상담 ({upcomingConsult.length})</h1>
          <ul className="header">
            <li>No</li>
            <li>닉네임</li>
            <li>날짜</li>
            <li>시간</li>
            <li></li>
          </ul>
          {upcomingConsult.length === 0 && (
            <ul
              className="main"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <li
                style={{
                  padding: "1rem 0",
                  textAlign: "center",
                }}
              >
                예정된 상담이 없습니다.
              </li>
            </ul>
          )}
          {upcomingConsult &&
            upcomingConsult.map((upcoming, upcomingIdx) => (
              <Fragment key={upcoming.id}>
                <ul className="main">
                  <li>{upcomingIdx + 1}</li>
                  <li>{upcoming.student.nickname}</li>
                  <li>{dateParse(upcoming.startTime)}</li>
                  <li>
                    {timeParse(upcoming.startTime)} ~{" "}
                    {timeParse(upcoming.endTime)}
                  </li>
                  <li>
                    {upcomingDetailId === upcomingIdx ? (
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="icon"
                        onClick={() => {
                          setUpcomingDetailId("");
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="icon"
                        onClick={() => {
                          setUpcomingDetailId(upcomingIdx);
                        }}
                      />
                    )}
                  </li>
                </ul>
                {upcomingIdx === upcomingDetailId && (
                  <div className="main-detail">
                    <div className="main-detail__item">
                      <span className="item__title">- 상담할 전공 : </span>
                      <span className="item__content">{upcoming.major}</span>
                    </div>
                    <div className="main-detail__item">
                      <span className="item__title">- 상담 방식 : </span>
                      <span className="item__content">{upcoming.flow}</span>
                    </div>
                    <div className="main-detail__item">
                      <span className="item__title">- 주요 질문 : </span>
                      <div className="question-wrapper">
                        <p className="item__content">{upcoming.questions}</p>
                      </div>
                    </div>
                    <button
                      className="detail-btn"
                      onClick={() => {
                        setDetailObject({ type: "0", object: { ...upcoming } });
                        setIsDetailOpen(true);
                      }}
                    >
                      자세히 보기
                    </button>
                  </div>
                )}
              </Fragment>
            ))}
        </List>
      </ListWrapper>
      {isDetailOpen && (
        <ModalWrapper onClick={() => setIsDetailOpen(false)}>
          <DetailModal onClick={(e) => e.stopPropagation()}>
            <header className="detail-header">
              <div
                className="detail-header__img"
                img={detailObject.object.student.profileImg}
              ></div>
              <span className="detail-header__name">
                {detailObject.object.student.nickname}
              </span>
              <div className="detail-header__date">
                상담 예정 시간 : {dateTimeParse(detailObject.object.startTime)}{" "}
                ~ {dateTimeParse(detailObject.object.endTime)}
              </div>
              <FontAwesomeIcon
                icon={faXmark}
                className="icon"
                onClick={() => setIsDetailOpen(false)}
              />
            </header>
            <main>
              <div className="detail-main detail-consult">
                <div className="detail-main__title">상담 내용</div>
                <div className="detail-main__content">
                  {detailObject.object.questions}
                </div>
              </div>
              <div className="detail-main-row">
                <div className="detail-main detail-row__item">
                  <div className="detail-main__title">원하는 상담 스타일</div>
                  <div className="detail-main__tag-wrapper">
                    {detailObject.object.flow
                      .split("#")
                      .slice(1)
                      .map((type, typeIdx) => (
                        <div className="detail-main__tag" key={typeIdx}>
                          <div className="detail-main__tag">#{type}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </main>
            <footer className="detail-footer">
              <span
                className="detail-footer__btn"
                onClick={() => {
                  if (detailObject.type === "0") {
                    var result = window.prompt(
                      "상담을 취소하시겠습니까? 사유를 적어주세요."
                    );
                    setDetailObject({ ...detailObject, reason: result || "" });
                    if (result !== null) {
                      console.log(result);
                      alert("상담이 취소되었습니다.");
                      setIsDetailOpen(false);
                      rejectConsult(result);
                    }
                  } else {
                    result = window.prompt(
                      "상담을 거절하시겠습니까? 사유를 적어주세요."
                    );
                    setDetailObject((prev) => ({
                      ...prev,
                      object: { ...prev.object, reason: result || "" },
                    }));
                    if (result !== null) {
                      alert("상담이 거절되었습니다.");
                      setIsDetailOpen(false);
                      rejectConsult(result);
                    }
                  }
                }}
              >
                {detailObject.type === "0" ? "상담 취소하기" : "상담 거절하기"}
              </span>
              <span
                className="detail-footer__btn"
                onClick={() => {
                  if (detailObject.type === "0") {
                    var result =
                      window.confirm("상담 링크에 접속하시겠습니까?");
                    if (result) {
                      enterZoomLink();
                      setIsDetailOpen(false);
                    }
                  } else {
                    result = window.confirm("상담을 수락하시겠습니까?");
                    if (result) {
                      alert("상담이 수락되었습니다.");
                      setIsDetailOpen(false);
                      acceptConsult();
                    }
                  }
                }}
              >
                {detailObject.type === "0" ? "상담 입장하기" : "상담 수락하기"}
              </span>
            </footer>
          </DetailModal>
        </ModalWrapper>
      )}
    </>
  );
};

export default MenteeScheduleList;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
const List = styled.div`
  width: 30rem;
  max-width: 40vw;
  font-size: 1rem;
  .list-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  > .header,
  .main {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: ${colors.primaryBlue};
    color: white;
    gap: 0.5rem;
    li {
      flex: 2;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:first-child,
      &:last-child {
        flex: 0.5;
      }
      > .icon {
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }
  > .main {
    background-color: white;
    color: black;
    border: 1px solid lightgray;
    border-top: none;
  }
  .main-detail {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.7rem;
    border: 1px solid lightgray;
    border-top: none;
    &__item {
      display: flex;
      width: 100%;
      .item__title {
        width: 25%;
        padding-left: 1rem;
      }
      .item__content {
        font-weight: 700;
        color: #334b6c;
      }
      .question-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
    }
    .detail-btn {
      margin: 1rem auto 0;
      padding: 0.3rem 2rem;
      background-color: transparent;
      border: 1px solid gray;
      border-radius: 5px;
      font-size: 1.1rem;
      cursor: pointer;
      &:hover {
        background-color: #334b6c;
        color: white;
      }
    }
  }
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #8080806d;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const DetailModal = styled.div`
  width: 55rem;
  background-color: white;
  padding: 3rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: -1;
  .detail-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    position: relative;
    padding-top: 0.5rem;
    .icon {
      font-size: 2rem;
      cursor: pointer;
      position: absolute;
      top: 0rem;
      right: 0rem;
      color: #515151;
    }
    &__img {
      width: 5rem;
      height: 5rem;
      background-image: ${(props) =>
        props.img
          ? `url(${props.img})`
          : `url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")`};
      background-size: cover;
      border: 1px solid gray;
      border-radius: 50%;
    }
    &__name {
      font-size: 2rem;
      font-weight: 500;
    }
    &__date {
      /* position: absolute;
      top: 0rem;
      right: 4rem; */
      font-size: 1.2rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      background-color: #334b6c;
      color: white;
      border-radius: 0.7rem;
    }
  }
  > main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .detail-main-row {
      display: flex;
      gap: 1rem;
      .detail-main__tag-wrapper {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .detail-main__tag {
        background-color: #334b6c;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 1rem;
        font-size: 1rem;
        /* max-width: 5rem; */
        /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
      }
    }
    .detail-main {
      max-height: 10rem;
      overflow: auto;
      font-size: 1.2rem;
      line-height: 1.5rem;
      border: 1px solid black;
      padding: 2rem 1rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: #f3f3f3;
      box-shadow: 0 0.1rem 0.5rem 0 gray;
      gap: 1rem;
      flex: 1;
      &__title {
        font-weight: 600;
      }
      &__content {
        white-space: pre-line;
      }
    }
  }
  .detail-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    &__btn {
      font-size: 1.3rem;
      font-weight: 600;
      cursor: pointer;
      &:last-child {
        color: #334b6c;
      }
    }
  }
`;
