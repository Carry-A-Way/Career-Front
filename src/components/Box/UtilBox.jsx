import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faPencil } from "@fortawesome/free-solid-svg-icons";
import { ScrollUp } from "../Scroll";
import { colors } from "../../styles/common/Theme";
import styled from "styled-components";
const UtilBox = () => {
  return (
    <StyledWrapper>
      <Link className="util-item write" to={"/community/write"}>
        <FontAwesomeIcon icon={faPencil} />
        <span>글쓰기</span>
      </Link>
      <div className="util-item up" onClick={ScrollUp}>
        <FontAwesomeIcon icon={faChevronUp} />
        <span>위로</span>
      </div>
    </StyledWrapper>
  );
};

export default UtilBox;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: fixed;
  bottom: 2rem;
  right: 3rem;
  .util-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    border: 1px solid black;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    padding: 0.7rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
  .write {
    background-color: #eaeaea;
    text-decoration: none;
    color: black;
  }
  .up {
    background-color: ${colors.primaryBlue};
    color: white;
  }
`;
