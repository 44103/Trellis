import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Navigate from './Navigate';
import FormContainer from './FormContainer';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2770c2',
    }
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navigate />
      <FormContainer />
    </ThemeProvider>
  );
}

export default App;
