import styled from "styled-components";
import { colors } from "../Theme";

export const MenteeHeader = styled.div`
  margin: 3rem;
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.primaryBlue};
`;

export const Form = styled.div`
  height: 70%;
  display: flex;
  margin: 60px 0;
  justify-content: center;
  box-sizing: border-box;
`;

export const FormLeft = styled.div`
  min-width: 20rem;
  height: 73vh;
  min-height: 50rem;
  display: flex;
  flex-direction: column;
  margin: 0 6rem;
  margin-top: 2rem;
`;

export const FormRight = styled.div`
  width: 57rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 6rem;
  border-left: 1px solid #bcbcbc;
`;
