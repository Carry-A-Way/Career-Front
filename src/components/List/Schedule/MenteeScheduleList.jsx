import React, { Fragment, useState } from "react";
import { dateParse, timeParse } from "../../../utils/ParseFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { List, ListWrapper } from "../../../styles/common/ScheduleComponents";

const MenteeScheduleList = ({
  lastUpcomingConsult,
  upcomingConsult,
  setDetailObject,
  setIsDetailOpen,
}) => {
  const [upcomingDetailId, setUpcomingDetailId] = useState("");
  const [pendingDetailId, setPendingDetailId] = useState("");

  return (
    <>
      <ListWrapper>
        {!!upcomingConsult && (
          <List>
            <h1 className="list-title">
              예정된 상담 ({upcomingConsult.length})
            </h1>
            <ul className="header">
              <li>No</li>
              <li>멘토</li>
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
            {upcomingConsult.map((upcoming, upcomingIdx) => (
              <Fragment key={upcoming.id}>
                <ul className="main">
                  <li>{upcomingIdx + 1}</li>
                  <li>{upcoming.mentor.nickname}</li>
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
                        key={upcoming.id}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="icon"
                        onClick={() => {
                          setUpcomingDetailId(upcomingIdx);
                        }}
                        key={upcoming.id}
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
                        setDetailObject({
                          type: "0",
                          object: { ...upcoming },
                        });
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
        )}
        {!!lastUpcomingConsult && (
          <List>
            <h1 className="list-title">
              수락 대기중인 상담 ({lastUpcomingConsult.length})
            </h1>
            <ul className="header">
              <li>No</li>
              <li>멘토</li>
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
            {lastUpcomingConsult.map((pending, pendingIdx) => (
              <Fragment key={pendingIdx}>
                <ul className="main">
                  <li>{pendingIdx + 1}</li>
                  <li>{pending.mentor.nickname}</li>
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
                        setDetailObject({
                          type: "1",
                          object: { ...pending },
                        });
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
        )}
      </ListWrapper>
    </>
  );
};

export default MenteeScheduleList;
