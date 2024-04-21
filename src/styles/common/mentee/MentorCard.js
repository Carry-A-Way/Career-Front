import styled from "styled-components";
import { MentorCardSize, MentorDetailCardSize } from "../Size";

export const MentorCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, ${MentorCardSize.width});
  grid-template-rows: repeat(1, ${MentorCardSize.height});
  grid-auto-rows: ${MentorCardSize.height};
  gap: 2.5rem;
  margin-bottom: 5rem;
`;

export const MentorDetailCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, ${MentorDetailCardSize.width});
  grid-template-rows: auto;
  grid-auto-rows: auto;
  gap: 2.5rem;
  margin-bottom: 5rem;
`;
