import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../styles/common/Theme";
const CloseButton = ({ onClick }) => {
  return (
    <StyledWrapper>
      <FontAwesomeIcon icon={faXmark} onClick={onClick} />
    </StyledWrapper>
  );
};

export default CloseButton;

const StyledWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 1.5rem;
  color: ${colors.darkGray};
  cursor: pointer;
`;
