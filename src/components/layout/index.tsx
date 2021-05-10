import React from "react";
import styled from "styled-components";

const Container = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const Layout = ({ children }) => {
  return (
    <Container className="h-screen flex justify-center p-8">
      {children}
    </Container>
  );
};
