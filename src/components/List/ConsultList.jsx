import React, { useState } from "react";
import styled from "styled-components";
import ConsultItem from "./ConsultItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { dateParse, timeParse } from "../../utils/ParseFormat";
import DetailedModal from "../Modal/DetailedModal";
import { yScrollStyle } from "../../styles/common/Scroll";

const ConsultList = (props) => {
  // const [moveIndex, setMoveIndex] = useState(0);
  // const onMoveLeft = () => {
  //   if (moveIndex === 0) return;
  //   setMoveIndex((prev) => prev + 10);
  // };
  // const onMoveRight = () => {
  //   setMoveIndex((prev) => prev - 10);
  // };
  return (
    <Div>
      {/* <div className="left" onClick={onMoveLeft}></div> */}
      <Wrapper>
        {props.consultList.map((item, i) => {
          return (
            <ConsultItem
              color={props.color}
              item={item}
              index={i}
              key={item.consultId}
              type={props.type}
            />
          );
        })}
      </Wrapper>
      {/* <div className="right" onClick={onMoveRight}></div> */}
    </Div>
  );
};

ConsultList.defaultProps = {
  color: "white",
};
export default ConsultList;

export const ConsultListShort = (props) => {
  const { consultList, color, type } = props;
  const [selectRowIdx, setSelectRowIdx] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRowOpen, setIsRowOpen] = useState(false);
  // console.log("list ", consultList);
  return (
    <ShortWrapper>
      <Table color={color}>
        <thead className="frame">
          <tr>
            <th className="num">No</th>
            <th className="name">학생 이름</th>
            <th className="date">날짜</th>
            <th className="time">시간</th>
            <th className="detail">더보기</th>
          </tr>
        </thead>
        {consultList.length ? (
          consultList.map((item, i) => {
            return (
              <tbody key={i}>
                <tr
                  style={{
                    borderBottom: isRowOpen ? "none" : "1px solid black",
                  }}
                >
                  <td>{i + 1}</td>
                  <td>{item?.student.nickname}</td>
                  <td>{dateParse(item.startTime)}</td>
                  <td>
                    {timeParse(item.startTime)} ~ {timeParse(item.endTime)}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={
                        isRowOpen && i === selectRowIdx
                          ? faAngleUp
                          : faAngleDown
                      }
                      className="detail-icon"
                      onClick={() => {
                        if (i === selectRowIdx) {
                          setIsRowOpen((prev) => !prev);
                        } else {
                          setIsRowOpen(true);
                          setSelectRowIdx(i);
                        }
                      }}
                    />
                  </td>
                </tr>
                {isRowOpen && i === selectRowIdx && (
                  <tr className="detail-row">
                    <td colSpan="5">
                      <div className="major">
                        <div>상담할 전공 : </div>
                        <div className="majorName">{item.major}</div>
                      </div>
                      <div className="request">
                        <div>주요 질문 :</div>
                        <div>{item.questions || "질문이 없습니다"}</div>
                      </div>
                      <div className="footer">
                        <div
                          className="button"
                          onClick={() => setIsDetailOpen(true)}
                        >
                          자세히 보기
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            );
          })
        ) : (
          <tbody>
            <tr>
              <td colSpan={5}>상담 내역이 없습니다.</td>
            </tr>
          </tbody>
        )}
      </Table>
      {isDetailOpen && (
        <DetailedModal
          setModalOpen={setIsDetailOpen}
          item={consultList[selectRowIdx]}
          type={type}
        />
      )}
      {/* <Select>
        // show 방식은 api 호출로 pagination 이랑 같이 진행 -> 나중에 수정 
        <option value="5">show 5</option>
        <option value="10">show 10</option>
      </Select> */}
    </ShortWrapper>
  );
};

ConsultListShort.defaultProps = {
  color: "#23354d",
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap: 20px;
  width: 100%;
`;

const Div = styled.div`
  .left,
  .right {
    height: 100%;
    width: 10%;
    position: absolute;
    z-index: 1;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .right {
    right: 0;
    top: 0;
  }
`;

const Table = styled.table`
  width: 100%;
  font-size: 1.2rem;
  border-collapse: collapse;
  border: 1px solid #23354d;
  .frame {
    /* height: 3rem; */
    color: ${(props) => (props.color === "#D9D9D9" ? "black" : "white")};
    background-color: ${(props) => props.color || "#23354d"};
  }
  th {
    padding: 0.5rem;
  }
  tr {
    border: 1px solid #23354d;
    padding: 1rem;
  }
  td {
    padding: 0.5rem;
    background-color: white;
    text-align: center;
    .detail-icon {
      cursor: pointer;
    }
  }
  .detail-row {
    border-top: none;
    .major,
    .request {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
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
          props.color === "#D9D9D9" ? "#9D9D9D" : "" || "#23354d"};
        color: white;
        padding: 0.7rem;
        border-radius: 10px;
      }
    }
    .footer {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
      .button {
        border: 1px solid #23354d;
        padding: 0.5rem 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color: ${(props) =>
            props.color === "#D9D9D9" ? "#9D9D9D" : "" || "#23354d"};
          color: white;
        }
      }
    }
  }
`;

const ShortWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  max-height: 20rem;
  overflow-y: auto;
  ${yScrollStyle}
`;
