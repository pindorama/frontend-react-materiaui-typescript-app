import { createTheme }   from '@mui/material';
import { cyan } from '@mui/material/colors';
import yellow from '@mui/material/colors/yellow';


export const DarkTheme = createTheme({
  palette: {
    primary:{
      main: yellow[700],
      dark: yellow[700],
      light: yellow[500],
      contrastText:'#ffffff',
    },
        
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText:'#ffffff',

    },
    background: {
      paper: '#303134',
      default:'#202124'
    }
  }
});
