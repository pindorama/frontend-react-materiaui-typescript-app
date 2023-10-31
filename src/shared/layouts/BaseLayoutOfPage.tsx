import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';
import * as React from 'react';

interface IBaseLayoutOfPageProps {
    title: string,
    toolbars: React.ReactNode,
    children:  React.ReactNode
}

export const  BaseLayoutOfPage : React.FC<IBaseLayoutOfPageProps> = ({ children, title, toolbars}) =>{
  const theme = useTheme();
  // const smDown = useMediaQuery(theme.breakpoints.down('sm');

  
  return (
    <Box height="100%" display="flex" flexDirection="column" gap = {1}>

      <Box>
        Header
      </Box>
      <Box padding={1} display="flex" alignItems = "center" height={ theme.spacing(12)}>
        <IconButton>
          <Icon>
                menu
          </Icon>
        </IconButton>
        
        <Typography variant='h5' overflow="hidden" whiteSpace="nowrap" textOverflow="ellipses" >
          {title}
        </Typography>
        
      </Box>

      <Box>
        {toolbars}
      </Box>

      <Box flex={1} overflow="hidden">
        { children}
      </Box>

      <Box>
       Footer
      </Box>

     
    </Box>
  );
};
