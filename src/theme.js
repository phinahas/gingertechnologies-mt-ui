import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue for primary elements (e.g., buttons)
    },
    secondary: {
      main: '#17abddff', // Pink for secondary elements
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Default font stack
  },
});

export default theme;