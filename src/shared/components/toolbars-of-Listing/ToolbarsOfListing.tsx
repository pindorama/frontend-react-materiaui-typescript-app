import { Box, useTheme, Typography, Icon, ListItemButton, ListItemIcon, List, InputBase,styled, alpha } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useToolbarContext } from '../../contexts/ToolbarContext';
import SearchIcon from '@mui/icons-material/Search';

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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const ListItemButtonLink: React.FC<IListItemLinkButtonProps> = ({ to, icon }) => {
  const navigate = useNavigate();


  const resolvedPath = useResolvedPath(to);
  const match = useMatch({path: resolvedPath.pathname, end: false});

  const handleClick = () => {
    navigate(to);
  };
  return(
    <ListItemButton  selected={!!match} onClick={handleClick} >
      <ListItemIcon>
        <Icon fontSize="small">{icon}</Icon>
      </ListItemIcon>

    </ListItemButton>
  );

};

export const ToolbarsOfListing: React.FC<IToolbarsOfListingProps> = ({
 
  changingSearchText



} ) =>{


  const theme = useTheme();

  const {toolbarOptions} =useToolbarContext();


  return (
    <Box 
      height={theme.spacing(8)} 
      marginX={10}
      padding={0} 
      paddingX={0} 
      gap={0} 
      alignItems="center" sx={{
        display: 'flex', // Use flexbox
        alignItems: { xs: 'center', sm: 'center',md:'center',lg:'center' }, // Align items vertically
        flexDirection: { xs: 'column', sm: 'column',md:'row',lg:'row' }, // xs, extra-small: 0px. sm, small: 600px. md, medium: 900px. lg, large: 1200px.
        justifyContent:  { xs: 'right', sm: 'center',md:'center',lg:'center' }, 
        marginBottom:{ xs: 12, sm: 6,md:1,lg:1}, 

      }
      }  >
      
      
      <Box flexGrow={1} >
        <Typography> Tickets für Bootshaus</Typography>
      </Box>

    
 
      <Box  order={2} flex={1} display="flex" p={2} flexDirection="row" justifyContent="end"
        sx={{
          display: 'flex', // Use flexbox
          alignItems: { xs: 'center', sm: 'center',md:'center',lg:'center' }, // Align items vertically
          flexDirection: { xs: 'column', sm: 'column',md:'row',lg:'row' }, // xs, extra-small: 0px. sm, small: 600px. md, medium: 900px. lg, large: 1200px.
          justifyContent:  { xs: 'right', sm: 'center',md:'center',lg:'center' } 
  
        }} >

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder=""
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e)=> 
              changingSearchText?.(e.target.value)}
          />
        </Search>
         
        <Box >

          <Typography  sx={{
            display: 'flex',
            overflowX: 'auto',
            position: 'relative',
            top: 2,
            
          }}> Ansicht:  </Typography>
        </Box>
        <Box >

          <List component="nav"  sx={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            padding: 0,
            xs: 'none',
            md: 'flex'
          }}>
            {toolbarOptions.map(toolbarOption => (
              <ListItemButtonLink
                to={toolbarOption.path}
                key={toolbarOption.path}
                icon={toolbarOption.icon}
              />
            ))}
          </List> 

        </Box>



      </Box>

    </Box>
  


  );

};