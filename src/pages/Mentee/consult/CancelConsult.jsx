import SubMenubar from "../../../components/Menubar/SubMenubar";
import {
  MenteeConsultLinkList,
  MenteeConsultMenu,
} from "../../../settings/config";

const MenteeCancelConsult = () => {
  const subMenuList = MenteeConsultMenu;
  const subMenuLink = MenteeConsultLinkList;

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[4]}
        subMenuLinkList={subMenuLink}
      />
    </>
  );
};

export default MenteeCancelConsult;
