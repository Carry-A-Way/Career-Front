import SubMenubar from "../../../components/Menubar/SubMenubar";
import {
  MenteeConsultLinkList,
  MenteeConsultMenu,
} from "../../../settings/config";

const MenteeUpcomingConsult = () => {
  const subMenuList = MenteeConsultMenu;
  const subMenuLink = MenteeConsultLinkList;

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[2]}
        subMenuLinkList={subMenuLink}
      />
    </>
  );
};

export default MenteeUpcomingConsult;
