import SubMenubar from "../../../components/Menubar/SubMenubar";
import {
  MenteeConsultLinkList,
  MenteeConsultMenu,
} from "../../../settings/config";

const MenteeCompletedConsult = () => {
  const subMenuList = MenteeConsultMenu;
  const subMenuLink = MenteeConsultLinkList;

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[3]}
        subMenuLinkList={subMenuLink}
      />
    </>
  );
};

export default MenteeCompletedConsult;
