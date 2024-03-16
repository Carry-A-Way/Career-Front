import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCookie, setCookie } from "../../cookie";
import { FRONT_URL } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../../store/isLoginSlice";
import { colors } from "../../styles/common/Theme";
import { useGlobalNavigate } from "../../hooks/useGlobalNavigate";
import { setupAxiosInterceptors } from "../../utils/axiosInterceptors";
import { getNicknameFromToken } from "../../auth/jwtFunctions";
import { SIGNUP_MENTEE, SIGNUP_MENTOR } from "../../settings/url";
import { ModalWrapper } from "../../styles/common/ModalComponent";

const Menubar = () => {
  useGlobalNavigate();
  const [signup, setSignup] = useState("회원가입");
  const [signupSelect, setSignupSelect] = useState(false);
  const [leftMenu, setLeftMenu] = useState([]);
  const [rightMenu, setRightMenu] = useState(["초대하기", "추가메뉴"]);
  // const [isLogin, setIsLogin] = useState(true);
  const [subMenu, setSubMenu] = useState("");
  const isMentor = useSelector((state) => state.isMentor.value);
  const isLogin = useSelector((state) => state.isLogin.value);
  const [leftLink, setLeftLink] = useState([
    `${FRONT_URL}`,
    `${FRONT_URL}`,
    `${FRONT_URL}`,
  ]);
  const [rightLink, setRightLink] = useState([`${FRONT_URL}`, `${FRONT_URL}`]);
  const [subSelect, setSubSelect] = useState(false);

  const dispatch = useDispatch();

  const toggleSignup = () => {
    setSignupSelect((current) => !current);
  };

  const toggleSubSelect = () => {
    setSubSelect((current) => !current);
  };

  const initialSubMenu = () => {
    setSubMenu("");
    setSubSelect(false);
  };
  useEffect(() => {
    setupAxiosInterceptors(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setSubMenu("");
    if (!isLogin) {
      // setLeftMenu(["홈", "멘토", "게시판"]);
      setRightMenu([]);
      // setLeftLink([`${FRONT_URL}`, `${FRONT_URL}`, `${FRONT_URL}`]);
    } else {
      if (isMentor) {
        setLeftMenu(["홈", "상담내역", "시간표", "커뮤니티"]);
        setRightMenu(["초대하기", "추가메뉴"]);
        setLeftLink([
          `${FRONT_URL}/mentor`,
          `${FRONT_URL}/mentor/consult`,
          `${FRONT_URL}/schedule`,
          `${FRONT_URL}/community`,
        ]);
        setRightLink([`${FRONT_URL}/mentor`, `${FRONT_URL}/mentor`]);
      } else {
        setLeftMenu(["홈", "멘토", "시간표", "상담", "커뮤니티"]);
        setRightMenu(["초대하기", "이용권 구매"]);
        setLeftLink([
          `${FRONT_URL}/mentee`,
          `${FRONT_URL}/mentee/mentor`,
          `${FRONT_URL}/mentee/schedule`,
          `${FRONT_URL}/mentee/consult`,
          `${FRONT_URL}/community`,
        ]);
        setRightLink([`${FRONT_URL}/mentee`, `${FRONT_URL}/mentee`]);
      }
    }
  }, [isLogin, isMentor]);

  return (
    <>
      <MenubarWrapper>
        <div className="menubar-left">
          <Link to={"/"} className="menubar-logo">
            CAREER
          </Link>
          {leftMenu.map((menu, i) => {
            return (
              <Link
                to={leftLink[i]}
                className="menubar-content"
                key={i}
                onClick={initialSubMenu}
              >
                {menu}
              </Link>
            );
          })}
        </div>
        <div className="menubar-right">
          {isLogin ? (
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
                      onClick={initialSubMenu}
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
                <FontAwesomeIcon onClick={toggleSubSelect} icon={faAngleDown} />
                {subSelect ? (
                  <PopUp>
                    <Link
                      onClick={() => {
                        setSubMenu("설정");
                        setSubSelect(false);
                      }}
                      to={
                        isMentor
                          ? `${FRONT_URL}/mentor/setting`
                          : `${FRONT_URL}/mentee/setting`
                      }
                      className={
                        subMenu === "설정"
                          ? "right-menu right-menu__selected"
                          : "right-menu"
                      }
                    >
                      설정
                    </Link>
                    <hr />
                    <Link
                      onClick={() => {
                        setSubMenu("내 프로필");
                        setSubSelect(false);
                      }}
                      to={
                        isMentor
                          ? `${FRONT_URL}/mentor/profile`
                          : `${FRONT_URL}/mentee/profile`
                      }
                      className={
                        subMenu === "내 프로필"
                          ? "right-menu right-menu__selected"
                          : "right-menu"
                      }
                    >
                      내 프로필
                    </Link>
                    <hr />
                    <Link
                      to={`${FRONT_URL}/`}
                      className={
                        subMenu === "로그아웃"
                          ? "right-menu right-menu__selected"
                          : "right-menu"
                      }
                      onClick={() => {
                        setSubMenu("로그아웃");
                        setSubSelect(false);
                        dispatch(setIsLogin(false));
                        setCookie("jwtToken", null, {
                          path: "/",
                          secure: true,
                          sameSite: "none",
                        });
                      }}
                    >
                      로그아웃
                    </Link>
                  </PopUp>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <div className="menubar-icon circle-icon">
                <FontAwesomeIcon icon={faCircle} />
              </div>
              <Link
                to={`${FRONT_URL}/login`}
                className="menubar-content"
                onClick={() => {
                  setSignup("회원가입");
                }}
              >
                로그인
              </Link>
              <div className="menubar-icon circle-icon">
                <FontAwesomeIcon icon={faCircle} />
              </div>
              <div className="menubar-content">회원가입</div>
              <div className="menubar-icon">
                <FontAwesomeIcon onClick={toggleSignup} icon={faAngleDown} />
                {signupSelect ? (
                  <PopUp>
                    <Link
                      onClick={() => {
                        setSignup("멘토 회원가입");
                        toggleSignup();
                      }}
                      to={`${FRONT_URL}/${SIGNUP_MENTOR}`}
                      className={
                        signup === "멘토 회원가입"
                          ? "right-menu right-menu__selected"
                          : "right-menu"
                      }
                    >
                      멘토 회원가입
                    </Link>
                    <hr />
                    <Link
                      onClick={() => {
                        setSignup("멘티 회원가입");
                        toggleSignup();
                      }}
                      to={`${FRONT_URL}/${SIGNUP_MENTEE}`}
                      className={
                        signup === "멘티 회원가입"
                          ? "right-menu right-menu__selected"
                          : "right-menu"
                      }
                    >
                      맨티 회원가입
                    </Link>
                  </PopUp>
                ) : null}
              </div>
            </>
          )}
        </div>
      </MenubarWrapper>
      <hr style={{ border: "1px solid #f4f4f4", margin: "0" }} />
    </>
  );
};

export default Menubar;

const MenubarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-height: 8vh;
  height: 5.5rem;
  padding: 1.3rem 2.3rem;
  box-sizing: border-box;
  .menubar-content {
    padding: 0 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    color: #23354d;
    span {
      color: #2f5383;
      font-size: 1.4rem;
      font-weight: 700;
      margin-left: 15px;
    }
  }
  .menubar-left {
    display: flex;
    min-width: 50%;
    justify-content: flex-start;
    .menubar-logo {
      padding: 0 20px;
      font-size: 1.7rem;
      font-weight: 600;
      color: #334b6c;
      display: flex;
      align-items: center;
      font-family: Arial, Helvetica, sans-serif;
      text-decoration: none;
    }
    .menubar-content {
      font-size: 1.4rem;
      font-weight: 600;
    }
  }
  .menubar-right {
    display: flex;
    min-width: 45%;
    justify-content: flex-end;
    align-items: center;
    .menubar-content {
      font-size: 1.2rem;
      font-weight: 500;
    }
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 2px solid #334b6c;
    }
  }
  .menubar-icon {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .circle-icon {
    font-size: 0.5rem;
    cursor: none;
  }
`;

const PopUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 3rem;
  right: 0;
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
    cursor: pointer;
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
