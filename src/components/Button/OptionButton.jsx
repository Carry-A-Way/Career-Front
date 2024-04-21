import React, { useState } from "react";
import { getIdFromToken } from "../../auth/jwtFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "../../cookie";
import {
  faEllipsisVertical,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faFlag } from "@fortawesome/free-regular-svg-icons";
import DeleteCheckModal from "../Modal/DeleteCheckModal";
import styled from "styled-components";
const OptionButton = (props) => {
  const {
    idx,
    setEditContent,
    inputRef,
    checkId,
    option,
    ids,
    activeOptionId,
    setActiveOptionId,
    setUpdate,
  } = props;
  const [isDeleteInfo, setIsDeleteInfo] = useState(false);

  return (
    <>
      <FontAwesomeIcon
        icon={faEllipsisVertical}
        className="post-option__btn"
        style={{
          color: "black",
          position: "absolute",
          right: "2rem",
          fontSize: "1.4rem",
          cursor: "pointer",
        }}
        onClick={() => {
          if (activeOptionId === idx) {
            setActiveOptionId(null);
          } else setActiveOptionId(idx);
        }}
      />
      {activeOptionId === idx &&
        (checkId === getIdFromToken(getCookie("jwtToken")) ? (
          <OptionBox>
            <OptionBoxItem
              onClick={() => {
                setEditContent(idx);
                setActiveOptionId(null);
                setTimeout(() => {
                  inputRef.current.focus();
                  const textLength = inputRef.current.value.length;
                  inputRef.current.setSelectionRange(textLength, textLength);
                }, 0);
              }}
            >
              <FontAwesomeIcon icon={faPencil} className="icon" />
              <span>편집</span>
            </OptionBoxItem>
            <OptionBoxItem
              onClick={() => {
                setActiveOptionId(null);
                setIsDeleteInfo(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} className="icon" />
              <span>삭제</span>
            </OptionBoxItem>
          </OptionBox>
        ) : (
          <OptionBox>
            <OptionBoxItem
              onClick={() => {
                setActiveOptionId(null);
              }}
            >
              <FontAwesomeIcon icon={faFlag} className="icon" />
              <span>신고</span>
            </OptionBoxItem>
          </OptionBox>
        ))}
      {isDeleteInfo && (
        <DeleteCheckModal
          isDeleteInfo={isDeleteInfo}
          setIsDeleteInfo={setIsDeleteInfo}
          option={option}
          ids={ids}
          setUpdate={setUpdate}
        />
      )}
    </>
  );
};

export default OptionButton;

const OptionBox = styled.div`
  position: absolute;
  top: 4rem;
  right: 1.4rem;
  padding: 1rem;
  border: 1px solid gray;
  border-radius: 0.8rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  z-index: 99;
`;

const OptionBoxItem = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 1.3rem;
  cursor: pointer;

  .icon,
  span {
    color: black;
    &:hover {
      font-weight: 700;
    }
  }
`;
