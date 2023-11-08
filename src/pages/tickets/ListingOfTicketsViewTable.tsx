
import {  Box, Button,  Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, styled } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import { ToolbarsOfListing } from '../../shared/components';
import { BaseLayoutOfPage } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { useEffect, useMemo, useState } from 'react';
import { TicketsService ,IListOfTickets} from '../../shared/services/api/tickets/TicketsService';
import { useSearchParams } from 'react-router-dom';

export const ListingOfTicketsViewTable : React.FC = () =>{
 
  const [ searchParams, setSearchParams ] = useSearchParams();
  const { debounce } = useDebounce();


  const [items, setItems] = useState<IListOfTickets[]>([]);


 
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.selected,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 10,
    },
  }));

  const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);
    
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = dateObject.getDate().toString().padStart(2, '0');
    const year = dateObject.getFullYear();
  
    return ` ${month}.${day}.${year}`;
  };
  const formatTime = (dateString: string): string => {
    const dateObject = new Date(dateString);
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };



  const search = useMemo(() => {
    return searchParams.get('search')  || '';
  },[searchParams]);



  useEffect(() => {

    debounce(() => {
      TicketsService.getAllTickets(1, search)
        .then((result) => {

          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);

            setItems(result.data);
          }
        });
    });
  }, [search]);


  
  
  
  return(
    <BaseLayoutOfPage  toolbars={(<ToolbarsOfListing showSearchInput   
      searchText={search} 
      changingSearchText={ text =>
        setSearchParams({ search: text}, {replace: true})}/>)}>
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>

          <TableBody>
            {items.map(row => (
              <StyledTableRow key={row.title}>
                <TableCell>
                  <Box display="flex" flexDirection="row" marginTop={2}>

                    <Typography variant="h6">{row.title}</Typography>
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                    <Typography>{`${row.address.streetAddress} ${row.address.addressLocality}`}</Typography>

                  </Box>
                             
                </TableCell>
                <TableCell>
                


                  <Box display="flex" flexDirection="row" >   
                    <Typography> Am {` ${formatDate(row.startDate)}`} </Typography>
                  </Box>
                  <Box display="flex" flexDirection="row">
                   
                    <Typography> Ab {` ${formatTime(row.startDate)}`} Uhr</Typography>
                  </Box>


                 
                </TableCell>
                <TableCell> <Box order={3}  marginLeft={8}  marginRight={0}>
                  <Box display="flex" flexDirection="row" marginTop={2}>

                    <Typography variant="h6">Tickets ab</Typography>
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <Typography> Tickets ab {row.priceFrom} Euro</Typography>

                  </Box>                </Box>  </TableCell>
                <TableCell> <Box order={3}  marginLeft={8}  marginRight={0}>
                  <Button variant="contained" color="inherit" size="large">Zu den Tickets &gt;</Button>
                </Box>  </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>     
        </Table>
      </TableContainer>  
    

    </BaseLayoutOfPage>
  );
 

};