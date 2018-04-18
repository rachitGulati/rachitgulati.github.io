import styled from "styled-components";
import { colors } from "../../config";

export const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: ${colors.lightBlack};
  z-index: 1;
`;
