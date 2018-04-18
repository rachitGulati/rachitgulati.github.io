import React from "react";
import { Router, Link } from "react-static";
import styled, { injectGlobal } from "styled-components";
import { hot } from "react-hot-loader";
import Routes from "react-static-routes";

import Container from "../src/components/container";

injectGlobal`
  html {
    font-family: 'Titillium Web', sans-serif;
    font-size: 62.5%; /* 62.5% of 16px = 10px */
  }
  body{
    margin: 0;
  }
`;

const AppStyles = styled.div`
  nav {
    position: absolute;
    left: calc(100% - 350px);
    > a {
      padding: 2rem;
    }
    display: none;
  }
`;

const App = () => (
  <Router>
    <AppStyles>
      <Container>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
        </nav>
        <Routes />
      </Container>
    </AppStyles>
  </Router>
);

export default hot(module)(App);
