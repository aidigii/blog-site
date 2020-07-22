import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './src/theme';
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
    <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

