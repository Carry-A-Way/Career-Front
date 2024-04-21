import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dateTimeParse } from "../../utils/ParseFormat";
import DetailedModal from "../Modal/DetailedModal";
import { colors } from "../../styles/common/Theme";

const ConsultItem = (props) => {
  const { color, item, type } = props;
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  useEffect(() => {
    if (isDetailOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isDetailOpen]);
  return (
    <>
      <Form color={color}>
        <div className="header">{item.student.nickname} 학생</div>
        <div className="main">
          <div className="time">
            {dateTimeParse(item.startTime)} ~ {dateTimeParse(item.endTime)}
          </div>
          <div className="major">
            <div>상담할 전공 : </div>
            <div className="majorName">{item.major}</div>
          </div>
          <div className="request">
            <div>주요 질문 :</div>
            <div>{item.questions || "질문이 없습니다"}</div>
          </div>
        </div>
        <div className="footer">
          <div className="button" onClick={() => setIsDetailOpen(true)}>
            자세히 보기
          </div>
        </div>
      </Form>
      {isDetailOpen && (
        <DetailedModal setModalOpen={setIsDetailOpen} item={item} type={type} />
      )}
    </>
  );
};

export default ConsultItem;

const Form = styled.div`
  background-color: ${(props) => props.color || "white"};
  border: 1px solid ${colors.primaryBlue};
  border-radius: 10px;
  width: 25rem;
  min-height: 18rem;
  height: 100%;
  color: black;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  cursor: default;
  .header {
    height: 20%;
    font-size: 1.7rem;
    font-weight: 600;
  }
  .main {
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 1.2rem;
    .time,
    .major,
    .request {
      display: flex;
      align-items: center;
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
  }
  .footer {
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .button {
      border: 1px solid #23354d;
      width: 40%;
      height: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: ${(props) =>
          props.color === "#D9D9D9" ? "#9D9D9D" : "" || "#334b6c"};
        color: white;
      }
    }
  }
`;
