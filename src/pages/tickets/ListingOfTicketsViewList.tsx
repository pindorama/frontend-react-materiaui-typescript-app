
import {  Box, Button, List, ListItem, Typography } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import { ToolbarsOfListing } from '../../shared/components';
import { BaseLayoutOfPage } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { useEffect, useMemo, useState } from 'react';
import { TicketsService ,IListOfTickets} from '../../shared/services/api/tickets/TicketsService';
import { useSearchParams } from 'react-router-dom';



export const ListingOfTicketsViewList:React.FC  = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const { debounce } = useDebounce();


  const [items, setItems] = useState<IListOfTickets[]>([]);


  const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);
  
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = daysOfWeek[dateObject.getDay()];
  
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = dateObject.getDate().toString().padStart(2, '0');
    const year = dateObject.getFullYear();
  
    return `${dayOfWeek}. ${month}/${day}/${year}`;
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

      <List >       
        {items.map(item => (
          <ListItem key={item.title} sx={{
            display: 'flex', // Use flexbox
            alignItems: { xs: 'center', sm: 'center',md:'center',lg:'center' }, // Align items vertically
            flexDirection: { xs: 'column', sm: 'column',md:'row',lg:'row' }, // xs, extra-small: 0px. sm, small: 600px. md, medium: 900px. lg, large: 1200px.
            justifyContent:  { xs: 'right', sm: 'center',md:'center',lg:'center' } 

          }} >  
          
                     
            <Box order={1}  paddingLeft={5} sx={{
              display: 'flex', // Use flexbox
              alignItems: { xs: 'center', sm: 'center',md:'center',lg:'center' }, // Align items vertically
              flexDirection: 'row', // xs, extra-small: 0px. sm, small: 600px. md, medium: 900px. lg, large: 1200px.
              justifyContent:  { xs: 'center', sm: 'center',md:'center',lg:'center' } 

            }} >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: '450px', height: '250px', objectFit: 'cover' }} />
            </Box>
            
            <Box order={2} display="flex" flexDirection="column" marginBottom={2}>

              <Typography variant="h6">{item.title}</Typography>

              <Box display="flex" flexDirection="row" marginTop={2}>


                <Box display="flex" flexDirection="row" marginRight={2}>

                  <CalendarMonthOutlinedIcon></CalendarMonthOutlinedIcon>
                  <Typography> {` ${formatDate(item.startDate)}`} </Typography>
                </Box>
                <Box display="flex" flexDirection="row">
                  <ScheduleOutlinedIcon></ScheduleOutlinedIcon>
                  <Typography>{` ${formatTime(item.startDate)}`}</Typography>
                </Box>

              </Box>

              <Box display="flex" flexDirection="row">
                <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                <Typography>{`${item.address.streetAddress} ${item.address.addressLocality}`}</Typography>

              </Box>
              <Box display="flex" flexDirection="row">

                <ConfirmationNumberIcon></ConfirmationNumberIcon>
                <Typography> Tickets ab {item.priceFrom}€</Typography>

              </Box>
            </Box>
            <Box order={3}  marginLeft={8}  marginRight={0}>
              <Button variant="contained" color="primary">Zu den Tickets</Button>
            </Box>        
          </ListItem>
        ))}
      </List> 

    </BaseLayoutOfPage>
  );
};