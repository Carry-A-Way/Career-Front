import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export const HeartButton = ({ isHeartClicked, onClick }) => {
  return isHeartClicked ? (
    <FontAwesomeIcon
      icon={faHeartFull}
      className="icon heart-full"
      onClick={onClick}
    />
  ) : (
    <FontAwesomeIcon icon={faHeart} className="icon" onClick={onClick} />
  );
};
