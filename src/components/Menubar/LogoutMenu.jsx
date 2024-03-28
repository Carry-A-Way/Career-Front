import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { FRONT_URL } from "../../constants";
import { Link } from "react-router-dom";
import { colors } from "../../styles/common/Theme";
import styled from "styled-components";

const LogoutMenu = (props) => {
  const { isSubModal, setIsSubModal } = props;
  const myInfoModalRef = useRef();
  const popUpRef = useRef();

  useEffect(() => {
    console.log(isSubModal);
    const outSideClick = (e) => {
      console.log(myInfoModalRef.current.contains(e.target));
      if (
        isSubModal &&
        !myInfoModalRef.current.contains(e.target) &&
        !popUpRef.current.contains(e.target)
      ) {
        setIsSubModal(false);
      }
    };
    if (isSubModal) {
      document.addEventListener("mousedown", outSideClick);
      return () => document.removeEventListener("mousedown", outSideClick);
    }
  }, [isSubModal, setIsSubModal]);
  return (
    <>
      <div className="menubar-icon circle-icon">
        <FontAwesomeIcon icon={faCircle} />
      </div>
      <Link to={`${FRONT_URL}/login`} className="menubar-content">
        로그인
      </Link>
      <div className="menubar-icon circle-icon">
        <FontAwesomeIcon icon={faCircle} />
      </div>
      <div
        className="menubar-content"
        onClick={() => setIsSubModal((current) => !current)}
        ref={myInfoModalRef}
      >
        회원가입
      </div>
      {isSubModal ? (
        <PopUp ref={popUpRef}>
          <Link
            onClick={() => {
              //   setSubMenu("멘토 회원가입");
              setIsSubModal(false);
            }}
            to={`${FRONT_URL}/signup/mentor`}
            className={
              //   subMenu === "멘토 회원가입"
              //     ? "right-menu right-menu__selected"
              //     : "right-menu"
              "right-menu"
            }
          >
            멘토 회원가입
          </Link>
          <hr />
          <Link
            onClick={() => {
              //   setSubMenu("멘티 회원가입");
              setIsSubModal(false);
            }}
            to={`${FRONT_URL}/signup/mentee`}
            className={
              //   subMenu === "멘티 회원가입"
              //     ? "right-menu right-menu__selected"
              //     : "right-menu"
              "right-menu"
            }
          >
            맨티 회원가입
          </Link>
        </PopUp>
      ) : null}
      {/* <div className="menubar-icon">
                <FontAwesomeIcon onClick={toggleSignup} icon={faAngleDown} />
              </div> */}
    </>
  );
};

export default LogoutMenu;

const PopUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 4rem;
  right: 2rem;
  border: 2px solid #2f5383;
  background-color: #f9f9f9;
  padding: 0.7rem;
  border-radius: 10px;
  width: 110px;
  z-index: 100;
  > .right-menu {
    padding: 0.5rem 0;
    color: ${colors.secondaryBlue};
    font-weight: 500;
    /* cursor: pointer; */
    text-decoration: none;
    font-size: 1rem;
    &:hover,
    &__selected {
      color: ${colors.primaryBlue};
      font-weight: 700;
    }
  }
  > hr {
    width: 90%;
    border: 1px solid #2f5383;
  }
`;
