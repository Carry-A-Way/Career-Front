import { faAngleDown, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getNicknameFromToken } from "../../auth/jwtFunctions";
import { deleteCookie, getCookie, setCookie } from "../../cookie";
import { FRONT_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../styles/common/Theme";
import styled from "styled-components";
import { setIsLogin } from "../../store/isLoginSlice";

const LoginMenu = (props) => {
  const { rightMenu, rightLink, isSubModal, setIsSubModal } = props;
  const isMentor = useSelector((state) => state.isMentor.value);
  const dispatch = useDispatch();
  const myInfoModalRef = useRef();
  const popUpRef = useRef();

  useEffect(() => {
    const outSideClick = (e) => {
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
      {rightMenu.map((menu, i) => {
        return (
          <Fragment key={i}>
            <div className="menubar-icon circle-icon">
              <FontAwesomeIcon icon={faCircle} />
            </div>
            <Link
              to={rightLink[i]}
              className="menubar-content"
              onClick={() => setIsSubModal(false)}
            >
              {menu}
            </Link>
          </Fragment>
        );
      })}

      <img
        alt=""
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      />
      <div className="menubar-content">
        {isMentor ? "멘토" : "멘티"}
        <span>{getNicknameFromToken(getCookie("jwtToken"))}</span>
      </div>
      <div className="menubar-icon">
        <FontAwesomeIcon
          onClick={() => setIsSubModal((current) => !current)}
          icon={faAngleDown}
          ref={myInfoModalRef}
        />
      </div>
      {isSubModal && (
        <PopUp ref={popUpRef}>
          <Link
            onClick={() => {
              //   setSubMenu("설정");
              setIsSubModal(false);
            }}
            to={
              isMentor
                ? `${FRONT_URL}/mentor/setting`
                : `${FRONT_URL}/mentee/setting`
            }
            className={
              //   subMenu === "설정"
              //     ? "right-menu right-menu__selected"
              //     : "right-menu"
              "right-menu"
            }
          >
            설정
          </Link>
          <hr />
          <Link
            onClick={() => {
              //   setSubMenu("내 프로필");
              setIsSubModal(false);
            }}
            to={
              isMentor
                ? `${FRONT_URL}/mentor/profile`
                : `${FRONT_URL}/mentee/profile`
            }
            className={
              //   subMenu === "내 프로필"
              //     ? "right-menu right-menu__selected"
              //     : "right-menu"
              "right-menu"
            }
          >
            내 프로필
          </Link>
          <hr />
          <Link
            to={`${FRONT_URL}/`}
            className={
              //   subMenu === "로그아웃"
              //     ? "right-menu right-menu__selected"
              //     : "right-menu"
              "right-menu"
            }
            onClick={() => {
              //   setSubMenu("로그아웃");
              setIsSubModal(false);
              dispatch(setIsLogin(false));
              deleteCookie("jwtToken", {
                path: "/",
                secure: false,
                sameSite: "lax",
              });
            }}
          >
            로그아웃
          </Link>
        </PopUp>
      )}
    </>
  );
};

export default LoginMenu;

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
