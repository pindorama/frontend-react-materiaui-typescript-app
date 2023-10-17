import { createTheme }   from '@mui/material';
import { cyan } from '@mui/material/colors';
import yellow from '@mui/material/colors/yellow';


export const LightTheme = createTheme({
  palette: {
    primary:{
      main: yellow[700],
      dark: yellow[700],
      light: yellow[700],
      contrastText:'#ffffff',
    },
        
    secondary: {
      main: cyan[700],
      dark: cyan[700],
      light: cyan[700],
      contrastText:'#ffffff',

    },
    background: {
      paper: '#ffffff',
      default:'#f7f6f3'
    }
  }
});
