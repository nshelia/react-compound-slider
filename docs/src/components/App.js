// @flow

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { JssProvider } from "react-jss";
import { create } from "jss";
import preset from "jss-preset-default";
import createGenerateClassName from "material-ui/styles/createGenerateClassName";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createMuiTheme from "material-ui/styles/theme";
import createPalette from "material-ui/styles/palette";
import blue from "material-ui/colors/blue";
import pink from "material-ui/colors/pink";
import { lightTheme, darkTheme, setPrismTheme } from "../utils/prism";

function AppContainer(props) {
  const { dark } = props;

  const theme = createMuiTheme({
    palette: createPalette({
      primary: blue,
      accent: pink,
      type: dark ? "dark" : "light"
    })
  });

  if (dark) {
    setPrismTheme(darkTheme);
  } else {
    setPrismTheme(lightTheme);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div>APP!</div>
    </MuiThemeProvider>
  );
}

AppContainer.propTypes = {
  dark: PropTypes.bool.isRequired
};

const ConnectedApp = connect(state => ({ dark: state.dark }))(AppContainer);

const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;
jss.options.insertionPoint = "insertion-point-jss";

function App() {
  return (
    <JssProvider jss={jss}>
      <ConnectedApp />
    </JssProvider>
  );
}

export default App;
