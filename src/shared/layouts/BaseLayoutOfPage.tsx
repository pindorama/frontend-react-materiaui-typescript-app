import { Box, useTheme } from '@mui/material';
import * as React from 'react';

interface IBaseLayoutOfPageProps {
    title: string,
    toolbars: React.ReactNode,
    children:  React.ReactNode
}

export const  BaseLayoutOfPage : React.FC<IBaseLayoutOfPageProps> = ({ children, toolbars}) =>{
  const theme = useTheme();
  // const smDown = useMediaQuery(theme.breakpoints.down('sm');

  
  return (
    <Box height="100%" display="flex" flexDirection="column" gap = {1}>

      <Box>
        Header
      </Box>
      <Box   sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '25vh'

        

      }} padding={1} height={ theme.spacing(12)}>

       
        <img
          src="https://cdn.ticket.io/companies/DMnDlIN6/img/holder-1080.jpg?45460123%22"
          alt="Your Image"
          style={{ maxWidth: '50%', maxHeight: '100%', objectFit: 'cover' }}
        />
      
       
        
        {/* <Typography variant='h5' overflow="hidden" whiteSpace="nowrap" textOverflow="ellipses" >
          {title}
        </Typography>
         */}
      </Box>

      <Box>
        {toolbars}
      </Box>

      <Box >
        { children}
      </Box>

      <Box>
       Footer
      </Box>

     
    </Box>
  );
};
