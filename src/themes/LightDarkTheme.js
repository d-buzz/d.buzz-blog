import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

import { useSelector } from 'react-redux';


const nightShade = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#e31337',
      contrastText: '#fff',
      textPrimary: '#e31337',
      textDefault: '#fff',
      backgroundPrimary: '#15202b',
    }
  }
});

const granite = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#e31337',
      contrastText: '#fff',
      textPrimary: '#e31337',
      textDefault: '#fff',
      backgroundPrimary: '#212529',
    }
  }
});

const dayLight = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#e31337',
      contrastText: '#fff',
      textPrimary: '#e31337',
      textDefault: '#424242',
      backgroundPrimary: '#ffffff',    
    }
  }
});





const LightDarkTheme = ({children}) => {

  const theme = useSelector(state => state.settings.theme);

  return (
    <ThemeProvider theme={theme === 'nightshade' ? nightShade : (theme === 'granite' ? granite : dayLight)}>{children}</ThemeProvider>
  )
}

export default LightDarkTheme;
