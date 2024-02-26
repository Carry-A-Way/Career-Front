import styled from "styled-components";
import { xScrollStyle, yScrollStyle } from "../Scroll";

export const RecommendWrapper = styled.div`
  height: auto;
  max-height: 73vh;
  overflow-y: auto;
  ${yScrollStyle}
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  /* height: 100%; */
`;
export const SectionHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const ConsultWrapper = styled.div`
  width: 100%;
  min-height: 20rem;
  height: 26vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.3rem;
  color: #909090;
  position: relative;
  margin-top: 2rem;
  overflow-x: auto;
  ${xScrollStyle}
  > span {
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
  }
`;
