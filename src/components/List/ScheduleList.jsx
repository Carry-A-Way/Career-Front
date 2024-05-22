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
import ProfileImage from "../Image/ProfileImage";
import {
  DetailModal,
  List,
  ListWrapper,
} from "../../styles/common/ScheduleComponents";

const ScheduleList = ({ lastUpcomingConsult, upcomingConsult, refetch }) => {
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
      setUpcomingDetailId("");
      refetch();
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
      setUpcomingDetailId("");
      refetch();
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
        <List>
          <h1 className="list-title">
            수락 대기중인 상담 ({lastUpcomingConsult.length})
          </h1>
          <ul className="header">
            <li>No</li>
            <li>닉네임</li>
            <li>날짜</li>
            <li>시간</li>
            <li></li>
          </ul>
          {lastUpcomingConsult.length === 0 && (
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
                수락 대기중인 상담이 없습니다.
              </li>
            </ul>
          )}
          {lastUpcomingConsult &&
            lastUpcomingConsult.map((pending, pendingIdx) => (
              <Fragment key={pending.id}>
                <ul className="main">
                  <li>{pendingIdx + 1}</li>
                  <li>{pending.student.nickname}</li>
                  <li>{dateParse(pending.startTime)}</li>
                  <li>
                    {timeParse(pending.startTime)} ~{" "}
                    {timeParse(pending.endTime)}
                  </li>
                  <li>
                    {pendingDetailId === pendingIdx ? (
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="icon"
                        onClick={() => {
                          setPendingDetailId("");
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="icon"
                        onClick={() => {
                          setPendingDetailId(pendingIdx);
                        }}
                      />
                    )}
                  </li>
                </ul>
                {pendingIdx === pendingDetailId && (
                  <div className="main-detail">
                    <div className="main-detail__item">
                      <span className="item__title">- 상담할 전공 : </span>
                      <span className="item__content">{pending.major}</span>
                    </div>
                    <div className="main-detail__item">
                      <span className="item__title">- 상담 방식 : </span>
                      <span className="item__content">{pending.flow}</span>
                    </div>
                    <div className="main-detail__item">
                      <span className="item__title">- 주요 질문 : </span>
                      <div className="question-wrapper">
                        <p className="item__content">{pending.questions}</p>
                      </div>
                    </div>
                    <button
                      className="detail-btn"
                      onClick={() => {
                        setDetailObject({ type: "1", object: { ...pending } });
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
              <ProfileImage
                className="detail-header__img"
                profileImg={detailObject.object.student.profileImg}
              ></ProfileImage>
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

export default ScheduleList;

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
