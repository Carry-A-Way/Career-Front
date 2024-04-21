import styled from "styled-components";
import { ButtonDiv } from "../Button/Button";

const AlertModal = ({ message, setModalOpen }) => {
  return (
    <ModalOverlay>
      <Alert>
        <main>{message}</main>
        <footer>
          <ButtonDiv
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(false);
            }}
          >
            확인
          </ButtonDiv>
        </footer>
      </Alert>
    </ModalOverlay>
  );
};

export default AlertModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
`;

const Alert = styled.div`
  background-color: white;
  color: black;
  margin-top: 2rem;
  width: 20rem;
  height: 10rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 2rem;
  border-radius: 10px;
  > main {
    margin: 1rem;
    font-size: 1.3rem;
    font-weight: 500;
    text-align: center;
  }
  > footer {
    height: 3rem;
    display: flex;
    justify-content: center;
  }
`;
