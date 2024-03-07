import SubMenubar from "../../../components/Menubar/SubMenubar";
import {
  MenteeConsultLinkList,
  MenteeConsultMenu,
} from "../../../settings/config";

const MenteePendingConsult = () => {
  const subMenuList = MenteeConsultMenu;
  const subMenuLink = MenteeConsultLinkList;

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[1]}
        subMenuLinkList={subMenuLink}
      />
    </>
  );
};

export default MenteePendingConsult;
