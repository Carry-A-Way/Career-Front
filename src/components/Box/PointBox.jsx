import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const PointBox = ({ point }) => {
  return (
    <PointWrapper>
      <header>내 포인트 잔액</header>
      <main>
        <span>{point.toLocaleString() || 0} </span> 원
      </main>
      <footer>
        <span>포인트 환급 신청</span>
        <FontAwesomeIcon icon={faAngleRight} style={{ cursor: "pointer" }} />
      </footer>
    </PointWrapper>
  );
};

export default PointBox;

const PointWrapper = styled.div`
  width: 100%;
  height: 12rem;
  border: 1px solid #c7c5c5;
  border-radius: 10px;
  background-color: #fcfcfc;
  padding: 1rem;
  /* margin-bottom: 50px; */
  box-sizing: border-box;
  header,
  main {
    height: 30%;
    margin-left: 3rem;
    display: flex;
    align-items: flex-end;
    font-size: 1.5rem;
    font-weight: 500;
    span {
      font-size: 1.7rem;
      font-weight: 600;
      padding-right: 1rem;
    }
  }
  main {
    margin-bottom: 7%;
  }
  footer {
    height: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1rem;
    span {
      padding-right: 1rem;
      cursor: pointer;
    }
  }
`;
