import React from "react";
import SubMenubar from "../../../components/Menubar/SubMenubar";
import {
  MenteeConsultLinkList,
  MenteeConsultMenu,
} from "../../../settings/config";

const MenteeCanceledConsult = () => {
  const subMenuList = MenteeConsultMenu;
  const subMenuLink = MenteeConsultLinkList;

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[5]}
        subMenuLinkList={subMenuLink}
      />
    </>
  );
};

export default MenteeCanceledConsult;
