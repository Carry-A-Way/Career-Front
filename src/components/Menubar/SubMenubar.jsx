import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";
const SubMenubar = ({ subMenuList, selectMenu, subMenuLinkList }) => {
  return (
    <SubMenu>
      {subMenuList.map((item, idx) => {
        return (
          <Link
            className={
              item === selectMenu ? "select submenu__item" : "submenu__item"
            }
            to={subMenuLinkList ? subMenuLinkList[idx] : ""}
            key={idx}
            // onClick={() => setSubMenu(subMenuList[idx])}
          >
            {item}
          </Link>
        );
      })}
    </SubMenu>
  );
};

export default React.memo(SubMenubar);

const SubMenu = styled.div`
  max-height: 6vh;
  height: 4rem;
  border-bottom: 2px solid #f4f4f4;
  padding: 0 40px;
  display: flex;
  .select {
    color: #3b71b9;
    font-weight: 700;
    border-bottom: 3px solid #3b71b9;
  }
  .submenu__item {
    height: 100%;
    font-size: 1.3rem;
    padding: 0 20px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${colors.primaryBlue};
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }
`;
