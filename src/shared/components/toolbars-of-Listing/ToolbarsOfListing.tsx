import { Box,  TextField, useTheme, Typography, Icon, ListItemButton, ListItemIcon, List } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useToolbarContext } from '../../contexts/ToolbarContext';

interface IToolbarsOfListingProps{
searchText?: string | null;
showSearchInput?: boolean;
changingSearchText?: (newText: string) => void;

newButtonText?: string;
showNewButton?: boolean;
clickOnTheButton?: () => void;

}


interface IListItemLinkButtonProps {
  to: string;
  icon:string;
  
}


const ListItemButtonLink: React.FC<IListItemLinkButtonProps> = ({ to, icon }) => {
  const navigate = useNavigate();


  const resolvedPath = useResolvedPath(to);
  const match = useMatch({path: resolvedPath.pathname, end: false});

  const handleClick = () => {
    navigate(to);
  };
  return(
    <ListItemButton selected={!!match} onClick={handleClick} >
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>

    </ListItemButton>
  );

};

export const ToolbarsOfListing: React.FC<IToolbarsOfListingProps> = ({
  searchText= '',
  showSearchInput= false,
  changingSearchText
  // clickOnTheButton,
  // newButtonText = 'Novo',
  // showNewButton= true


} ) =>{
  const theme = useTheme();

  const {toolbarOptions} =useToolbarContext();


  return (
    <Box 
      height={theme.spacing(7)} 
      marginX={1} 
      padding={0} 
      paddingX={2} 
     
      gap={1} 
      alignItems="center" sx={{
        display: 'flex', // Use flexbox
        alignItems: { xs: 'center', sm: 'center',md:'center',lg:'center' }, // Align items vertically
        flexDirection: { xs: 'column', sm: 'column',md:'row',lg:'row' }, // xs, extra-small: 0px. sm, small: 600px. md, medium: 900px. lg, large: 1200px.
        justifyContent:  { xs: 'right', sm: 'center',md:'center',lg:'center' } 

      }}  >
      
      
      <Box flexGrow={1}>
        <Typography> Tickets für Bootshaus</Typography>
      </Box>

      <Box  flex={1} display="flex" flexDirection="row" justifyContent="end">

     

        <Box  flex={1} display="flex" p={2} flexDirection="row" justifyContent="end" >
          {showSearchInput && (<TextField  
            variant="outlined"

            style={{ position: 'relative', top: -2, right:10 }}

            sx={{
              width: '290px', // Set the width
              height: '0px', // Set the height
              '& .MuiOutlinedInput-input': {
                padding: 0.5 , // Reset input padding
                height: '50%', // Fill container height
              },
              '& .MuiInputLabel-root': {
                transform: 'none', // Reset label transform
                position: 'relative', // Adjust label position
              },
            }}
            placeholder='Search...' 
            value={searchText} 
            onChange={(e)=> 
              changingSearchText?.(e.target.value)}/>
          )}
          
          <Typography> Ansicht:  </Typography>

          <List component="nav">
            {toolbarOptions.map(toolbarOption => (
              <ListItemButtonLink
                to={toolbarOption.path}
                key={toolbarOption.path}
                icon={toolbarOption.icon}
              />
            ))}
          </List>

        

        </Box>

        {/* <List component="nav">
          <ListItemButton>
            <ListItemIcon>
              <Box  flex={1} display="flex" p={2} flexDirection="row" justifyItems="space-around" >
                <Typography> Ansicht:  </Typography>

                <GridViewIcon></GridViewIcon>
                <FormatListBulletedIcon></FormatListBulletedIcon>
                <CalendarMonthOutlinedIcon></CalendarMonthOutlinedIcon>

              </Box>
             
            </ListItemIcon>
          </ListItemButton>
        </List> */}


      </Box>
      {/* <Box flex={1} display="flex" justifyContent="end"> */}

      {/* { showNewButton &&  (   
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={clickOnTheButton}
            endIcon={<Icon>add</Icon>}
          >{newButtonText}</Button> 
        )}
    */}
      {/* </Box> */}
    
    </Box>

  );

};