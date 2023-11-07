
import {  Box, Button, Typography, Grid} from '@mui/material';
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 3 }}
          columns={{ xs: 1, sm: 2, md: 36,lg: 36, xl: 36 }}
        >

          {items.map(row => (
            <><Grid item xs  key={row.address.addressLocality}>
              <Box order={1}  paddingLeft={5} sx={{
                display: 'flex', // Use flexbox
                alignItems: { xs: 'center', sm: 'center',md:'left',lg:'left' }, // Align items vertically
                flexDirection: 'row', // xs, extra-small: 0px. sm, small: 600px. md, medium: 900px. lg, large: 1200px.
                justifyContent:  { xs: 'center', sm: 'center',md:'center',lg:'center' } 

              }} >
                <img
                  src={row.imageUrl}
                  alt={row.title}
                  style={{ width: '450px', height: '250px', objectFit: 'cover' }} />
              </Box>     
            </Grid>
            <Grid item xs={6} >
              <Box order={2} flexDirection="column" marginBottom={2} sx={{
                display: 'flex', // Use flexbox
                alignItems: { xs: 'center', sm: 'center',md:'left' }, // Align items vertically
                flexDirection: 'column', // xs, extra-small: 0px. sm, small: 600px. md, medium: 900px. lg, large: 1200px.
                justifyContent:  { xs: 'right', sm: 'center',md:'left'} 

              }}>
                <Box display="flex" flexDirection="row" marginTop={2}>

                  <Typography variant="h6">{row.title}</Typography>
                </Box>
                <Box display="flex" flexDirection="row" marginTop={2}>


                  <Box display="flex" flexDirection="row" marginRight={2}>

                    <CalendarMonthOutlinedIcon></CalendarMonthOutlinedIcon>
                    <Typography> {` ${formatDate(row.startDate)}`} </Typography>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <ScheduleOutlinedIcon></ScheduleOutlinedIcon>
                    <Typography>{` ${formatTime(row.startDate)}`}</Typography>
                  </Box>

                </Box>

                <Box display="flex" flexDirection="row">
                  <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                  <Typography>{`${row.address.streetAddress} ${row.address.addressLocality}`}</Typography>

                </Box>
                <Box display="flex" flexDirection="row">

                  <ConfirmationNumberIcon></ConfirmationNumberIcon>
                  <Typography> Tickets ab {row.priceFrom}€</Typography>

                </Box>
              </Box>
            </Grid>
            <Grid item xs={1} sm={12} md={12}  xl={12}>
              <Box order={3}  marginLeft={8}  marginRight={0} sx={{
                display: 'flex', // Use flexbox
                alignItems: { xs: 'center', sm: 'center',md:'center',lg:'center' }, // Align items vertically
                flexDirection: 'row', // xs, extra-small: 0px. sm, small: 600px. md, medium: 900px. lg, large: 1200px.
                justifyContent:  { xs: 'right', sm: 'center',md:'center',lg:'center' } 

              }}>
                <Button variant="contained" color="primary">Zu den Tickets</Button>
              </Box> 

            </Grid></>
            

          ))}

         
        </Grid>
      </Box>
     

    </BaseLayoutOfPage>
  );
};