import { ThemeOptions, createTheme } from '@mui/material';
import { deepPurple, grey, orange, purple, teal } from '@mui/material/colors';

const themeOptions : ThemeOptions= {
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: deepPurple[500],
    },
    error: {
      main: teal[500],
    },
    success: {
      main: orange[500],
    },
    background: {
      default: '#ffffff',
      paper: grey[50],
    },

  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // Add your custom styles for MuiTextField
          borderColor: 'red', // Border color
          '&:focus': {
            borderColor: 'blue', // Focused border color
          },
        },
      },
  },
},
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: 26,
      fontWeight: 700,
    },
    h2: {
      fontSize: 24,
      fontWeight: 700,
    },
    body1: {
      fontSize: 16,
      color: grey[800],
    },
  },
}

export const theme = createTheme(themeOptions);
