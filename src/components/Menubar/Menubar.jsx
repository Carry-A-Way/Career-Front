import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "../../cookie";
import { FRONT_URL } from "../../constants";
import { useSelector } from "react-redux";
import { useGlobalNavigate } from "../../hooks/useGlobalNavigate";
import LoginMenu from "./LoginMenu";
import LogoutMenu from "./LogoutMenu";

const Menubar = () => {
  const [leftMenu, setLeftMenu] = useState([]);
  const [rightMenu, setRightMenu] = useState([]);
  const [leftLink, setLeftLink] = useState([]);
  const [rightLink, setRightLink] = useState([]);
  const [isSubModal, setIsSubModal] = useState(false);

  const isMentor = useSelector((state) => state.isMentor.value);
  const isLogin = useSelector((state) => state.isLogin.value);
  // const dispatch = useDispatch();

  useGlobalNavigate();

  // useEffect(() => {
  //   console.log("call");
  //   console.log(setupAxiosInterceptors(dispatch));
  // }, [dispatch]);

  useEffect(() => {
    if (!isLogin) {
      setLeftMenu([]);
      setRightMenu([]);
    } else {
      const menuSetup = isMentor
        ? {
            leftMenu: ["홈", "상담내역", "시간표", "커뮤니티"],
            leftLink: [
              `${FRONT_URL}/mentor`,
              `${FRONT_URL}/mentor/consult`,
              `${FRONT_URL}/schedule`,
              `${FRONT_URL}/community`,
            ],
            rightMenu: ["초대하기", "추가메뉴"],
            rightLink: [`${FRONT_URL}/mentor`, `${FRONT_URL}/mentor`],
          }
        : {
            leftMenu: ["홈", "멘토", "시간표", "상담", "커뮤니티"],
            leftLink: [
              `${FRONT_URL}/mentee`,
              `${FRONT_URL}/mentee/mentor`,
              `${FRONT_URL}/mentee/schedule`,
              `${FRONT_URL}/mentee/consult`,
              `${FRONT_URL}/community`,
            ],
            rightMenu: ["초대하기", "이용권 구매"],
            rightLink: [`${FRONT_URL}/mentee`, `${FRONT_URL}/mentee`],
          };
      setLeftMenu(menuSetup.leftMenu);
      setRightMenu(menuSetup.rightMenu);
      setLeftLink(menuSetup.leftLink);
      setRightLink(menuSetup.rightLink);
    }
  }, [isLogin, isMentor]);

  return (
    <>
      <MenubarWrapper>
        <LeftMenuList>
          <Link to={"/"} className="menubar-logo">
            CAREER
          </Link>
          {leftMenu.map((menu, i) => {
            return (
              <Link to={leftLink[i]} className="menubar-content" key={i}>
                {menu}
              </Link>
            );
          })}
        </LeftMenuList>
        <RightMenuList>
          {isLogin ? (
            <LoginMenu
              rightMenu={rightMenu}
              rightLink={rightLink}
              isSubModal={isSubModal}
              setIsSubModal={setIsSubModal}
            />
          ) : (
            <LogoutMenu isSubModal={isSubModal} setIsSubModal={setIsSubModal} />
          )}
        </RightMenuList>
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
const LeftMenuList = styled.section`
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
`;
const RightMenuList = styled.section`
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
`;
