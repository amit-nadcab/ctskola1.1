import React, { useEffect, useState } from "react";
import Router from "./pages/router";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./pages/Globalstyle";
import { darkTheme, lightTheme } from "./pages/Themes";
import { useSelector } from "react-redux";


function App(props) {
  const { switch_theme } = useSelector((state) => state.AuthReducer);

  return (
      <ThemeProvider theme={switch_theme === "light" ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          <Router {...props} />
          <NotificationContainer />
        </>
      </ThemeProvider>
  );
}

export default App;
