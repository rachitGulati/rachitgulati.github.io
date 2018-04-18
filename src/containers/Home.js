import React from "react";
import { withSiteData } from "react-static";
import { Row, Col } from "react-flexa";
import styled from "styled-components";
import { height } from "../config";
import Logo from "../images/home_me.jpeg";
import { Overlay } from "../components/overlay";
import { Heading, SubHeading, Text } from "../components/text";

console.log(Logo);

const ImageWrapper = styled.div`
  background-image: url(${Logo});
  background-size: 100% 125%;
  background-repeat: no-repeat;
  background-position: 0px -120px;
  height: 100%;
  position: relative;
`;
export default withSiteData(() => (
  <Row alignContent="stretch" gutter={0}>
    <Col style={height.Home} xs={"hidden"} md={6} gutter={0}>
      <ImageWrapper>
        <Overlay />
      </ImageWrapper>
    </Col>
    <Col xs={12} md={6} style={height.Home} gutter={0}>
      <Row gutter={0} style={{ padding: "60px" }}>
        <Col xs={12} gutter={0}>
          <Heading> Hi, </Heading>
        </Col>
        <Col xs={12} gutter={0}>
          <SubHeading>
            I am रचित (Rachit). A Frontend Developer and a curious guy who loves
            acquiring new skills. Recently I have learnt{" "}
            <Text primary size={36}>
              Cooking
            </Text>
          </SubHeading>
        </Col>
        <Col xs={12} gutter={0} style={{ paddingTop: 20 }}>
          <Heading>
            {" "}
            Latest Blog{" "}
            <Text primary size={48}>
              Posts
            </Text>
          </Heading>
        </Col>
        <Col xs={12} gutter={0}>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </Col>
      </Row>
    </Col>
  </Row>
));
