import styled from "styled-components";
import { colors } from "../../config";

export const Heading = styled.div`
  font-size: 48px;
  font-family: "Titillium Web", sans-serif;
  color: ${props => (props.secondary ? colors.lightBlack : colors.black)};
`;

export const SubHeading = styled.div`
  font-size: 36px;
  font-family: "Titillium Web", sans-serif;
  color: ${props => (props.primary ? colors.black : colors.lightBlack)};
`;

export const Text = styled.span`
  font-family: "Roboto Slab", serif;
  font-size: ${props => (props.size ? props.size : 20)}px;
  color: ${props => (props.primary ? colors.purple : colors.black)};
`;
