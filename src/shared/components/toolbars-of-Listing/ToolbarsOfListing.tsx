import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

interface IToolbarsOfListingProps{
  searchText?: string;
showSearchInput?: boolean;
changingSearchText?: (newText: string) => void;

newButtonText?: string;
showNewButton?: boolean;
clickOnTheButton?: () => void;

}

export const ToolbarsOfListing: React.FC<IToolbarsOfListingProps> = ({
  searchText= '',
  showSearchInput= false,
  changingSearchText,
  clickOnTheButton,
  newButtonText = 'Novo',
  showNewButton= true


} ) =>{
  const theme = useTheme();

  return (
    <Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" component={Paper}>
      {showSearchInput && (<TextField  size="small" placeholder='Search...' value={searchText} onChange={(e)=> changingSearchText?.(e.target.value)}/>
      )}
      <Box flex={1} display="flex" justifyContent="end">

        { showNewButton &&  (   
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={clickOnTheButton}
            endIcon={<Icon>add</Icon>}
          >{newButtonText}</Button> 
        )}
   
      </Box>
    
    </Box>

  );

};