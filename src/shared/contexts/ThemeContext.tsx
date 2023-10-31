
import { Box, ThemeProvider } from '@mui/material';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DarkTheme, LightTheme } from './../themes';


interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

interface IAppThemeProviderProps {
    children: React.ReactNode

}

const ThemeContext = createContext({} as IThemeContextData);


export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};
export const AppThemeContext: React.FC<IAppThemeProviderProps> =({children})=>{
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(()=> {
    setThemeName((oldThemeName: string) => oldThemeName === 'light' ? 'dark' : 'light');
  },[]);

  const theme = useMemo(()=> {
    if(themeName === 'light') return LightTheme;

    return DarkTheme;
  },[]);
  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme}}>
      <ThemeProvider theme={DarkTheme} >
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider >
    </ThemeContext.Provider>
  );
};


