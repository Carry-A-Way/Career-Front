import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCircle as faCircleFull,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
const EventList = () => {
  const eventList = [
    {
      id: 0,
      tag: "4월 이벤트",
      title: "친구 초대하고 1,000 포인트 받기",
      content: "친구가 첫 상담하면 1,000 포인트 추가 지급!",
      background:
        "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbT5Icw%2FbtqPWZXFDhC%2FlstWOmmaKpG2lXzYeTz9rK%2Fimg.png",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z" />
        </svg>
      ),
    },
    {
      id: 1,
      tag: "5월 이벤트",
      title: "상담 2+1 이용권 증정",
      content: "40분 상담 2회 이용시 20분 상담권 제공!",
      background:
        "https://img.khan.co.kr/news/2023/01/07/news-p.v1.20230106.25f62b36c9dc49f7aa7045666610ef8d_P1.jpg",
      icon: (
        <path d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z" />
      ),
    },
    {
      id: 2,
      tag: "6월 이벤트",
      title: "6월 가입자 전원 포인트 지급",
      content: "2023-06-01 ~ 2023-06-30 신규가입자 대상",
      background:
        "https://www.hanyang.ac.kr/web/www/photo?p_p_id=board_WAR_bbsportlet&p_p_lifecycle=2&p_p_cacheability=cacheLevelPage&p_p_col_id=column-1&p_p_col_count=1&_board_WAR_bbsportlet_cmd=download&_board_WAR_bbsportlet_messageId=931885&_board_WAR_bbsportlet_fileId=204801",
      icon: "",
    },
  ];

  const [currentEvent, setCurrentEvent] = useState(0);
  const selectEvent = (num) => {
    var selectButtons = [];
    for (var i = 0; i < eventList.length; i++) {
      if (i === num)
        selectButtons.push(
          <FontAwesomeIcon
            key={i}
            icon={faCircleFull}
            style={{ color: "white" }}
            onClick={() => move(num)}
          />
        );
      else
        selectButtons.push(
          <FontAwesomeIcon
            key={i}
            icon={faCircle}
            style={{ color: "white" }}
            onClick={() => move(num)}
          />
        );
    }
    return selectButtons;
  };
  const next = () => {
    setCurrentEvent(currentEvent + 1);
  };
  const prev = () => {
    setCurrentEvent(currentEvent - 1);
  };
  const move = (i) => {
    setCurrentEvent(i);
  };
  return (
    <>
      {eventList.map((item, i) => (
        <EventContainer
          key={item.id}
          style={{
            display: currentEvent === i ? "" : "none",
            backgroundImage:
              item.background === "" ? "" : `url(${item.background})`,
            background:
              item.background === ""
                ? "linear-gradient(to bottom, #2f5383, #165e92a3)"
                : `url(${item.background})`,
          }}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            style={{
              fontSize: "3.5rem",
              color: "white",
              visibility: i === 0 ? "hidden" : "",
            }}
            onClick={prev}
          />
          <Event>
            <div className="tag">{item.tag}</div>
            <div className="title">{item.title}</div>
            <div className="content">{item.content}</div>
          </Event>
          <Icon>{item.icon}</Icon>
          <FontAwesomeIcon
            icon={faAngleRight}
            style={{
              fontSize: "3.5rem",
              color: "white",
              visibility: i === eventList.length - 1 ? "hidden" : "",
            }}
            onClick={next}
          />
          <SelectEvent>{selectEvent(i)}</SelectEvent>
        </EventContainer>
      ))}
    </>
  );
};

export default EventList;

const EventContainer = styled.div`
  width: 100%;
  height: 20rem;
  background: ${(props) =>
    props.background || "linear-gradient(to bottom, #2f5383, #165e92a3)"};
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
`;

const Event = styled.div`
  width: 100%;
  min-height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 20px;
  background-color: #00000066;
  padding: 10px 20px;
  border-radius: 10px;
  .tag {
    padding: 5px 20px;
    background-color: #334b6c;
    color: white;
    width: 5rem;
    text-align: center;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 1rem;
  }
  .title {
    font-size: 2rem;
    color: white;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    margin: 10px 0;
    font-weight: 600;
  }
  .content {
    font-size: 1.4rem;
    font-weight: 700;
    color: white;
    text-shadow: -0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black;
  }
`;

const Icon = styled.div`
  font-size: 6rem;
  min-width: 20%;
  text-align: center;
`;

const SelectEvent = styled.div`
  display: flex;
  position: absolute;
  bottom: 20px;
  right: 20px;
  gap: 7px;
  font-size: 1.5rem;
`;
