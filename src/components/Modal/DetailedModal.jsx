import React from "react";
import { dateTimeParse } from "../../utils/ParseFormat";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  CANCELED_CONSULT_TYPE,
  CANCEL_CONSULT_TYPE,
  COMPLETED_CONSULT_TYPE,
  PENDING_CONSULT_TYPE,
  UPCOMING_CONSULT_TYPE,
} from "../../constants";
import { useSelector } from "react-redux";
import {
  menteeCancelConsult,
  mentorCancelConsult,
} from "../../api/consult/cancelConsult";
import { mentorAcceptConsult } from "../../api/consult/acceptConsult";
const DetailedModal = (props) => {
  const { setModalOpen, item, type, refetch } = props;
  const isMentor = useSelector((state) => state.isMentor.value);

  const handleCancelConsult = (reason) => {
    if (isMentor) {
      mentorCancelConsult(reason, item.consultId);
    } else {
      menteeCancelConsult(reason, item.consultId);
    }
  };

  const enterZoomLink = () => {
    window.open(`${item.zoomLink}`, "_blank");
  };

  const onClickLeftFooterButton = () => {
    if (type === UPCOMING_CONSULT_TYPE) {
      var result = window.prompt("상담을 취소하시겠습니까? 사유를 적어주세요.");
      if (result !== null) {
        alert("상담이 취소되었습니다.");
        setModalOpen(false);
        setTimeout(() => handleCancelConsult(result), 1000);
      }
    } else if (type === PENDING_CONSULT_TYPE) {
      if (isMentor)
        result = window.prompt("상담을 거절하시겠습니까? 사유를 적어주세요.");
      else
        result = window.prompt("상담을 취소하시겠습니까? 사유를 적어주세요.");
      if (result !== null) {
        if (isMentor) alert("상담이 거절되었습니다.");
        else alert("상담이 취소되었습니다.");
        setModalOpen(false);
        handleCancelConsult(result);
      }
    }
    refetch();
  };

  const onClickRightFooterButton = () => {
    if (type === UPCOMING_CONSULT_TYPE) {
      var result = window.confirm("상담 링크에 접속하시겠습니까?");
      if (result) {
        enterZoomLink();
        setModalOpen(false);
      }
    } else if (type === PENDING_CONSULT_TYPE) {
      result = window.confirm("상담을 수락하시겠습니까?");
      if (result) {
        alert("상담이 수락되었습니다.");
        setModalOpen(false);
        mentorAcceptConsult(item.consultId);
      }
    }
    refetch();
  };

  const leftButton = () => {
    switch (type) {
      case PENDING_CONSULT_TYPE: // 0
        if (isMentor) return "상담 거절하기";
        else return "상담 취소하기";
      case UPCOMING_CONSULT_TYPE: // 1
        return "상담 취소하기";
      case COMPLETED_CONSULT_TYPE: // 2
        return "";
      case CANCEL_CONSULT_TYPE: // 3
        return `취소 사유 : ${item.reason}`;
      case CANCELED_CONSULT_TYPE: // 4
        return `취소 사유 : ${item.reason}`;
      default:
        return "";
    }
  };

  const rightButton = () => {
    switch (type) {
      case PENDING_CONSULT_TYPE: // 0
        if (isMentor) return "상담 수락하기";
        else return "";
      case UPCOMING_CONSULT_TYPE: // 1
        return "상담 입장하기";
      case COMPLETED_CONSULT_TYPE: // 2
        return "";
      case CANCEL_CONSULT_TYPE: // 3
        return "";
      case CANCELED_CONSULT_TYPE: // 4
        return "";
      default:
        return "";
    }
  };
  return (
    <ModalWrapper onClick={() => setModalOpen(false)}>
      <DetailModal onClick={(e) => e.stopPropagation()}>
        <Header type={type}>
          <div
            className="header-img"
            img={isMentor ? item.student.profileImg : item.mentor.profileImg}
          ></div>
          <span className="header-name">
            {isMentor ? item.student.nickname : item.mentor.nickname}
          </span>
          <div className="header-date">
            상담 예정 시간 : {dateTimeParse(item.startTime)} ~{" "}
            {dateTimeParse(item.endTime)}
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            className="icon"
            onClick={() => setModalOpen(false)}
          />
        </Header>
        <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
          상담 전공 : {item.major}
        </p>
        <Main type={type}>
          <div className="detail-main detail-consult">
            <div className="detail-main__title">상담 내용</div>
            <div className="detail-main__content">{item.questions}</div>
          </div>
          <div className="detail-main-row">
            <div className="detail-main detail-row__item">
              <div className="detail-main__title">원하는 상담 스타일</div>
              <div className="detail-main__tag-wrapper">
                {item.flow
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
        </Main>
        <Footer type={type}>
          <span className="footer-btn" onClick={onClickLeftFooterButton}>
            {leftButton()}
          </span>
          <span className="footer-btn" onClick={onClickRightFooterButton}>
            {rightButton()}
          </span>
        </Footer>
      </DetailModal>
    </ModalWrapper>
  );
};

export default DetailedModal;

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #8080806d;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 100;
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
  color: black;
`;

const Header = styled.header`
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
  > .header-img {
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
  > .header-name {
    font-size: 2rem;
    font-weight: 500;
  }
  > .header-date {
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    background-color: ${(props) =>
      props.type === CANCEL_CONSULT_TYPE || props.type === CANCELED_CONSULT_TYPE
        ? "#777777"
        : "#334b6c"};
    color: white;
    border-radius: 0.7rem;
  }
`;

const Main = styled.main`
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
      background-color: ${(props) =>
        props.type === CANCEL_CONSULT_TYPE ||
        props.type === CANCELED_CONSULT_TYPE
          ? "#777777"
          : "#334b6c"};
      color: white;
      padding: 0.2rem 0.5rem;
      border-radius: 1rem;
      font-size: 1rem;
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
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  .footer-btn {
    font-size: 1.3rem;
    font-weight: 600;
    cursor: ${(props) =>
      props.type === CANCEL_CONSULT_TYPE || props.type === CANCELED_CONSULT_TYPE
        ? "default"
        : "pointer"};
    &:last-child {
      color: #334b6c;
    }
  }
`;
