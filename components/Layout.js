import React from "react";
import styled from "styled-components";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useAppContext } from "../contexts";
import Navbar from "./Navbar";

const lightTheme = {
  body: "#f1f1f1",
  fontColor: "#222",
};

const darkTheme = {
  body: "#222",
  fontColor: "#f1f1f1",
};

const GlobalStyles = createGlobalStyle`

body{

  background-color:${(props) => props.theme.body};
  

}

`;

const Layout = ({ children }) => {
  const { theme } = useAppContext();

  return (
    <ContainerStyled>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Navbar />
        {children}
      </ThemeProvider>
    </ContainerStyled>
  );
};

export default Layout;

const ContainerStyled = styled.main`
  max-width: 1240px;
  margin: 0 auto;
  min-height: 100vh;
`;
