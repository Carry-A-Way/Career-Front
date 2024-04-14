import styled from "styled-components";
import { colors } from "./Theme";

export const Form = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  margin-top: 60px;
  justify-content: center;
  box-sizing: border-box;
`;

export const FormHalf = styled.div`
  min-width: 30%;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 5rem;
`;

export const Form50 = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputForm = styled.div`
  display: flex;
  min-width: 15rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  gap: 0.8rem;
  position: relative;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
`;

export const ProfileBtn = styled.div`
  position: fixed;
  bottom: 20rem;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  font-weight: 600;
  width: 15rem;
  justify-content: space-evenly;
  padding: 1.2rem 2.3rem;
`;

export const Label = styled.label`
  width: 10rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.isChecked ? "2px solid #2f5383" : "1px solid gray"};
  color: gray;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    border: 2px solid #2f5383;
  }
  &:hover div,
  input:checked + div {
    color: #2f5383;
    font-weight: 600;
  }
  div {
    margin: 0 10px;
    height: 25px;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
  }
`;

export const Radio = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0;
`;

export const FileUpload = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FileList = styled.div`
  width: 100%;
  border: 1px solid gray;
  border-radius: 5px;
  height: 10rem;
  margin-bottom: 20px;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const FileItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  .icon {
    visibility: hidden;
    margin-right: 10px;
  }
  &:hover {
    background-color: #44638c;
    color: white;
    .icon {
      visibility: visible;
      cursor: pointer;
    }
  }
`;

export const FileUploadBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  color: #44638c;
  border: 2px solid #2f5383;
  font-size: 1rem;
  font-weight: 600;
  height: 2.5rem;
  cursor: pointer;
  width: 10rem;
  &:hover {
    color: white;
    background-color: #44638c;
  }
`;

export const ValidWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    font-size: 1.1rem;
    font-weight: 500;
    color: ${colors.primaryBlue};
  }
`;

export const SignupButton = styled.button`
  background-color: ${colors.primaryBlue};
  color: white;
  padding: 1rem;
  width: 20rem;
  margin: 5rem 0;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;
