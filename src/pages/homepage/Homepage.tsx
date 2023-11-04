
import {  Box, Button, List, ListItem, Typography } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import { ToolbarsOfListing } from '../../shared/components';
import { BaseLayoutOfPage } from '../../shared/layouts';



export const Homepage  = () => {
  const items = [
    {
      'id':'0', 
      'title': 'Tiefblaue Nacht @ Bootshaus Blckbx',
      'startDate': '2023-05-05T23:00:00+02:00',
      'endDate': '2023-05-06T05:30:00+02:00',
      'imageUrl': 'https://cdn.ticket.io/companies/DMnDlIN6/events/utcy3t1u/img/holder-1080.jpg?74238ecb',
      'shopUrl': 'https://bootshaus-club.ticket.io/utcy3t1u/',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Auenweg 173',
        'addressLocality': 'K\u00f6ln',
        'addressRegion': null,
        'postalCode': '51063',
        'addressCountry': 'Deutschland'
      },
      'priceFrom': 15
    },
    {
      'id':'1', 
      'title': 'SOLD OUT: Stella Bossi / LUSU @ Bootshaus',
      'startDate': '2023-05-05T23:00:00+02:00',
      'endDate': '2023-05-06T06:00:00+02:00',
      'imageUrl': 'https:cdn.ticket.io/companies/DMnDlIN6/events/f9nxgv7k/img/holder-1080.jpg?92a27240',
      'shopUrl': 'https://bootshaus-club.ticket.io/f9nxgv7k/',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Auenweg 173',
        'addressLocality': 'K\u00f6ln',
        'addressRegion': null,
        'postalCode': '51063',
        'addressCountry': 'Deutschland'
      },
      'priceFrom': 0
    },{
      'id':'3', 
      'title': 'Tiefblaue Nacht @ Bootshaus Blckbx',
      'startDate': '2023-05-05T23:00:00+02:00',
      'endDate': '2023-05-06T05:30:00+02:00',
      'imageUrl': 'https://cdn.ticket.io/companies/DMnDlIN6/events/utcy3t1u/img/holder-1080.jpg?74238ecb',
      'shopUrl': 'https://bootshaus-club.ticket.io/utcy3t1u/',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Auenweg 173',
        'addressLocality': 'K\u00f6ln',
        'addressRegion': null,
        'postalCode': '51063',
        'addressCountry': 'Deutschland'
      },
      'priceFrom': 15
    }
    // Add more items as needed
  ];

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
  
  // const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  // const mdown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  
  return (
    <BaseLayoutOfPage title="home page" toolbars={(<ToolbarsOfListing showSearchInput />)}>

      <List >       
        {items.map(item => (
          <ListItem key={item.id} sx={{
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
