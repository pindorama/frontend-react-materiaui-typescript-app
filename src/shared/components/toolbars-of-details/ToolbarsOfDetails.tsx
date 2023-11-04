import { Box, useTheme, Paper, Button, Icon, Divider } from '@mui/material';

interface IToolbarsOfDetailsProps {

}

export const  ToolbarsOfDetails: React.FC<IToolbarsOfDetailsProps> = () => {
  const theme = useTheme();

  return (

    <Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" component={Paper}>

      <Button
        color='primary'
        disableElevation
        variant='contained'
        startIcon={<Icon>save</Icon>}
      >Save</Button> 

      <Button
        color='primary'
        disableElevation
        variant='contained'
        startIcon={<Icon>Save</Icon>}
      >Save and Back</Button> 

      <Button
        color='primary'
        disableElevation
        variant='contained'
        startIcon={<Icon>delete</Icon>}
      >Delete</Button> 

      <Button
        color='primary'
        disableElevation
        variant='contained'
        startIcon={<Icon>add</Icon>}
      >New</Button> 
      <Divider variant='middle' orientation='vertical' />

      <Button
        color='primary'
        disableElevation
        variant='contained'
        startIcon={<Icon>arrow_back</Icon>}
      >Back</Button> 

      
    </Box>

    
  );
};
